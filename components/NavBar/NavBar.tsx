import Image from "next/image";
import styled from "styled-components";

export default function NavBar() {
    return (
        <Container>
          <Image 
            src="/logo.svg"
            width={140}
            height={50}
            alt="PrismColor Logo"
          />
        </Container>
    )
}

const Container = styled.div`
  width: 100%;
  height: 56px;
  border-bottom:1px solid #e3e3e3;
  background: #ffffff;
  padding-left: 16px;
  padding-right: 16px;
`