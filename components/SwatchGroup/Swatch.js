import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { Anchor, Key, AlertTriangle } from 'feather-icons-react';

export default function SwatchView(props) {

    const [model, setModel] = useState()

    useEffect(() => {
        if (!props.model || !props.delegate) return
        setModel({ ...props.model, delegate: props.delegate })
    }, [props.model, props.delegate])

    const onClickHandler = () => {
        console.table(model)
        console.log(model.color)
        console.log("AM I IN GAMUT of sRGB?", model.color.inGamut("srgb"))     
        navigator.clipboard.writeText(model.hex)
    }
    return render(model, onClickHandler)
}

const render = (model, onClickHandler) => {
    if (!model) return
    return <Wrapper>
        {model.weight}    
        <Swatch model={model} onClick={onClickHandler}>
            <TopSection model={model}>
                <TopSectionLeft model={model}>{model.color.inGamut("srgb") ? null : <AlertTriangle size={14}/>}</TopSectionLeft>
                <TopSectionMiddle model={model}></TopSectionMiddle>
                <TopSectionRight model={model}>{model.weight}</TopSectionRight>
            </TopSection>
            <MiddleSection model={model}>{getIcon(model)}</MiddleSection>
            <BottomSection model={model}>{contrastLabel(model)}</BottomSection>
        </Swatch>
    </Wrapper>
}

const getWeight = (model) => {
    if (model.color.inGamut("srgb")) {
        return model.weight
    } else {
        "NOT"
    }
    
    return (
        <div>
        <Zap size={12}/> {model.weight}
        </div>
    )
}

const contrastLabel = (model) => {
    const value = model.wcag_white.toFixed(2)
    const result = parseFloat(value)
    return `${result}:1`
}

const getIcon = (model) => {
    const size = 24
    if (model.isKey) return (<Key size={size}/>)
    if (model.isAnchor) return (<Anchor size={size}/>)
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
height: 20px;
display: flex;
flex-direction: row;
justify-content: space-between;
width: 72px;
font-size: 9px;
font-weight: 600;
font-family: "Helvetica";
text-align: right;
letter-spacing: .05rem;
padding-right: 8px;
padding-left: 8px;
padding-top: 4px;
// border: ${props => props.model.lab_d65_l > 90 ? "1px solid #E2E2E2" : "1px solid #E2E2E2"};
`;

const TopSectionLeft = styled.div`
// border: ${props => props.model.lab_d65_l > 90 ? "1px solid #E2E2E2" : "1px solid #E2E2E2"};
`;

const TopSectionMiddle = styled.div`
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
justify-content: center;
// border: ${props => props.model.lab_d65_l > 90 ? "1px solid #E2E2E2" : "1px solid #E2E2E2"};
`;