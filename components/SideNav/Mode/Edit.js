import React, { useEffect, useState } from 'react';
import Color from 'colorjs.io';
import { PlusCircle, Trash2, XCircle } from 'feather-icons-react';
import styled from 'styled-components';
import { Button, ColorInput, Divider, Select, Space, TextInput } from '@mantine/core';
import ColorModel from '@/models/ColorModel';
import { optimizations } from '@/models/OptimizationModel';
import ScaleModel from '@/models/ScaleModel';
import { usePaletteStore } from '../../../store/usePaletteStore';

export default function Main() {
  const { model, delegate, setDelegate, setModel } = usePaletteStore();
  const [value, setValue] = useState(delegate.editing?.semantic);
  const [editing, setEditing] = useState(delegate.editing);
  const [keyValues, setKeyValues] = useState(() => {
    if (!delegate.editing) return [];
    return parseKeyValues(delegate.editing.swatches);
  });

  useEffect(() => {
    setEditing(delegate.editing);
    setValue(delegate.editing?.semantic);
    if (delegate.editing) {
      setKeyValues(parseKeyValues(delegate.editing.swatches));
    }
  }, [delegate.editing]);

  function parseKeyValues(swatches) {
    const result = [];
    result.push(swatches.find((item) => item.isAnchor));
    if (result[0] === undefined) return [];
    result.push(swatches.filter((swatch) => swatch.isKey));
    result.flat(1);
    return result
      .flat(1)
      .map((swatch, index) => (index === 0 ? swatch.value.origin : swatch.value.destination));
  }

  const onChangeOptimizationHandler = (optimization) => {
    setDelegate({ ...delegate, optimization });
  };

  const onSave = () => {
    if (!editing || !model) return;
    const newModel = { ...model };
    newModel.values[editing.id] = editing;
    setModel(newModel);
    setDelegate({ ...delegate, editing: null });
  };

  const onCancel = () => {
    setDelegate({ ...delegate, editing: null });
  };

  const onUpdateKeyValues = (event, index) => {
    if (event.length === 7) {
      const newKeyValues = [...keyValues];
      newKeyValues[index] = event;

      try {
        const validColors = newKeyValues.map((color) => new ColorModel(color));
        const newSet = new ScaleModel(editing.id, editing.semantic, validColors);

        // Update states immediately for real-time feedback
        setKeyValues(newKeyValues);
        setEditing(newSet);
        setDelegate({ ...delegate, editing: newSet });
      } catch (e) {
        // Keep the previous valid state if there's an error
        const prevValidColors = keyValues.map((color) => new ColorModel(color));
        const prevSet = new ScaleModel(editing.id, editing.semantic, prevValidColors);
        setEditing(prevSet);
        setDelegate({ ...delegate, editing: prevSet });
      }
    }
  };

  const onDeleteKeyValue = (index) => {
    const newKeyValues = keyValues.filter((_, idx) => idx !== index);

    try {
      const validColors = newKeyValues.map((color) => new ColorModel(color));
      const newSet = new ScaleModel(editing.id, editing.semantic, validColors);

      setKeyValues(newKeyValues);
      setEditing(newSet);
      setDelegate({ ...delegate, editing: newSet });
    } catch (e) {
      // Revert to previous state if there's an error
      const prevValidColors = keyValues.map((color) => new ColorModel(color));
      const prevSet = new ScaleModel(editing.id, editing.semantic, prevValidColors);
      setEditing(prevSet);
      setDelegate({ ...delegate, editing: prevSet });
    }
  };

  const onAddKey = () => {
    const newKeyValues = [...keyValues, '#FFFFFF'];

    try {
      const validColors = newKeyValues.map((color) => new ColorModel(color));
      const newSet = new ScaleModel(editing.id, editing.semantic, validColors);

      setKeyValues(newKeyValues);
      setEditing(newSet);
      setDelegate({ ...delegate, editing: newSet });
    } catch (e) {
      // Keep current state if there's an error
      const prevValidColors = keyValues.map((color) => new ColorModel(color));
      const prevSet = new ScaleModel(editing.id, editing.semantic, prevValidColors);
      setEditing(prevSet);
      setDelegate({ ...delegate, editing: prevSet });
    }
  };

  const onChangeValue = (event) => {
    const newValue = event.currentTarget.value;
    setValue(newValue);
    if (editing && model?.values) {
      const newEditing = { ...editing };
      newEditing.semantic = newValue;
      setEditing(newEditing);
    }
  };

  if (!editing) return null;

  return (
    <>
      <Button size="xs" color="#0070c1" onClick={onSave}>
        Save
      </Button>
      <Button ml="sm" variant="default" size="xs" color="#0070c1" onClick={onCancel}>
        Cancel
      </Button>
      <Divider my="md" />
      <Space h={5} />

      <Select
        label="Optimization"
        value={delegate.optimization}
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
          <TextInput size="xsm" value={value} onChange={onChangeValue} />
        </Chip>
        <Space h="sm" />
        <Divider my="md" />
        <>
          <KeysHeader>
            <Title>Keys</Title>
            <KeysHeader>
              <XCircle size={20} />
              <Space w={8} />
              <PlusCircle size={20} onClick={onAddKey} />
            </KeysHeader>
          </KeysHeader>
        </>
        <Space h={16} />

        {keyValues.map((key, index) => {
          const parsedValue = Color.parse(key);
          const defaultValue = new ColorModel(parsedValue.spaceId, parsedValue.coords);
          return (
            <React.Fragment key={index}>
              <KeyChip>
                <ColorInput
                  value={defaultValue.toString({ format: 'hex' })}
                  onChange={(event) => onUpdateKeyValues(event, index)}
                  mr={8}
                />
                <Trash2 size={18} onClick={() => onDeleteKeyValue(index)} />
              </KeyChip>
              <Space h={12} />
            </React.Fragment>
          );
        })}
      </>
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

const Pip = styled.div.attrs((props) => ({
  style: {
    backgroundColor: props.$model,
  },
}))`
  height: 14px;
  width: 14px;
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
