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
  @media (min-width: 850px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  margin: 16px;
`;
