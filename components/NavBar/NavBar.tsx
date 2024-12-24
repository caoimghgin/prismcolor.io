import Image from "next/image";
import styled from "styled-components";
import { Button } from '@mantine/core';
import { IconDownload } from "@tabler/icons-react";
import NavBarMenu from "./NavBarMenu";

export default function NavBar() {
    return (
        <Wrapper>
          <Image 
            src="images/logo.svg"
            width={130}
            height={38}
            alt="PrismColor Logo"
          />
          <ButtonGroup>
            <NavBarMenu></NavBarMenu>
            <Button rightSection={<IconDownload size={18} />} size="xs" color="#0070c1">Download</Button>
          </ButtonGroup>
        </Wrapper>
    )
}

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 56px;
  border-bottom:1px solid #e3e3e3;
  background: #ffffff;
  padding-left: 24px;
  padding-right: 24px;
`