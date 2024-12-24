import { Modal, Menu, Button } from "@mantine/core";
import { IconSettings, IconPlug, IconBrandGithub, IconBrandYoutube, IconBrandMedium, IconBrandBluesky, IconBrandX, IconBrandLinkedin } from "@tabler/icons-react";

export default function NavBarMenu() {
    return (
        <Menu trigger="hover" openDelay={100} closeDelay={400} width={320} withArrow>
            <Menu.Target>
                <Button variant="transparent" size="xs" color="#525252"><IconSettings size={24} /></Button>
            </Menu.Target>
            <Menu.Dropdown>
                
                <Menu.Label>Figma</Menu.Label>
                <Menu.Item leftSection={<IconPlug style={{ width: 18, height: 18 }} />} onClick={() => windowOpen('https://www.figma.com/community/plugin/1143283713928897621/genome-import')}>
                    Install Palette Importer
                </Menu.Item>

                <Menu.Label>Open Source</Menu.Label>
                <Menu.Item leftSection={<IconBrandGithub style={{ width: 18, height: 18 }} />} onClick={() => windowOpen('https://github.com/caoimghgin/prismcolor.io')}>
                    Web Application (Code)
                </Menu.Item>

                <Menu.Item leftSection={<IconBrandGithub style={{ width: 18, height: 18 }} />} onClick={() => windowOpen('https://github.com/caoimghgin/genome-import-figma')}>
                    Palette Importer Plugin (Code)
                </Menu.Item>

                <Menu.Label>Learning</Menu.Label>
                <Menu.Item leftSection={<IconBrandYoutube style={{ width: 18, height: 18 }} />} onClick={() => windowOpen('https://uxdesign.cc/applying-game-design-logic-to-your-design-system-111a2116509')}>
                    PrismColor.io Videos
                </Menu.Item>

                <Menu.Item leftSection={<IconBrandMedium style={{ width: 18, height: 18 }} />} onClick={() => windowOpen('https://medium.com/user-experience-design-1/the-genome-color-tool-28ce73b20768?sk=4a0dbd24196ff92dcec52ca8f6fce7f6')}>
                    The Genome Color Tool
                </Menu.Item>

                <Menu.Item leftSection={<IconBrandMedium style={{ width: 18, height: 18 }} />} onClick={() => windowOpen('https://uxdesign.cc/how-should-you-name-your-colors-in-a-design-system-3086513476df?sk=75cd58b3783830bcaebc7b1995b18e50')}>
                    Naming Colors in a Design System
                </Menu.Item>

                <Menu.Item leftSection={<IconBrandMedium style={{ width: 18, height: 18 }} />} onClick={() => windowOpen('https://medium.com/user-experience-design-1/applying-game-design-logic-to-your-design-system-111a2116509?sk=9ebf1fca77c56439f5cf441972a92d38')}>
                    Game Design & Design Systems
                </Menu.Item>

                <Menu.Divider />

                <Menu.Label>Contact</Menu.Label>
                <Menu.Item leftSection={<IconBrandBluesky style={{ width: 18, height: 18 }} />} onClick={() => windowOpen('https://bsky.app/profile/caoimghgin.bsky.social')}>
                    BlueSky
                </Menu.Item>

                <Menu.Item leftSection={<IconBrandX style={{ width: 18, height: 18 }} />} onClick={() => windowOpen('https://bsky.app/profile/caoimghgin.bsky.social')}>
                    X (Twitter)
                </Menu.Item>

                <Menu.Item leftSection={<IconBrandLinkedin style={{ width: 18, height: 18 }} />} onClick={() => windowOpen('https://www.linkedin.com/in/kevinrmuldoon/')}>
                    LinkedIn
                </Menu.Item>


            </Menu.Dropdown>
        </Menu>
    )
}

function windowOpen(url: string) {
    window.open(url, '_blank', 'noopener, noreferrer');
}
