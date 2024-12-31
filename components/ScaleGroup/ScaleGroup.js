import Scale from "./Scale"
import styled from "styled-components";

export default function SwatchGroupView(props) {
    if (!props.model) return
    return (
        <Title>
            Scale
            <Container>
                <Wrapper>
                    <Main className="ScaleView">
                        {props.model.swatches.map((model, index) => {
                            return <Scale key={index} model={model} delegate={props.delegate} />
                        })}
                    </Main>
                </Wrapper>
            </Container>
        </Title>
    )
}

const Title = styled.div`
font-weight: 500;
font-size: 14px;
`

const Container = styled.div`
    display: flex;
    width: 980px;
    height:220px
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    border-radius: 8px;
    border: 1px solid #e3e3e3;
`

const Wrapper = styled.div`
    margin: 16px;
    display: flex;
    width: 920px;
    `

const Main = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%
    flex: 1;
    ` 