import Image from "next/image";
import styled from "styled-components";
import { Button, Menu } from '@mantine/core';
import { IconDownload, IconSettings, IconPlug, IconBrandGithub, IconBrandMedium, IconBrandYoutube, IconBrandLinkedin, IconBrandX, IconBrandBluesky } from "@tabler/icons-react";

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
          <Menu trigger="hover" openDelay={100} closeDelay={400} width={320} withArrow>
          <Menu.Target>
            <Button variant="transparent" size="xs" color="#3b3b3b"><IconSettings size={24} /></Button>
            </Menu.Target>
            <Menu.Dropdown>

            <Menu.Label>Figma</Menu.Label>
        <Menu.Item leftSection={<IconPlug style={{ width: 18, height: 18 }} />}>
         Install Palette Importer
        </Menu.Item>
        
        <Menu.Label>Open Source</Menu.Label>
        <Menu.Item leftSection={<IconBrandGithub style={{ width: 18, height: 18 }} />}>
          Web Application (Code)
        </Menu.Item>
        <Menu.Item leftSection={<IconBrandGithub style={{ width: 18, height: 18 }} />}>
          Palette Importer Plugin (Code)
        </Menu.Item>
 
        <Menu.Label>Knowledge Base</Menu.Label>
        <Menu.Item leftSection={<IconBrandYoutube style={{ width: 18, height: 18 }} />}>
          PrismColor.io Videos
        </Menu.Item>
        <Menu.Item leftSection={<IconBrandMedium style={{ width: 18, height: 18 }} />}>
          The Genome Color Tool
        </Menu.Item>
        <Menu.Item leftSection={<IconBrandMedium style={{ width: 18, height: 18 }} />}>
          Naming Colors in a Design System
        </Menu.Item>
        <Menu.Item leftSection={<IconBrandMedium style={{ width: 18, height: 18 }} />}>
          Design Systems & Game Design
        </Menu.Item>  
        
        <Menu.Divider />

        <Menu.Label>Contact</Menu.Label>
        <Menu.Item leftSection={<IconBrandBluesky style={{ width: 18, height: 18 }} />} >
          BlueSky
        </Menu.Item>
        <Menu.Item leftSection={<IconBrandX style={{ width: 18, height: 18 }} />} >
          X (Twitter)
        </Menu.Item>
        <Menu.Item leftSection={<IconBrandLinkedin style={{ width: 18, height: 18 }} />} >
          LinkedIn
        </Menu.Item>

      </Menu.Dropdown>
    </Menu>
            <Button rightSection={<IconDownload size={18} />} size="xs">Download</Button>

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