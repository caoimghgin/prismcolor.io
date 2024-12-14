import { useState } from "react"
import { useMantineColorScheme, Select, Space } from '@mantine/core';

import styled from "styled-components";

export default function SideNav(props) {
    const { setColorScheme } = useMantineColorScheme();

    const [selectedSwatchDisplayOption, setSelectedSwatchDisplayOption] = useState(swatchDisplayOptions[1]);
    const [optimizationValue, setOptimizationValue] = useState("Universal");
    const [contrastValue, setContrastValue] = useState("WCAG21");

    const onSelectSwatchDisplayChangeHandler = async (event) => {
        setSelectedSwatchDisplayOption(event)
        props.setDelegate({ ...props.delegate, displayValue: event.value })
    }

    const onChangeContrastHandler = (selection) => {
        setContrastValue(selection)
    }

    const onChangeOptimizationHandler = (selection) => {
        setOptimizationValue(selection)
    }

    return (
        <Container>
        <Select
          label = "Optimization"
          value = {optimizationValue}
          data = {["Universal", "Material Design", "IBM Carbon", "Salesforce Lightning", "Adobe Spectrum", "Ant Design", "Accessible Palette", "ColorBox", "Genome" ]}
          onChange={onChangeOptimizationHandler}
        />
              <Space h="md" />

                <Select
          label = "Swatch Contrast Tag"
          value = {contrastValue}
          placeholder = "Pick Swatch Contrast"
          data = {['WCAG21', 'APCA', 'CIE L* (d65)']}
          onChange={onChangeContrastHandler}
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