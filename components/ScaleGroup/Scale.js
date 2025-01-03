import React, { useEffect, useState } from 'react';
import { AlertTriangle, Anchor, EyeOff, Key, Lock } from 'feather-icons-react';
import styled from 'styled-components';
import { optimizations } from '../../models/OptimizationModel.js';
import { findOptimizationType } from '../../utilities';

const size = 14;

export default function SwatchView(props) {
  const [model, setModel] = useState();

  useEffect(() => {
    if (!props.model || !props.delegate) return;
    setModel({ ...props.model, delegate: props.delegate });
  }, [props.model, props.delegate]);

  const onClickHandler = () => {
    console.log(optimizations);
    console.table(model);
    console.log(model.color);
    console.log('AM I IN GAMUT of sRGB?', model.color.inGamut('srgb'));
    navigator.clipboard.writeText(model.hex);
  };
  return render(model, props.delegate, onClickHandler);
}

const render = (model, delegate, onClickHandler) => {
  if (!model) return;

  const optimizationType = findOptimizationType(delegate.optimization);
  const optimizedValue = optimizationType.values.find(
    (item) => item.univers === parseFloat(model.weight)
  );
  // if (!optimizedValue.weight) return

  console.log(optimizedValue.weight);

  return (
    <Wrapper>
      <Label> {optimizedValue.weight ? optimizedValue.weight : <EyeOff size={12} />} </Label>

      {optimizedValue.weight ? (
        <Swatch
          model={model}
          delegate={delegate}
          optimizedWeight={optimizedValue.weight}
          onClick={onClickHandler}
        >
          <>
            <TopSection model={model}>
              <TopSectionMiddle model={model}>
                {getSymbols(model, optimizedValue.weight)}
              </TopSectionMiddle>
            </TopSection>
          </>
        </Swatch>
      ) : (
        <SwatchDisabled
          model={model}
          delegate={delegate}
          optimizedWeight={optimizedValue.weight}
          onClick={onClickHandler}
        >
          <>
            <TopSection model={model}>
              <TopSectionMiddle model={model}>
                {getSymbols(model, optimizedValue.weight)}
              </TopSectionMiddle>
            </TopSection>
          </>
        </SwatchDisabled>
      )}
      <Label>{model.weight}</Label>
    </Wrapper>
  );
};

const getSymbols = (model) => {
  // if (!model.color.inGamut("srgb")) {
  //     if (model.isAnchor) return (<div><Anchor size={size}/> <AlertTriangle size={size}/> </div>)
  //     if (model.isKey) return (<div><Key size={size}/> <AlertTriangle size={size}/> </div>)
  //     return <AlertTriangle size={size}/>
  // }

  if (model.isAnchor) return <Anchor size={size} />;
  if (model.isLock) return <Lock size={size} />;

  if (model.isKey) return <Key size={size} />;
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
    if (white > black) return `Lc ${model.apca_white.toFixed(2)}`;
    return `Lc ${model.apca_black.toFixed(2)}`;
  }
};

const Wrapper = styled.div`
  font-size: 11px;
  font-weight: 600;
  font-family: 'Helvetica';
`;
const Label = styled.div`
  width: 40px;
  min-width: 40px;
  text-align: center;
`;

const SwatchDisabled = styled.div`
  width: 40px;
  min-width: 40px;
  height: 72px;
  min-height: 72px;
  background: repeating-linear-gradient(-45deg, #f1f1f1, #f1f1f1 9px, #e3e3e3 9px, #e3e3e3 18px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Swatch = styled.div`
  width: 40px;
  min-width: 40px;
  height: 72px;
  min-height: 72px;
  background: ${(props) =>
    props.optimizedWeight || props.model.lock ? props.model.value.destination : 'white'};
  color: ${(props) => swatchFrgColor(props)};
  display: flex;
  align-items: center;
  justify-content: center;
  // border-radius: 8px;
  // margin: 0px 16px 8px 0px;
  border: ${(props) => (props.model.lab_d65_l > 99 ? '1px solid #f1f1f1' : null)};
  //
`;

const swatchFrgColor = (props) => {
  console.log(props);
  if (!props.optimizedWeight) return 'white';

  if (props.delegate.contrast === 'WCAG21') {
    return props.model.lab_d65_l < 50 ? 'white' : 'black';
  }
  const white = Math.abs(props.model.apca_white);
  const black = Math.abs(props.model.apca_black);
  if (white > black) return 'white';
  return 'black';
};

const TopSection = styled.div`
  height: 22px;
  display: flex;
  flex-direction: row;

  display: flex;
  align-items: center;
  justify-content: center;

  // justify-content: space-between;
  width: 72px;
  text-align: center;
  // letter-spacing: .05rem;
  // padding-right: 8px;
  // padding-left: 4px;
  // padding-top: 2px;
  // border: ${(props) => (props.model.lab_d65_l > 90 ? '1px solid #E2E2E2' : '1px solid #E2E2E2')};
`;

const TopSectionLeft = styled.div`
  padding-top: 2px;
  // border: ${(props) => (props.model.lab_d65_l > 90 ? '1px solid #E2E2E2' : '1px solid #E2E2E2')};
`;

const TopSectionMiddle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  // border: ${(props) => (props.model.lab_d65_l > 90 ? '1px solid #E2E2E2' : '1px solid #E2E2E2')};
`;

const TopSectionRight = styled.div`
  padding-top: 1.5px;
  // border: ${(props) => (props.model.lab_d65_l > 90 ? '1px solid #E2E2E2' : '1px solid #E2E2E2')};
`;

const MiddleSection = styled.div`
  width: 72px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -5px;
  // border: ${(props) => (props.model.lab_d65_l > 90 ? '1px solid #E2E2E2' : '1px solid #E2E2E2')};
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
  // border: ${(props) => (props.model.lab_d65_l > 90 ? '1px solid #E2E2E2' : '1px solid #E2E2E2')};
`;
