import styled from "styled-components"
import SwatchGroup from "../../SwatchGroup/SwatchGroup"
import ScaleGroup from "../../ScaleGroup/ScaleGroup"

export default function Main(props) {
    if (!props) return
    return (
        <Wrapper>
             <ScaleGroup key={1} model={props.delegate.editing} delegate={props.delegate} />
        </Wrapper>
    )
}

const Wrapper = styled.div`
border:1px solid #e3e3e3;
border-radius: 8px;
margin:16px;
width: 100%;
background: #ffffff;
`