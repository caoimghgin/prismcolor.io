import { useState } from "react"
import { useMantineColorScheme, Select } from '@mantine/core';

import styled from "styled-components";

export default function SideNav(props) {
    const { setColorScheme } = useMantineColorScheme();

    const [selectedSwatchDisplayOption, setSelectedSwatchDisplayOption] = useState(swatchDisplayOptions[1]);

    const onSelectSwatchDisplayChangeHandler = async (event) => {
        setSelectedSwatchDisplayOption(event)
        props.setDelegate({ ...props.delegate, displayValue: event.value })
    }

    const onChangeHandler = (foo) => {
        console.log("onChangeHandler:", foo)
    }

    return (
        <Container>
        <Select
          label = "Swatch Contrast Tag"
          placeholder = "Pick Swatch Contrast"
          data = {['None', 'CIE L* (d65)', 'APCA', 'WCAG21']}
          onChange={onChangeHandler}
        />
        </Container>
      );
}

const Container = styled.div`
    padding: 16px;

`

const View = styled.div`
    height: 100%;
    width: 300px;
    top: 0;
    left: 0;
    background-color: ##f1f1f1;
    padding: 36px;
`;

const swatchDisplayOptions = [
    { value: 'none', label: 'NONE' },
    { value: 'ciel*d65', label: 'CIE L* (d65)' },
    { value: 'apcalc_white', label: 'APCA' },
    { value: 'wcag21', label: 'WCAG21' },
];