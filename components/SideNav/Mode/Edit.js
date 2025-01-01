import styled from "styled-components";
import { useState, useEffect } from "react"
import { Select, Space, TextInput, Button, ColorInput, Divider } from '@mantine/core';
import { optimizations } from '../../../models/OptimizationModel'
import ColumnModel from "@/models/ColumnModel";

export default function Main(props) {

    const [value, setValue] = useState(props.delegate.editing.semantic);
    const [anchorValue, setAnchorValue] = useState(props.delegate.editing.swatches.find(item => item.isAnchor).hex);
    const [editing, setEditing] = useState(props.delegate.editing)

    useEffect(() => {
        if (!anchorValue) return
        const newSet = new ColumnModel(editing.id, editing.semantic, [anchorValue])
        setEditing(newSet)
        props.setDelegate({ ...props.delegate, editing: newSet })
    }, [anchorValue])

    useEffect(() => {
        const anchor = editing.swatches.find(item => item.isAnchor)
        props.model.scales[editing.id].semantic = value
    }, [value])

    const onChangeOptimizationHandler = (optimization) => {
        const result = { ...props.delegate, optimization: optimization }
        props.setDelegate(result)
    }

    const onSave = (event) => {
        props.model.scales[editing.id] = editing
        props.setDelegate({ ...props.delegate, editing: null })
    }

    const onCancel = (event) => {
        props.setDelegate({ ...props.delegate, editing: null })
    }

    return (
        <>
            <Button size="xs" color="#0070c1" onClick={() => onSave()}>Save</Button>
            <Button ml="sm" variant="default" size="xs" color="#0070c1" onClick={() => onCancel()}>Cancel</Button>
            <Divider my="md" />
            <Space h={5} />

            <Select
                label="Optimization"
                value={props.delegate.optimization}
                data={optimizations.map(item => item.name)}
                onChange={onChangeOptimizationHandler}
            />
            <Space h={36} />
            <>
                <Chip>
                    <ChipGradientSwatch model={editing} />
                    <TextInput value={value} onChange={(event) => setValue(event.currentTarget.value)}
                        size="xsm"
                    />
                </Chip>
                <Space h="sm" />

                <ColorInput defaultValue={anchorValue ? anchorValue : ""} onChange={setAnchorValue} />

                <Space h="sm" />

            </>
            <Space h="sm" />
        </>
    );
}

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
    border: 1px solid #d4d4d4;
    display: flex;
    align-items: center;
    font-size: 13px;
    font-weight: 600;
    padding-right: 16px;
    cursor: pointer;
`;