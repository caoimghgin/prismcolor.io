import { useEffect } from 'react';
import styled from 'styled-components';
import NavBar from '@/components/NavBar/NavBar';
import PaletteView from '@/components/PaletteView/PaletteView';
import SideNav from '../components/SideNav/SideNav';
import PaletteModel from '../models/PaletteModel';
import type { PaletteConfig } from '../shared.types';
import { usePaletteStore } from '../store/usePaletteStore';

const paletteSeed: PaletteConfig[] = [
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
  const { setModel } = usePaletteStore();

  // Initialize the model on component mount
  useEffect(() => {
    setModel(new PaletteModel(paletteSeed));
  }, [setModel]);

  return (
    <Container>
      <TopMenu>
        <NavBar />
      </TopMenu>
      <MainContent>
        <Left>
          <SideNav />
        </Left>
        <Right>
          <PaletteView />
        </Right>
      </MainContent>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const TopMenu = styled.div`
  background-color: #333;
  color: white;
  text-align: center;
`;

const Left = styled.div`
  width: 300px;
  background-color: #f7f7f7;
  border-right: 1px solid #e3e3e3;
  overflow-y: auto;
  padding: 10px;
`;

const Right = styled.div`
  background: #f1f1f1;
  flex: 1;
  overflow-y: auto;
  padding: 10px;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;
