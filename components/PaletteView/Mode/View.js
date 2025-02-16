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
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin: 16px;
`;
