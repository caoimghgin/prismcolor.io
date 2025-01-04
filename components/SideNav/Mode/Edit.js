import styled from "styled-components";
import { useState, useEffect } from "react"
import { Select, Space, TextInput, Button, ColorInput, Divider } from '@mantine/core';
import { optimizations } from '@/models/OptimizationModel'
import ColumnModel from "@/models/ColumnModel";
import Color from 'colorjs.io';
import { Trash2, PlusCircle, XCircle } from 'feather-icons-react';

export default function Main(props) {

    const [value, setValue] = useState();
    const [editing, setEditing] = useState();
    const [keyValues, setKeyValues] = useState();

    useEffect(() => {
        setEditing(props.delegate.editing)
        setValue(props.delegate.editing.semantic)
        setKeyValues(parseKeyValues(props.delegate.editing.swatches))
    }, [])

    useEffect(() => {
        if (!keyValues) return
        const newSet = new ColumnModel(editing.id, editing.semantic, keyValues)
        setEditing(newSet)
        props.setDelegate({ ...props.delegate, editing: newSet })
        console.log(keyValues)
    }, [keyValues])

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

    const onUpdateKeyValues = (event, index) => {
        console.log(event, index)
        if (event.length === 7) {
            const result = keyValues
            result[index] = event
            setKeyValues([...result])
        }
    }

    const onDeleteKeyValue = (index) => {
        const result = keyValues
        result.splice(index, 1)
        const newSet = new ColumnModel(editing.id, editing.semantic, result)
        setEditing(newSet)
        props.setDelegate({ ...props.delegate, editing: newSet })
    }

    const onAddKey = () => {
        const result = keyValues
        result.push("#FFFFFF")
        const newSet = new ColumnModel(editing.id, editing.semantic, result)
        setEditing(newSet)
        props.setDelegate({ ...props.delegate, editing: newSet })
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
            <Space h="md" />
            <>
                <Chip>
                    <ChipGradientSwatch model={editing} />
                    <TextInput value={value} onChange={(event) => setValue(event.currentTarget.value)}
                        size="xsm"
                    />
                </Chip>
                <Space h="sm" />
                <Divider my="md" />
                <>
                    
                <KeysHeader>
                    <Title>Keys</Title>
                    <KeysHeader>
                    <XCircle size={20}></XCircle>
                    <Space w={8} />
                    <PlusCircle size={20} onClick={() => onAddKey()}></PlusCircle>                    
                    </KeysHeader>
                </KeysHeader>
                </>
                <Space h={16} />

                {keyValues.map((key, index) => {
                    const parsedValue = Color.parse(key)
                    const defaultValue = new Color(parsedValue.spaceId, parsedValue.coords)
                    return (
                        <>
                            <KeyChip>
                                <ColorInput value={defaultValue.toString({ format: "hex" })} onChange={(event) => onUpdateKeyValues(event, index)} mr={8} />
                                <Trash2 size={18} onClick={(event) => onDeleteKeyValue(index)}/>
                            </KeyChip>
                            <Space h={12} />
                        </>
                    )
                })}
                <Space h="sm" />
            </>
            <Space h="sm" />
        </>
    );

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


const KeysHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const Title = styled.div`
font-weight: 500;
font-size: 14px;
`

const KeyChip = styled.div`
    display: flex;
    align-items: center;
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
    border: 1px solid #d4d4d4;
    display: flex;
    align-items: center;
    font-size: 13px;
    font-weight: 600;
    padding-right: 16px;
    cursor: pointer;
`;