import React, { useState, useEffect } from 'react';
import { Table, Input, Form, Select, Space, Button, Divider } from 'antd';
import 'antd/dist/antd.css';
import { SearchTable } from './SearchTable';

export const TableStock = ({ dataSource, editMode = false }) => {
  const [dataForm, setDataForm] = useState([]);

  useEffect(() => {
    setDataForm(dataSource);
  }, [dataSource]);
  console.log('dataForm', dataForm, dataSource);
  const columns = [
    {
      title: 'Produit',
      dataIndex: 'nom',
      key: 'nom',
      sorter: (a, b) => a.nom.localeCompare(b.nom),
      render: (nom) =>
        nom.slice(0, 1).toUpperCase() + nom.slice(1).toLowerCase(),
    },
    {
      title: 'Qté',
      dataIndex: 'total',
      key: 'total',
      filters: [{ text: 'En Stock', value: 'en stock' }],
      onFilter: (value, record) => record.total && record.total != 0,
      render: (value, record, i) =>
        editMode ? (
          <Input
            value={Math.round(value * 100) / 100}
            style={{ width: 60 }}
            onChange={(e) =>
              setDataForm((p) =>
                changeLineQuantite(p, record, e.target.value, i)
              )
            }
          />
        ) : (
          Math.round(value * 100) / 100
        ),
    },
    {
      title: 'Unité',
      dataIndex: 'unite_total',
      key: 'unite_total',
      render: (value) => (editMode ? <SelectUnite value={value} /> : value),
    },
  ];
  const proprietaireCol = {
    title: 'Propriétaire',
    dataIndex: 'proprietaire',
    key: 'proprietaire',
    filters: [
      { text: 'ISOL RA', value: 'Isol RA' },
      { text: 'ISOL RA Lens', value: 'ISOL RA Lens' },
      { text: 'ERTI', value: 'ERTI' },
      { text: 'Commun', value: 'Commun' },
    ],
    onFilter: (value, record) =>
      record.proprietaire && record.proprietaire.indexOf(value) === 0,
  };
  const cols = editMode ? columns : [...columns, proprietaireCol];
  return (
    <>
      {editMode && [<Divider />, <SelectSens />, <SelectProprietaire />]}

      <SearchTable
        columns={cols}
        dataSource={editMode ? dataForm : dataSource}
        isScroll
      />

      {editMode && (
        <Space>
          <Button type="primary">Valider</Button>
        </Space>
      )}
    </>
  );
};
const { Option } = Select;

const SelectSens = ({ initialValues = { sens: '1' } }) => {
  return (
    <Form initialValues={initialValues}>
      <Form.Item name="sens" label="Sens">
        <Select onChange={(value) => console.log('SelectSens', value)}>
          <Option value="1">Sortie</Option>
          <Option value="2">Entree</Option>
        </Select>
      </Form.Item>
    </Form>
  );
};
const SelectProprietaire = ({ initialValues = { proprietaire: '1' } }) => {
  return (
    <Form initialValues={initialValues}>
      <Form.Item name="proprietaire" label="Proprietaire">
        <Select onChange={(value) => console.log('SelectProprietaire', value)}>
          <Option value="1">ISOL RA</Option>
          <Option value="2">ISOL RA LENS</Option>
          <Option value="3">ERTI</Option>
          <Option value="4">Commun</Option>
        </Select>
      </Form.Item>
    </Form>
  );
};
const SelectUnite = ({ value = 0 }) => {
  return (
    <Select
      onChange={(value) => console.log('SelectUnite', value)}
      style={{ width: 60 }}
      value={value}
    >
      <Option value="0">ML</Option>
      <Option value="1">M2</Option>
      <Option value="2">U</Option>
      <Option value="3">BT</Option>
      <Option value="4">RL</Option>
    </Select>
  );
};

const changeLineQuantite = (table, record, value, i) => {
  console.log(table[i], record, value, i);
  if (table[i].idProduit === record.idProduit) {
    table[i] = { ...record, total: value };
  }
  return [...table];
};
