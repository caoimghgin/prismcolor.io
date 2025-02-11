import styled from 'styled-components';
import { usePaletteStore } from '../../../store/usePaletteStore';
import ScaleGroup from '../../ScaleGroup/ScaleGroup';

export default function Main() {
  const { delegate } = usePaletteStore();

  if (!delegate.editing) return null;

  return (
    <Wrapper>
      <ScaleGroup model={delegate.editing} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin: 16px;
`;
