import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { Anchor, Key, AlertTriangle } from 'feather-icons-react';

export default function SwatchView(props) {

    const [model, setModel] = useState()

    useEffect(() => {
        if (!props.model || !props.delegate) return
        console.log("delegate:", props.delegate)
        setModel({ ...props.model, delegate: props.delegate })
    }, [props.model, props.delegate])

    const onClickHandler = () => {
        console.table(model)
        console.log(model.color)
        console.log("AM I IN GAMUT of sRGB?", model.color.inGamut("srgb"))     
        navigator.clipboard.writeText(model.hex)
    }
    return render(model, props.delegate, onClickHandler)
}

const render = (model, delegate, onClickHandler) => {
    if (!model) return
    return <Wrapper>
        {model.weight}    
        <Swatch model={model} delegate={delegate} onClick={onClickHandler}>
            <TopSection model={model}>
                <TopSectionLeft model={model}>{model.color.inGamut("srgb") ? null : <AlertTriangle size={14}/>}</TopSectionLeft>
                <TopSectionMiddle model={model}></TopSectionMiddle>
                <TopSectionRight model={model}>{model.weight}</TopSectionRight>
            </TopSection>
            <MiddleSection model={model}>{getIcon(model)}</MiddleSection>
            <BottomSection model={model}>{contrastLabel(model, delegate)}</BottomSection>
        </Swatch>
    </Wrapper>
}

const contrastLabel = (model, delegate) => {
    if (delegate.contrast === "WCAG21") {
        const value = model.wcag_white.toFixed(2)
        const result = parseFloat(value)
        return `${result}:1`
    }
    if (delegate.contrast === "CIE L* (d65)") {
        const value = model.lab_d65_l.toFixed(2)
        const result = parseFloat(value)
        return `L* ${result}`
    }
    if (delegate.contrast === "APCA") {
        const white = Math.abs(model.apca_white);
        const black = Math.abs(model.apca_black);
        if (white > black) return `Lc ${model.apca_white.toFixed(2)}`
        return `Lc ${model.apca_black.toFixed(2)}`
    }
}

const getIcon = (model) => {
    const size = 20
    if (model.isKey) return (<Key size={size}/>)
    if (model.isAnchor) return (<Anchor size={size}/>)
}

const Wrapper = styled.div`
font-size: 11px;
font-weight: 600;
font-family: "Helvetica";
`

const Swatch = styled.div`
width: 72px;
min-width: 72px;
height: 72px;
min-height: 72px;
background: ${props => props.model.value.destination};
color: ${props => swatchFrgColor(props)};
border-radius: 8px;
margin: 0px 16px 8px 0px;
border: ${props => props.model.lab_d65_l > 90 ? "1px solid #E2E2E2" : null};
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
height: 20px;
display: flex;
flex-direction: row;
justify-content: space-between;
width: 72px;
text-align: right;
letter-spacing: .05rem;
padding-right: 8px;
padding-left: 8px;
padding-top: 2px;
// border: ${props => props.model.lab_d65_l > 90 ? "1px solid #E2E2E2" : "1px solid #E2E2E2"};
`;

const TopSectionLeft = styled.div`
padding-top: 2px;
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

