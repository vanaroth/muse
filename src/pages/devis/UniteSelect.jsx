import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

export const UniteSelect = ({ value, onChange }) => {
  return (
    <Select value={value} onChange={(value) => onChange({ target: { value } })}>
      <Option value="m">M</Option>
      <Option value="m2">M2</Option>
      <Option value="u">U</Option>
    </Select>
  );
};
