import Image from "next/image";
import styled from "styled-components";

export default function NavBar() {
    return (
        <Wrapper>
          <Image 
            src="images/logo.svg"
            width={130}
            height={38}
            alt="PrismColor Logo"
          />
        </Wrapper>
    )
}

const Wrapper = styled.div`
  width: 100%;
  height: 56px;
  border-bottom:1px solid #e3e3e3;
  background: #ffffff;
  padding-top:8px;
  padding-left: 24px;
  padding-right: 24px;
`