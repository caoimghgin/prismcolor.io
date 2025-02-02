import React, { useEffect, useState } from 'react';
import Color from 'colorjs.io';
import { PlusCircle, Trash2, XCircle } from 'feather-icons-react';
import styled from 'styled-components';
import { Button, ColorInput, Divider, Select, Space, TextInput } from '@mantine/core';
import { optimizations } from '@/models/OptimizationModel';
import ScaleModel from '@/models/ScaleModel';

export default function Main(props) {
  const [value, setValue] = useState();
  const [editing, setEditing] = useState();
  const [keyValues, setKeyValues] = useState();

  useEffect(() => {
    setEditing(props.delegate.editing);
    setValue(props.delegate.editing.semantic);
    setKeyValues(parseKeyValues(props.delegate.editing.swatches));
  }, []);

  useEffect(() => {
    if (!keyValues) return;
    const newSet = new ScaleModel(editing.id, editing.semantic, keyValues);
    setEditing(newSet);
    props.setDelegate({ ...props.delegate, editing: newSet });
    console.log(keyValues);
  }, [keyValues]);

  useEffect(() => {
    if (!editing) return;
    props.model.values[editing.id].semantic = value;
  }, [value]);

  function parseKeyValues(swatches) {
    const result = [];
    result.push(props.delegate.editing.swatches.find((item) => item.isAnchor));
    if (result[0] === undefined) return [];
    result.push(swatches.filter((swatch) => swatch.isKey));
    result.flat(1);
    console.log('ORIGINAL ->', result);
    return result
      .flat(1)
      .map((swatch, index) => (index === 0 ? swatch.value.origin : swatch.value.destination));
  }

  const onChangeOptimizationHandler = (optimization) => {
    const result = { ...props.delegate, optimization: optimization };
    props.setDelegate(result);
  };

  const onSave = (event) => {
    if (!editing) return;
    props.model.values[editing.id] = editing;
    props.setDelegate({ ...props.delegate, editing: null });
    // console.log(props.model.values[editing.id].semantic);
    // console.log(editing);
  };

  const onCancel = (event) => {
    props.setDelegate({ ...props.delegate, editing: null });
  };

  const onUpdateKeyValues = (event, index) => {
    console.log(event, index);
    if (event.length === 7) {
      const result = keyValues;
      result[index] = event;
      setKeyValues([...result]);
    }
  };

  const onDeleteKeyValue = (index) => {
    const result = keyValues;
    result.splice(index, 1);
    const newSet = new ScaleModel(editing.id, editing.semantic, result);
    setEditing(newSet);
    props.setDelegate({ ...props.delegate, editing: newSet });
  };

  const onAddKey = () => {
    const result = keyValues;
    result.push('#FFFFFF');
    const newSet = new ScaleModel(editing.id, editing.semantic, result);
    setEditing(newSet);
    props.setDelegate({ ...props.delegate, editing: newSet });
  };

  if (!editing) return;

  return (
    <>
      <Button size="xs" color="#0070c1" onClick={() => onSave()}>
        Save
      </Button>
      <Button ml="sm" variant="default" size="xs" color="#0070c1" onClick={() => onCancel()}>
        Cancel
      </Button>
      <Divider my="md" />
      <Space h={5} />

      <Select
        label="Optimization"
        value={props.delegate.optimization}
        data={optimizations.map((item) => item.name)}
        onChange={onChangeOptimizationHandler}
      />
      <Space h="md" />
      <>
        <Chip>
          <ChipGradientSwatch>
            {editing.swatches.map((pip) => (
              <Pip $model={pip.hex} key={pip.hex} />
            ))}
          </ChipGradientSwatch>
          <TextInput
            size="xsm"
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
          />
        </Chip>
        <Space h="sm" />
        <Divider my="md" />
        <>
          <KeysHeader>
            <Title>Keys</Title>
            <KeysHeader>
              <XCircle size={20} />
              <Space w={8} />
              <PlusCircle size={20} onClick={() => onAddKey()} />
            </KeysHeader>
          </KeysHeader>
        </>
        <Space h={16} />

        {keyValues.map((key, index) => {
          const parsedValue = Color.parse(key);
          const defaultValue = new Color(parsedValue.spaceId, parsedValue.coords);
          return (
            <React.Fragment key={index}>
              <KeyChip>
                <ColorInput
                  value={defaultValue.toString({ format: 'hex' })}
                  onChange={(event) => onUpdateKeyValues(event, index)}
                  mr={8}
                />
                <Trash2 size={18} onClick={(event) => onDeleteKeyValue(index)} />
              </KeyChip>
              <Space h={12} />
            </React.Fragment>
          );
        })}
        <Space h="sm" />
      </>
      <Space h="sm" />
    </>
  );
}

const KeysHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 14px;
`;

const KeyChip = styled.div`
  display: flex;
  align-items: center;
`;

const Pip = styled.div`
  height: 14px;
  width: 14px;
  background-color: ${(props) => props.$model};
`;

const ChipGradientSwatch = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 70px;
  width: 70px;
  margin-right: 12px;
  border-radius: 8px 0px 0px 8px;
  background: black;
`;

const Chip = styled.div`
  height: 70px;
  width: 100%;
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px solid #e3e3e3;
  display: flex;
  align-items: center;
  font-size: 13px;
  //   font-weight: 600;
  //   padding-right: 16px;
  cursor: pointer;
  overflow: hidden;
`;
