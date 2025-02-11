import styled from 'styled-components';
import { usePaletteStore } from '../../store/usePaletteStore';
import Swatch from './Swatch';

export default function SwatchGroupView() {
  const { model } = usePaletteStore();

  if (!model) {
    return null;
  }

  return (
    <div>
      {model.values.map((value) => (
        <Container key={value.semantic}>
          <Title>{value.semantic}</Title>
          <Main className="ScaleView">
            {value.swatches.map((swatchModel, index) => (
              <Swatch key={`${value.semantic}-${index}`} model={swatchModel} />
            ))}
          </Main>
        </Container>
      ))}
    </div>
  );
}

const Container = styled.div`
  margin: 16px;
  display: flex;
`;

const Title = styled.div`
  flex: 0 0 100px;
  padding-top: 18px;
  font-weight: bold;
  font-size: 12px;
`;

const Main = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  flex: 1;
  background: white;
`;
