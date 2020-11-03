import React from 'react';
import { Table, Input, Form, Select, Space, Button, Divider } from 'antd';
import 'antd/dist/antd.css';

export const TableStock = ({ dataSource, editMode = false }) => {
  const columns = [
    {
      title: 'Produit',
      dataIndex: 'nom',
      key: 'nom',
      sorter: (a, b) => a.nom.localeCompare(b.nom),
    },
    {
      title: 'Quantité',
      dataIndex: 'total',
      key: 'total',
      filters: [{ text: 'En Stock', value: 'en stock' }],
      onFilter: (value, record) => record.total && record.total != 0,
      render: (value) => (editMode ? <Input value={value} /> : value),
    },
    {
      title: 'Unité',
      dataIndex: 'unite_total',
      key: 'unite_total',
      render: (value) =>
        editMode ? <SelectUnite initialValues={{ unite: value }} /> : value,
    },
    {
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
    },
  ];

  return (
    <>
      {editMode && [<Divider />, <SelectSens />, <SelectProprietaire />]}

      <Table columns={columns} dataSource={dataSource} />
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
const SelectUnite = ({ initialValues = { unite: '0' } }) => {
  return (
    <Form initialValues={initialValues}>
      <Form.Item name="unite" label="Activités">
        <Select onChange={(value) => console.log('SelectUnite', value)}>
          <Option value="0">ML</Option>
          <Option value="1">M2</Option>
          <Option value="2">U</Option>
          <Option value="3">BT</Option>
          <Option value="4">RL</Option>
        </Select>
      </Form.Item>
    </Form>
  );
};
