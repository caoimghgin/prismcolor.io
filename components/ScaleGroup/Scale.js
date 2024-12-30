import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { Anchor, Key, Lock, AlertTriangle, EyeOff } from 'feather-icons-react';
import { optimizations } from '../../models/OptimizationModel.js'
const size = 14

export default function SwatchView(props) {

    const [model, setModel] = useState()

    useEffect(() => {
        if (!props.model || !props.delegate) return
        setModel({ ...props.model, delegate: props.delegate.editing })
    }, [props.model, props.delegate])

    const onClickHandler = () => {
        console.table(model)
        navigator.clipboard.writeText(model.hex)
    }
    return render(model, props.delegate, onClickHandler)
}

const render = (model, delegate, onClickHandler) => {
    if (!model) return

    const optimizationType = optimizations.find(item => item.name === delegate.optimization)
    const optimizedValue = optimizationType.values.find(item => item.univers === parseFloat(model.weight))

    if (model.weight === "000") {
        return (
            <Wrapper>
                <Label> {optimizedValue.weight ? optimizedValue.weight : <EyeOff size={12}/> }  </Label>
            <Swatch model={model} delegate={delegate} optimizedWeight={optimizedValue.weight} onClick={onClickHandler}>
            <>
            <TopSection model={model}>
            <TopSectionMiddle model={model}>{getSymbols(model, optimizedValue.weight)}</TopSectionMiddle>
        </TopSection>
            </>
        </Swatch>
        <UniversLabel>{model.weight}</UniversLabel>

            </Wrapper>
        )
    }

    if (model.weight === "999") {
        return (
            <Wrapper>
                <Label> {optimizedValue.weight ? optimizedValue.weight : <EyeOff size={12}/> }  </Label>
                <Swatch model={model} delegate={delegate} optimizedWeight={optimizedValue.weight} onClick={onClickHandler}>
            <>
            <TopSection model={model}>
            <TopSectionMiddle model={model}>{getSymbols(model, optimizedValue.weight)}</TopSectionMiddle>
        </TopSection>
            </>
        </Swatch>
        <UniversLabel>{model.weight}</UniversLabel>

            </Wrapper>
        )
    }

    return <Wrapper>
        <Label> {optimizedValue.weight ? optimizedValue.weight : <EyeOff size={12}/> }  </Label>
        {
            optimizedValue.weight ? 
            <Swatch model={model} delegate={delegate} optimizedWeight={optimizedValue.weight} onClick={onClickHandler}>
            <>
            <TopSection model={model}>
            <TopSectionMiddle model={model}>{getSymbols(model, optimizedValue.weight)}</TopSectionMiddle>
        </TopSection>
            </>
        </Swatch> : 
            <SwatchDisabled model={model} delegate={delegate} optimizedWeight={optimizedValue.weight} onClick={onClickHandler}>
            <>
            <TopSection model={model}>
            <TopSectionMiddle model={model}>{getSymbols(model, optimizedValue.weight)}</TopSectionMiddle>
        </TopSection>
            </>
        </SwatchDisabled>
        }
        <UniversLabel>{model.weight}</UniversLabel>
    </Wrapper>
}

const getSymbols = (model) => {
    if (model.isAnchor) return (<Anchor size={size}/>)
        if (model.isLock) return (<Lock size={size}/>)

    if (model.isKey) return (<Key size={size}/>)
    return null
}

const Wrapper = styled.div`
font-size: 11px;
font-weight: 600;
font-family: "Helvetica";
letter-spacing: 0.03rem;
`
const Label = styled.div`
width: 40px;
min-width: 40px;
text-align: center;
`
const UniversLabel = styled.div`
width: 40px;
min-width: 40px;
text-align: center;
color: #035ef9;
`

const SwatchDisabled = styled.div`
width: 40px;
min-width: 40px;
height: 72px;
min-height: 72px;
background: repeating-linear-gradient(
  -45deg,
  #f1f1f1,
  #f1f1f1 9px,
  #e3e3e3 9px,
  #e3e3e3 18px
);
  display: flex;
  align-items: center;
  justify-content: center;
`

const Swatch = styled.div`
width: 40px;
min-width: 40px;
height: 72px;
min-height: 72px;
background: ${props => props.optimizedWeight || props.model.lock ? props.model.value.destination : props.model.value.destination};
color: ${props => swatchFrgColor(props)};
display: flex;
align-items: center;
justify-content: center;
border: ${props => props.model.lab_d65_l > 99 ? "1px solid #f1f1f1" : null};
`;

const swatchFrgColor = (props) => {
    if (props.delegate.contrast === "WCAG21") {
        return props.model.lab_d65_l < 50 ? "white" : "black"
    }
    const white = Math.abs(props.model.apca_white);
    const black = Math.abs(props.model.apca_black);
    if (white > black) return "white"
    return "black"
}

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
// border: ${props => props.model.lab_d65_l > 90 ? "1px solid #E2E2E2" : "1px solid #E2E2E2"};
`;

const TopSectionLeft = styled.div`
padding-top: 2px;
// border: ${props => props.model.lab_d65_l > 90 ? "1px solid #E2E2E2" : "1px solid #E2E2E2"};
`;

const TopSectionMiddle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
// border: ${props => props.model.lab_d65_l > 90 ? "1px solid #E2E2E2" : "1px solid #E2E2E2"};
`;

const TopSectionRight = styled.div`
padding-top: 1.5px;
// border: ${props => props.model.lab_d65_l > 90 ? "1px solid #E2E2E2" : "1px solid #E2E2E2"};
`;

const MiddleSection = styled.div`
width: 72px;
height: 36px;
display: flex;
justify-content: center;
align-items: center;
margin-top: -5px;
// border: ${props => props.model.lab_d65_l > 90 ? "1px solid #E2E2E2" : "1px solid #E2E2E2"};
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
// border: ${props => props.model.lab_d65_l > 90 ? "1px solid #E2E2E2" : "1px solid #E2E2E2"};
`;

