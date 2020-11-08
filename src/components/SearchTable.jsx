import React, { useState } from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css';

import { SearchInput } from './SearchInput';
import { Scroll } from './Scroll';

export const SearchTable = ({ columns, dataSource, isScroll }) => {
  const [search, setSearch] = useState('');
  console.log('dataSource', dataSource);
  const filterTable =
    search === ''
      ? dataSource
      : dataSource.filter((ligne) => {
          return Object.entries(ligne).reduce((acc, [k, v]) => {
            console.log('SearchTable', k, v);
            if (v) {
              return v.toLowerCase().includes(search) ? true : acc;
            }
            return acc;
          }, false);
        });
  const table = (
    <Table
      header="Liste des Contacts"
      columns={columns}
      dataSource={filterTable}
    />
  );
  return (
    <>
      <SearchInput onSearch={(value) => setSearch(value.toLowerCase())} />
      {isScroll ? <Scroll children={table} /> : table}
    </>
  );
};
