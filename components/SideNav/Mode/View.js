import { Fragment } from 'react';
import { IconPencil } from '@tabler/icons-react';
import styled from 'styled-components';
import { Select, Space } from '@mantine/core';
import { optimizations } from '../../../models/OptimizationModel';

export default function Main(props) {
  const onChangeContrastHandler = (contrast) => {
    const result = { ...props.delegate, contrast: contrast };
    props.setDelegate(result);
  };

  const onChangeOptimizationHandler = (optimization) => {
    const result = { ...props.delegate, optimization: optimization };
    props.setDelegate(result);
  };

  const onClick = (value) => {
    const result = { ...props.delegate, editing: value };
    props.setDelegate(result);
  };

  return (
    <>
      <Select
        label="Optimization"
        value={props.delegate.optimization}
        data={optimizations.map((item) => item.name)}
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
      {props.model.values.map((item) => {
        return (
          <Fragment key={item.semantic}>
            <Chip onClick={() => onClick(item)} key={item.semantic}>
              <ChipGradientSwatch model={item}>
                {item.swatches.map((pip) => (
                  <Pip $model={pip.hex} key={pip.hex} />
                ))}
              </ChipGradientSwatch>
              {item.semantic}
              <Icon>
                <IconPencil size={18} />
              </Icon>
            </Chip>
            <Space h="sm" />
          </Fragment>
        );
      })}
    </>
  );
}

const Icon = styled.div`
  margin-left: auto;
  margin-right: 0;
`;

const Pip = styled.div((props) => ({
  backgroundColor: props.$model,
  height: '14px',
  width: '14px',
}));

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
  font-weight: 600;
  padding-right: 16px;
  cursor: pointer;
  overflow: hidden;
`;
