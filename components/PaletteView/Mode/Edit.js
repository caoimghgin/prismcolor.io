import styled from "styled-components"

export default function Main(props) {
    if (!props) return
    return (
        <Wrapper>
            <p>     Edit Mode is a good thing </p>
        </Wrapper>
    )
}

const Wrapper = styled.div`
border:1px solid #e3e3e3;
border-radius: 8px;
margin:16px;
width: 100%
background: #ffffff;
`