import React, { useState, useEffect } from 'react';
import styled from "styled-components";

export default function SwatchView(props) {

    const [model, setModel] = useState()

    useEffect(() => {
        if (!props.model || !props.delegate) return
        setModel({ ...props.model, delegate: props.delegate })
    }, [props.model, props.delegate])

    const onClickHandler = () => {
        console.log(model)
        navigator.clipboard.writeText(model.hex)
    }

    return render(model, onClickHandler)

}

const render = (model, onClickHandler) => {
    if (!model) return
    return <Wrapper>
        {model.weight}
        <View model={model} onClick={onClickHandler}/>
    </Wrapper>
}

const Wrapper = styled.div`
font-size: 12px;
font-weight: 600;
font-family: "Helvetica";
`

const View = styled.div`
width: 72px;
min-width: 72px;
height: 72px;
min-height: 72px;
background: ${props => props.model.value.destination};
border-radius: 8px;
margin: 0px 16px 8px 0px;
border: ${props => props.model.lab_d65_l > 90 ? "1px solid #E2E2E2" : null};
`;