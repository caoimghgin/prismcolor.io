import React from 'react';
import { Anchor, EyeOff, Key, Lock } from 'feather-icons-react';
import styled from 'styled-components';
import { optimizations } from '../../models/OptimizationModel.js';
import { usePaletteStore } from '../../store/usePaletteStore';
import { swatchFrgColor } from '../../utilities/index.js';

const size = 14;

export default function ScaleView({ model: scaleModel }) {
  const { delegate } = usePaletteStore();

  if (!scaleModel || !delegate) {
    return null;
  }

  const onClickHandler = () => {
    navigator.clipboard.writeText(scaleModel.hex);
  };

  return render(scaleModel, delegate, onClickHandler);
}

const render = (model, delegate, onClickHandler) => {
  if (!model) {
    return null;
  }

  const optimizationType = optimizations.find((item) => item.name === delegate.optimization);
  const optimizedValue = optimizationType?.values.find(
    (item) => item.universalWeight === parseFloat(model.weight)
  );

  const ScaleComponent = (
    <Wrapper>
      <Label>{optimizedValue?.weight || <EyeOff size={12} />}</Label>
      <Swatch
        $model={model}
        $delegate={delegate}
        $optimizedWeight={optimizedValue?.weight}
        onClick={onClickHandler}
        $isDisabled={!optimizedValue?.weight}
      >
        <TopSection $model={model}>
          <TopSectionMiddle $model={model}>{getSymbols(model)}</TopSectionMiddle>
        </TopSection>
      </Swatch>
      <UniversLabel>{model.weight}</UniversLabel>
    </Wrapper>
  );

  return ScaleComponent;
};

const getSymbols = (model) => {
  if (model.isAnchor) {
    return <Anchor size={size} />;
  }
  if (model.isLock) {
    return <Lock size={size} />;
  }
  if (model.isKey) {
    return <Key size={size} />;
  }
  return null;
};

const Wrapper = styled.div`
  font-size: 11px;
  font-weight: 600;
  font-family: 'Helvetica';
  letter-spacing: 0.03rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.div`
  width: 40px;
  min-width: 40px;
  text-align: center;
  margin-bottom: 4px;
`;

const UniversLabel = styled.div`
  width: 40px;
  min-width: 40px;
  text-align: center;
  color: #035ef9;
  margin-top: 4px;
`;

const Swatch = styled.div.attrs((props) => ({
  style: {
    background: props.$isDisabled
      ? 'repeating-linear-gradient(-45deg, #f1f1f1, #f1f1f1 9px, #e3e3e3 9px, #e3e3e3 18px)'
      : props.$model.value.destination,
    color: swatchFrgColor(props.$delegate, props.$model),
    opacity: props.$isDisabled ? '0.5' : '1',
    border: props.$model.lab_d65_l > 99 ? '1px solid #f1f1f1' : 'none',
  },
}))`
  width: 40px;
  min-width: 40px;
  height: 72px;
  min-height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const TopSection = styled.div`
  height: 22px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const TopSectionMiddle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
