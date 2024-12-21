import Scale from "./Scale"
import styled from "styled-components";

export default function SwatchGroupView(props) {
    if (!props.model) return
    return (
        <Container>
            <Main className="ScaleView">
                {props.model.swatches.map((model, index) => {
                    return <Scale key={index} model={model} delegate={props.delegate} />
                })}
        </Main>
        </Container>
    )
}

const Container = styled.div`
    margin: 16px;
    display: flex;
    background: white;
    `

const Title = styled.div`
  flex: 0 0 100px;
    padding-top: 18px;
    font-weight: bold;
    font-size: 12px;
    `

const Main = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%
    flex: 1;
    background: white;
    ` 