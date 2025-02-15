import styled from 'styled-components';
import { usePaletteStore } from '../../store/usePaletteStore';
import EditMode from './Mode/Edit.js';
import ViewMode from './Mode/View.js';

export default function SideNav() {
  const { delegate } = usePaletteStore();

  if (!delegate.editing) {
    return (
      <Wrapper>
        <ViewMode />
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <EditMode />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex-grow: 1;
  padding: 16px;
`;
