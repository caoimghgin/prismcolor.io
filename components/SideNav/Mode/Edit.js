import styled from "styled-components";
import { useState, useEffect } from "react"
import { Select, Space, TextInput, Button, ColorInput, Divider } from '@mantine/core';
import { optimizations } from '@/models/OptimizationModel'
import ColumnModel from "@/models/ColumnModel";
import Color, {Parse} from 'colorjs.io';

export default function Main(props) {

    const [value, setValue] = useState();
    const [anchor, setAnchor]  = useState();
    const [anchorValue, setAnchorValue] = useState();
    const [editing, setEditing] = useState();
    const [keyValues, setKeyValues] = useState();

    useEffect(() => {
        setEditing(props.delegate.editing)
        setValue(props.delegate.editing.semantic)
        setAnchor(props.delegate.editing.swatches.find(item => item.isAnchor))
        setKeyValues(parseKeyValues(props.delegate.editing.swatches))
    }, [])

    useEffect(() => {
        if (!keyValues) return
        console.log("NEW KEY VALUES ->", keyValues)
        const newSet = new ColumnModel(editing.id, editing.semantic, keyValues)
        setEditing(newSet)
        props.setDelegate({ ...props.delegate, editing: newSet })
    }, [keyValues])

    useEffect(() => {
        if (!anchor) return
        if (anchor) setAnchorValue(anchor.hex)
    }, [anchor])

    useEffect(() => {
        if (!anchorValue) return
        const newSet = new ColumnModel(editing.id, editing.semantic, [anchorValue])
        setEditing(newSet)
        props.setDelegate({ ...props.delegate, editing: newSet })
    }, [anchorValue])

    useEffect(() => {
        if (!editing) return
        props.model.scales[editing.id].semantic = value
    }, [value])

    function parseKeyValues(swatches) {
        const result = []
        result.push(props.delegate.editing.swatches.find(item => item.isAnchor))
        if (result[0] === undefined) return []
        result.push(swatches.filter(swatch => swatch.isKey))
        return result.flat(1).map((swatch, index) => (
            index === 0 ? swatch.value.origin : swatch.value.destination
        ))
    }

    const onChangeOptimizationHandler = (optimization) => {
        const result = { ...props.delegate, optimization: optimization }
        props.setDelegate(result)
    }

    const onSave = (event) => {
        if (!editing) return
        props.model.scales[editing.id] = editing
        props.setDelegate({ ...props.delegate, editing: null })
    }

    const onCancel = (event) => {
        props.setDelegate({ ...props.delegate, editing: null })
    }

    const updateAnchorValue = (event) => {
        if (event.length === 7) setAnchorValue(event)
    }

    if (!editing) return
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

                {/* {anchorValue ? <ColorInput defaultValue={anchorValue} onChange={setAnchorValue} /> : null } */}
                {anchorValue ? <ColorInput defaultValue={anchorValue} onChange={(event) => updateAnchorValue(event)} /> : null }
                <Space h="sm" />
                <Divider my="md" />

                {keyValues.map(key =>  {
                    // console.log("->", key)
                    // const defaultValue = new Color(key)
                    // console.log("->", defaultValue)

                    const parsedValue = Color.parse(key)
                    const defaultValue = new Color(parsedValue.spaceId, parsedValue.coords)
                    console.log("-->", defaultValue.toString({format: "hex"}))
                    return (
                        <ColorInput defaultValue={defaultValue.toString({format: "hex"})}  mb={8}/> 
                    )

                } )}

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