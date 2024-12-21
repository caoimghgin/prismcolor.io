import styled from "styled-components"
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
  display: flex;
  align-items: center;
  justify-content: center;
// border:1px solid #e3e3e3;
border-radius: 8px;
margin:16px;
`