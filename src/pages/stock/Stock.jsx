import React, { useState, useEffect } from 'react';
import { Form, Select } from 'antd';
import 'antd/dist/antd.css';
import { Container } from '../../components/Container';
import { TableStock } from '../../components/TableStock';
import { useParams } from 'react-router-dom';
import { LoaderData } from '../../components/LoaderData';
import { makeUrl } from '../devis/functions/makeUrl';

const { Option } = Select;

export const Stock = () => {
  const [activite, setActivite] = useState(0);
  const [data, setData] = useState([]);
  const [serverData, setServerData] = useState();
  const { mode } = useParams();
  const url = '/api/stock';

  useEffect(() => {
    console.log('activite', activite);
    setData(
      filterData(activite, serverData ? serverData.liste_stock : serverData)
    );
  }, [serverData, activite]);

  return (
    <Container title="Stock" style={{ width: 1000, maxWidth: '90vw' }}>
      <SelectActivite setActivite={setActivite} />

      <LoaderData url={url} setData={setServerData}>
        <TableStock dataSource={data} editMode={mode === 'form'} />
      </LoaderData>
    </Container>
  );
};

const SelectActivite = ({ setActivite }) => {
  return (
    <Form initialValues={{ activite: '0' }}>
      <Form.Item name="activite" label="Activités">
        <Select onChange={(value) => setActivite(value)}>
          <Option value="0">Tous</Option>
          <Option value="1">Soufflage</Option>
          <Option value="2">Plancher Bas</Option>
          <Option value="3">Calo</Option>
          <Option value="4">VMC</Option>
          <Option value="5">Plancher Bas Collectif</Option>
          <Option value="6">ITE</Option>
        </Select>
      </Form.Item>
    </Form>
  );
};

const filterData = (activite, data) => {
  return activite != 0
    ? data.liste_stock.filter((i) => {
        console.log(
          'i',
          i.nom,
          i.activites,
          i.activites && i.activites.indexOf(activite) >= 0
        );
        return i.activites !== null && i.activites.indexOf(activite) >= 0;
      })
    : data;
};
