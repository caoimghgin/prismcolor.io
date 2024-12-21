import styled from "styled-components"
import SwatchGroup from "../../SwatchGroup/SwatchGroup"

export default function Main(props) {
    if (!props) return
    return (
        <Wrapper>
            {props.model.columns.map((column, index) =>
                <SwatchGroup key={index} model={column} delegate={props.delegate} />
            )}
        </Wrapper>
    )
}

const Wrapper = styled.div`
border:1px solid #e3e3e3;
border-radius: 8px;
margin:16px;
background: #ffffff;
`