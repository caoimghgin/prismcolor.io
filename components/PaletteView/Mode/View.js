import styled from 'styled-components';
import SwatchGroup from '../../SwatchGroup/SwatchGroup';

export default function Main() {
  return (
    <Wrapper>
      {/* ViewMode renders SwatchGroups for all scales in the model */}
      <SwatchGroup />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 1px solid #e3e3e3;
  border-radius: 8px;
  margin: 16px;
  background: #ffffff;
  flex-grow: 1;
`;
