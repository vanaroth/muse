import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

export const TvaSelect = ({ value }) => {
  return (
    <Select value={value}>
      <Option value="20">20%</Option>
      <Option value="10">10%</Option>
      <Option value="5.5">5.5%</Option>
    </Select>
  );
};
