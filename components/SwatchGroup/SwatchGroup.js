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

          <Wrapper>
            <Main className="ScaleView">
              {value.swatches.map((swatchModel, index) => (
                <Swatch key={`${value.semantic}-${index}`} model={swatchModel} />
              ))}
            </Main>
          </Wrapper>
        </Container>
      ))}
    </div>
  );
}

const Container = styled.div`
  // display: flex;
  // width: 575px;
  // flex-direction: row;
  // flex-wrap: wrap;
  // justify-content: center;
  // align-items: center;
  // background-color: #ffffff;
  // border-radius: 8px;
  // border: 1px solid #d4d4d4;
`;

const Wrapper = styled.div`
  margin-top: 8px;
  display: flex;
  padding-top: 20px;
  padding-left: 24px;
  padding-bottom: 20px;
  width: 474px;
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px solid #d4d4d4;
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
