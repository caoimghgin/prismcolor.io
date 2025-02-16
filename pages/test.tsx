import styled from "styled-components";

export default function HomePage() {
    return (
        <Container>
            <Element />
        </Container>
    );
}

const Container = styled.div`
    width: 100vw;
    height: 800px;
    margin: 0;
    background: #ecfafe ;
`;

const Element = styled.div`
    width: 100vw;
    height: 800px;
    background: radial-gradient(farthest-side at bottom left, #85e2f9, transparent 1000px), radial-gradient(farthest-corner at bottom right, rgba(112, 135, 251, 0.5), transparent 2000px);
`;

const ElementXXX = styled.div`
    width: 100vw;
    height: 100vh;
    background: radial-gradient(farthest-side at bottom left, rgba(255, 0, 255, 0.5), transparent), radial-gradient(farthest-corner at bottom right, rgba(255, 50, 50, 0.5), transparent 400px);
`;