import React, { useState } from 'react';
import { Input } from 'antd';

import 'antd/dist/antd.css';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';

export const SearchInput = ({ defaultValue = '', onSearch }) => {
  const [value, setValue] = useState(defaultValue);
  console.log('SearchInput', typeof value, value.length);
  return (
    <div style={{ padding: '10px 0', width: 250 }}>
      <Input
        value={value}
        onKeyDown={(e) => e.keyCode === 13 && onSearch(value)}
        onChange={(e) => setValue(e.target.value)}
        prefix={
          <CloseOutlined
            onClick={() => {
              setValue('');
              onSearch('');
            }}
          />
        }
        suffix={<SearchOutlined onClick={() => onSearch(value)} />}
      />
    </div>
  );
};
