import styled from 'styled-components';
import { usePaletteStore } from '../../store/usePaletteStore';
import Scale from './Scale';

export default function ScaleGroupView({ model: scaleModel }) {
  const { delegate } = usePaletteStore();

  if (!scaleModel) return null;

  return (
    <Title>
      Scale
      <Container>
        <Wrapper>
          <Main className="ScaleView">
            {scaleModel.swatches.map((model, index) => (
              <Scale key={index} model={model} />
            ))}
          </Main>
        </Wrapper>
      </Container>
    </Title>
  );
}
const Title = styled.div`
  font-weight: 500;
  font-size: 14px;
`;

const Container = styled.div`
    display: flex;
    width: 980px;
    height:220px
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    border-radius: 8px;
    border: 1px solid #d4d4d4;
`;

const Wrapper = styled.div`
  margin: 16px;
  display: flex;
  width: 920px;
`;

const Main = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%
    flex: 1;
    `;
