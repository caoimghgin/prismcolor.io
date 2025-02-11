import React from 'react';
import { AlertTriangle, Anchor, Key, Lock } from 'feather-icons-react';
import styled from 'styled-components';
import { optimizations } from '../../models/OptimizationModel.js';
import { usePaletteStore } from '../../store/usePaletteStore';
import { swatchFrgColor } from '../../utilities/index.js';

export default function SwatchView({ model: swatchModel }) {
  const { delegate } = usePaletteStore();

  if (!swatchModel || !delegate) {
    return null;
  }

  const onClickHandler = () => {
    navigator.clipboard.writeText(swatchModel.hex);
  };

  return render(swatchModel, delegate, onClickHandler);
}

const render = (model, delegate, onClickHandler) => {
  if (!model) return null;

  const optimizationType = optimizations.find((item) => item.name === delegate.optimization);
  const optimizedValue = optimizationType?.values.find(
    (item) => item.universalWeight === parseFloat(model.weight)
  );

  if (!optimizedValue?.weight) return null;

  return (
    <Wrapper>
      {optimizedValue.weight}
      <Swatch $model={model} $delegate={delegate} onClick={onClickHandler}>
        <TopSection $model={model}>
          <TopSectionLeft $model={model}>{getSymbols(model)}</TopSectionLeft>
          <TopSectionMiddle $model={model} />
          <TopSectionRight $model={model}>{model.weight}</TopSectionRight>
        </TopSection>
        <MiddleSection $model={model} />
        <BottomSection $model={model}>{contrastLabel(model, delegate)}</BottomSection>
      </Swatch>
    </Wrapper>
  );
};

const getSymbols = (model) => {
  const size = 14;
  if (!model.color.inGamut('srgb')) {
    if (model.isAnchor) {
      return (
        <div>
          <Anchor size={size} /> <AlertTriangle size={size} />{' '}
        </div>
      );
    }
    if (model.isKey) {
      return (
        <div>
          <Key size={size} /> <AlertTriangle size={size} />{' '}
        </div>
      );
    }
    return <AlertTriangle size={size} />;
  }
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

const contrastLabel = (model, delegate) => {
  if (delegate.contrast === 'WCAG21') {
    const value = model.wcag_white.toFixed(2);
    const result = parseFloat(value);
    return `${result}:1`;
  }
  if (delegate.contrast === 'CIE L* (d65)') {
    const value = model.lab_d65_l.toFixed(2);
    const result = parseFloat(value);
    return `L* ${result}`;
  }
  if (delegate.contrast === 'APCA') {
    const white = Math.abs(model.apca_white);
    const black = Math.abs(model.apca_black);
    if (white > black) {
      return `Lc ${model.apca_white.toFixed(2)}`;
    }
    return `Lc ${model.apca_black.toFixed(2)}`;
  }

  if (delegate.contrast === 'Ok L*') {
    const value = (model.color.oklab.l * 100).toFixed(2);
    const result = parseFloat(value);
    return `L* ${result}`;
  }

  if (delegate.contrast === 'CAM16') {
    const value = model.color.cam16_jmh.j.toFixed(2);
    const result = parseFloat(value);
    return `L* ${result}`;
  }

  if (delegate.contrast === 'HCT T%') {
    const value = model.color.hct.t.toFixed(2);
    const result = parseFloat(value);
    return `T% ${result}`;
  }
};

const Wrapper = styled.div`
  font-size: 11px;
  font-weight: 600;
  font-family: 'Helvetica';
`;

const Swatch = styled.div`
  width: 72px;
  min-width: 72px;
  height: 72px;
  min-height: 72px;
  background: ${(props) => props.$model.value.destination};
  color: ${(props) => swatchFrgColor(props.$delegate, props.$model)};
  border-radius: 8px;
  margin: 0px 16px 8px 0px;
  border: ${(props) => (props.$model.lab_d65_l > 90 ? '1px solid #E2E2E2' : null)};
`;

const TopSection = styled.div`
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 72px;
  text-align: right;
  letter-spacing: 0.05rem;
  padding-right: 8px;
  padding-left: 8px;
  padding-top: 2px;
`;

const TopSectionLeft = styled.div`
  padding-top: 2px;
`;

const TopSectionMiddle = styled.div``;

const TopSectionRight = styled.div`
  padding-top: 1.5px;
`;

const MiddleSection = styled.div`
  width: 72px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -5px;
`;

const BottomSection = styled.div`
  width: 72px;
  height: 20px;
  padding-left: 8px;
  padding-right: 8px;
  justify-content: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
