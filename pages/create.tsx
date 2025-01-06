import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styled from 'styled-components';
import NavBar from '@/components/NavBar/NavBar';
import PaletteView from '@/components/PaletteView/PaletteView';
import SideNav from '../components/SideNav/SideNav';
import PaletteModel from '../models/PaletteModel';

const initialModel = [
  { index: 1, semantic: 'primary', keys: ['oklch(52.95% 0.1609 244.63)'] },
  { index: 2, semantic: 'secondary', keys: ['#867356', '#3a2f1e', '#cec6b9'] },
  { index: 3, semantic: 'positive', keys: ['#007c00'] },
  { index: 4, semantic: 'negative', keys: ['#d80000'] },
  { index: 5, semantic: 'highlight', keys: ['#ffc107'] },
  { index: 6, semantic: 'info', keys: ['#035ef9', '#d2e3ff', '#013391', '#0248c3', '#91b9ff'] },
  { index: 7, semantic: 'system', keys: ['#0A66D8'] },
  { index: 8, semantic: 'neutral', keys: null },
];

export default function Create() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [delegate, setDelegate] = useState({
    optimization: 'Universal',
    contrast: 'CIE L* (d65)',
    editing: null,
  });
  const [mode, setMode] = useState('Palette');
  const [model, setModel] = useState<PaletteModel>(new PaletteModel(initialModel));

  useEffect(() => {
    if (searchParams.size > 0) {
      const palette = searchParams.get('palette');
      if (!palette) {
        return;
      }
      const data = JSON.parse(decodeURIComponent(palette));
      setModel(new PaletteModel(data));
    } else {
      setModel(new PaletteModel(initialModel));
      const params = new URLSearchParams();
      params.set('palette', encodeURIComponent(JSON.stringify(initialModel)));
      router.replace(`/create?${params}`);
    }
  }, [searchParams, router]);

  if (!model) {
    return null;
  }

  return (
    <>
      <NavBar model={model} delegate={delegate} />
      <Main>
        <Left>
          <SideNav
            model={model}
            delegate={delegate}
            setDelegate={setDelegate}
            mode={mode}
            setMode={setMode}
          />
        </Left>
        <Right>
          <PaletteView model={model} delegate={delegate} mode={mode} />
        </Right>
      </Main>
    </>
  );
}

const Left = styled.div`
  flex: 0 0 280px;
  border-right: 1px solid #e3e3e3;
  background: #f7f7f7;
`;

const Right = styled.div`
  background: #f1f1f1;
  flex-grow: 1;
`;

const Main = styled.div`
  display: flex;
  height: 100%;
`;
