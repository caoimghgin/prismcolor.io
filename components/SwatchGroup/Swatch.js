
import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { Anchor, Key } from 'feather-icons-react';


export default function SwatchView(props) {

    const [model, setModel] = useState()

    useEffect(() => {
        if (!props.model || !props.delegate) return
        setModel({ ...props.model, delegate: props.delegate })
    }, [props.model, props.delegate])

    const onClickHandler = () => {
        console.table(model)
        console.log("IS KEY:", model.isKey)
        console.log(model.color)
        navigator.clipboard.writeText(model.hex)
    }

    return render(model, onClickHandler)

}

const render = (model, onClickHandler) => {
    if (!model) return
    return <Wrapper>
        {model.weight}    
        <Swatch model={model} onClick={onClickHandler}>
            <TopSection model={model}>{model.weight}</TopSection>
            <MiddleSection model={model}>{Icon(model)}</MiddleSection>
            <BottomSection model={model}>{contrastLabel(model)}</BottomSection>
        </Swatch>
    </Wrapper>
}

const contrastLabel = (model) => {
    // const value = model.wcag_white
    const value = parseFloat(model.wcag_white.toFixed(2))
    return `${value}:1`
}

const Icon = (model) => {
    if (model.isKey) return (<Key/>)
    if (model.isAnchor) return (<Anchor/>)
}

const Wrapper = styled.div`
font-size: 12px;
font-weight: 600;
font-family: "Helvetica";
`

const Swatch = styled.div`
width: 72px;
min-width: 72px;
height: 72px;
min-height: 72px;
background: ${props => props.model.value.destination};
color: ${props => props.model.lab_d65_l < 50 ? "white" : "black"};
border-radius: 8px;
margin: 0px 16px 8px 0px;
border: ${props => props.model.lab_d65_l > 90 ? "1px solid #E2E2E2" : null};
`;

const TopSection = styled.div`
width: 72px;
height: 12px;
font-size: 9px;
font-weight: 600;
font-family: "Helvetica";
  text-align: right;
  letter-spacing: .05rem;
padding-right: 8px;
padding-top: 4px;

// background: ${props => props.model.value.destination};
// color: ${props => props.model.lab_d65_l > 50 ? "black" : "white"};
// border: ${props => props.model.lab_d65_l > 90 ? "1px solid #E2E2E2" : "1px solid #E2E2E2"};
`;

const MiddleSection = styled.div`
width: 72px;
height: 39px;
  display: flex;
  justify-content: center;
  align-items: center;
// background: ${props => props.model.value.destination};
// color: ${props => props.model.lab_d65_l > 50 ? "black" : "white"};
// border: ${props => props.model.lab_d65_l > 90 ? "1px solid #E2E2E2" : "1px solid #E2E2E2"};
`;

const BottomSection = styled.div`
width: 72px;
height: 20px;
// background: ${props => props.model.value.destination};
// color: ${props => props.model.lab_d65_l > 49 ? "black" : "white"};
// border: ${props => props.model.lab_d65_l > 90 ? "1px solid #E2E2E2" : "1px solid #E2E2E2"};
padding-left: 8px;
  justify-content: center;

`;