import styled from "styled-components";
import { useState, useEffect } from "react"
import { useMantineColorScheme, Select, Space, TextInput, Button, ColorInput } from '@mantine/core';
import { optimizations } from '../../../models/OptimizationModel'
import { Anchor, Key, Lock, AlertTriangle } from 'feather-icons-react';
import ColumnModel from "@/models/ColumnModel";
import PaletteModel from "@/models/PaletteModel";

export default function Main(props) {

    const { setColorScheme } = useMantineColorScheme();
    const [value, setValue] = useState(props.delegate.editing.semantic);
    const [anchorValue, setAnchorValue] = useState(props.delegate.editing.swatches.find(item => item.isAnchor).hex);
    const [editing, setEditing] = useState(props.delegate.editing)

    useEffect(() => {
        if (!anchorValue) return

        const data = [
            { index: 1, semantic: "primary", keys: [ anchorValue  ] },
            { index: 2, semantic: "secondary", keys: ["#007c00"] },
            { index: 3, semantic: "positive", keys: ["#007c00"]},
            { index: 4, semantic: "negative", keys: ["#007c00"]},
            { index: 5, semantic: "highlight", keys: ["#007c00"]},
            { index: 6, semantic: "info", keys: ["#007c00"] },
            { index: 7, semantic: "system", keys: ["#007c00"]},
            { index: 8, semantic: "neutral", keys: null },
        ]

        const model = new PaletteModel(data)
        console.log(model)
        console.log("editing ->", editing)
        console.log("REPLACE WITH NEW =>", model.columns[0])
        setEditing(model.columns[0])
        props.model.columns[editing.id] = model.columns[0]

    },[anchorValue])

    useEffect(() => {
        const anchor = editing.swatches.find(item => item.isAnchor)
        console.log("->", anchor)
        props.model.columns[editing.id].semantic = value
        const newModel = props.model
    },[value])

    const onChangeOptimizationHandler = (optimization) => {
        const result = {...props.delegate, optimization: optimization}
        props.setDelegate(result)
        console.log(result)
    }

    const onClick = (event) => {
        props.setDelegate({...props.delegate, editing: null})
    }

    return (
        <>
        <Select
            label = "Optimization"
            value = {props.delegate.optimization}
            data = {optimizations.map(item => item.name)}
            onChange={onChangeOptimizationHandler}
        />
        <Space h={36} /> 
        <>
            <Chip>
                <ChipGradientSwatch model={editing}/>
                <TextInput
                    value={value}
                    onChange={(event) => setValue(event.currentTarget.value)}
                    size="xsm"
                />
            </Chip>
            <Space h="sm" />

            <ColorInput
        defaultValue={anchorValue ? anchorValue : ""}
        onChangeEnd={setAnchorValue}
      />

            <Space h="sm" />

        </> 
        <Space h="sm" />
        <Button size="xs" color="#0070c1" onClick={() => onClick()}>Save</Button>
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
    border: 1px solid #e3e3e3;
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

const swatchDisplayOptions = [
    { value: 'none', label: 'NONE' },
    { value: 'ciel*d65', label: 'CIE L* (d65)' },
    { value: 'apcalc_white', label: 'APCA' },
    { value: 'wcag21', label: 'WCAG21' },
];