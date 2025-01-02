import styled from "styled-components";
import { useMantineColorScheme, Select, Space } from '@mantine/core';
import { IconPencil } from "@tabler/icons-react";
import { optimizations } from '../../../models/OptimizationModel'

export default function Main(props) {
    const { setColorScheme } = useMantineColorScheme();

    const onChangeContrastHandler = (contrast) => {
        const result = {...props.delegate, contrast: contrast}
        props.setDelegate(result)
    }

    const onChangeOptimizationHandler = (optimization) => {
        const result = {...props.delegate, optimization: optimization}
        props.setDelegate(result)
    }

    const onClick = (value) => {
        const result = {...props.delegate, editing: value}
        props.setDelegate(result)
    }

    return (
        <>
            <Select
                label="Optimization"
                value={props.delegate.optimization}
                data={optimizations.map(item => item.name)}
                onChange={onChangeOptimizationHandler}
            />
            <Space h="8" />
            <Select
                label="Contrast"
                value={props.delegate.contrast}
                placeholder="Pick Swatch Contrast"
                data={['CIE L* (d65)', 'WCAG21', 'APCA', 'Ok L*', 'CAM16', 'HCT T%']}
                onChange={onChangeContrastHandler}
            />
            <Space h="36" />
            {props.model.scales.map(item => {
                return (
                    <>
                        <Chip onClick={() => onClick(item)}>
                            <ChipGradientSwatch model={item} />
                            {item.semantic}
                            <Icon><IconPencil size={18} /></Icon>
                        </Chip>
                        <Space h="sm" />
                    </>
                )
            })}
        </>
    );
}

const Icon = styled.div`
margin-left: auto; 
margin-right: 0;
`

const ChipGradientSwatch = styled.div`
    height:64px;
    width:64px;
    margin-right: 8px;
    border-radius: 8px 0px 0px 8px;
    border: 1px solid #d4d4d4;
    background-image: linear-gradient(-45deg,  
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
      cursor: pointer;

`;