import Image from 'next/image';
import { IconDownload } from '@tabler/icons-react';
import styled from 'styled-components';
import { Button } from '@mantine/core';
import { optimizations } from '@/models/OptimizationModel';
import { usePaletteStore } from '../../store/usePaletteStore';
import NavBarMenu from './NavBarMenu';
import { useRouter } from 'next/navigation';

export default function NavBar() {
  const { model, delegate } = usePaletteStore();
  const router = useRouter();

  function downloadAction({ model }: any) {
    const selection = { optimization: delegate.optimization, ...model };
    const data = { optimizations, selection };
    const json = JSON.stringify(data, null, 4);
    const blob = new Blob([json], { type: 'application/json' });
    downloadBlob(blob);
  }

  return (
    <Wrapper>
      <Image src="images/logo.svg" width={130} height={42} alt="PrismColor Logo" onClick={() => router.push('/')} />
      <ButtonGroup>
        <NavBarMenu />
        <Button
          rightSection={<IconDownload size={18} />}
          size="xs"
          color="#0070c1"
          onClick={() => downloadAction({ model })}
        >
          Download
        </Button>
      </ButtonGroup>
    </Wrapper>
  );
}

function downloadBlob(blob: any, name = 'prismColorPalette.json') {
  // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
  const blobUrl = URL.createObjectURL(blob);

  // Create a link element
  const link = document.createElement('a');

  // Set link's href to point to the Blob URL
  link.href = blobUrl;
  link.download = name;

  // Append link to the body
  document.body.appendChild(link);

  // Dispatch click event on the link
  // This is necessary as link.click() does not work on the latest firefox
  link.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    })
  );

  // Remove link from body
  document.body.removeChild(link);
}

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 56px;
  border-bottom: 1px solid #e3e3e3;
  background: #ffffff;
  padding-left: 24px;
  padding-right: 24px;
`;
