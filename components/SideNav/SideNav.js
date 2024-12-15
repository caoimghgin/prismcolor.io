import { useState } from "react"
import { useMantineColorScheme, Select, Space } from '@mantine/core';
import { optimizations } from '../../models/OptimizationModel'

import styled from "styled-components";

export default function SideNav(props) {
    const { setColorScheme } = useMantineColorScheme();

    const [selectedSwatchDisplayOption, setSelectedSwatchDisplayOption] = useState(swatchDisplayOptions[1]);
    const [optimizationValue, setOptimizationValue] = useState(optimizations[0].name);
    const [contrastValue, setContrastValue] = useState("WCAG21");

    const onChangeContrastHandler = (selection) => {
        setContrastValue(selection)
        props.setDelegate({...props.delegate, contrast: selection})
    }

    const onChangeOptimizationHandler = (selection) => {
        setOptimizationValue(selection)
        props.setDelegate({...props.delegate, optimization: selection})
    }

    return (
        <Container>
        <Select
          label = "Optimization"
          value = {optimizationValue}
          data = {optimizations.map(item => item.name)}
          onChange={onChangeOptimizationHandler}
        />
              <Space h="md" />
                <Select
          label = "Contrast"
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