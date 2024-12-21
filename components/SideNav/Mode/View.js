import styled from "styled-components";
import { useState } from "react"
import { useMantineColorScheme, Select, Space } from '@mantine/core';
import { Edit } from 'feather-icons-react';
import { optimizations } from '../../../models/OptimizationModel'

export default function Main(props) {
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
        console.log(props.model)
    }

    const onClick = () => {
        if (props.mode === "Palette") {
            props.setMode("Edit")
        } else {
            props.setMode("Palette")
        }
    }

    return (
        <Container>
        <Select
            label = "Optimization"
            value = {optimizationValue}
            data = {optimizations.map(item => item.name)}
            onChange={onChangeOptimizationHandler}
        />
        <Space h="8" />
        <Select
            label = "Contrast"
            value = {contrastValue}
            placeholder = "Pick Swatch Contrast"
            data = {['WCAG21', 'APCA', 'CIE L* (d65)']}
            onChange={onChangeContrastHandler}
        />
        <Space h="36" />
        {props.model.columns.map(item => {
            return (
                <>
                    <Chip onClick={onClick}>
                        <ChipColor model={item}/>
                        {item.semantic}
                        <XXX><Edit size={18}/></XXX>
                        </Chip>
                    <Space h="sm" />
                </>
            )
        })}
        </Container>
      );
}

const XXX = styled.div`
margin-left: auto; 
margin-right: 0;
`

const ChipColor = styled.div`
    height:64px;
    width:64px;
    margin-right: 8px;
    border-radius: 8px 0px 0px 8px;
    border: 1px solid #e3e3e3;
    background-image: linear-gradient(45deg,  
    ${props => props.model.swatches[22].hex}, 
    ${props => props.model.swatches[21].hex}, 
    ${props => props.model.swatches[20].hex}, 
    ${props => props.model.swatches[19].hex}, 
    ${props => props.model.swatches[18].hex}, 
    ${props => props.model.swatches[17].hex}, 
    ${props => props.model.swatches[16].hex}, 
    ${props => props.model.swatches[15].hex}, 
    ${props => props.model.swatches[14].hex}, 
    ${props => props.model.swatches[13].hex}, 
    ${props => props.model.swatches[12].hex}, 
    ${props => props.model.swatches[11].hex}, 
    ${props => props.model.swatches[10].hex}, 
    ${props => props.model.swatches[9].hex}, 
    ${props => props.model.swatches[8].hex}, 
    ${props => props.model.swatches[7].hex}, 
    ${props => props.model.swatches[6].hex}, 
    ${props => props.model.swatches[5].hex}, 
    ${props => props.model.swatches[4].hex}, 
    ${props => props.model.swatches[3].hex}, 
    ${props => props.model.swatches[2].hex}, 
    ${props => props.model.swatches[1].hex}, 
    ${props => props.model.swatches[0].hex});
`

const Chip = styled.div`
    height:64px;
    width:100%;
    background-color: #ffffff;
    border-radius: 8px;
    border: 1px solid #e3e3e3;
    display: flex;
    align-items: center;
    font-size: 13px;
    font-weight: 600;
    padding-right: 16px;
`;

const Container = styled.div`
    padding: 16px;
`;

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