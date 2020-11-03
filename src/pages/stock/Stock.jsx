import React, { useState, useEffect } from 'react';
import { Form, Table, Select } from 'antd';
import 'antd/dist/antd.css';
import { Container } from '../../components/Container';
import Axios from 'axios';
import { Scroll } from '../../components/Scroll';
import { TableStock } from '../../components/TableStock';
import { useParams } from 'react-router-dom';

const { Option } = Select;

export const Stock = () => {
  const [activite, setActivite] = useState(0);
  const [data, setData] = useState([]);
  const [serverData, setServerData] = useState();
  const { mode } = useParams();

  useEffect(() => {
    const ignore = false;

    async function fetchData() {
      try {
        const result = await Axios.get('/api/stock');
        const { dataResponse } = result.data;
        const liste_stock =
          mode === 'form'
            ? dataResponse.liste_stock.map((produit) => ({
                ...produit,
                total: 0,
              }))
            : dataResponse.liste_stock;
        if (!ignore) setServerData(liste_stock);
      } catch (err) {
        console.log('Erreur de Chargement Stock', err);
      }
    }

    fetchData();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    console.log('activite', activite);
    setData(
      activite != 0
        ? serverData.filter((i) => {
            console.log(
              'i',
              i.nom,
              i.activites,
              i.activites && i.activites.indexOf(activite) >= 0
            );
            return i.activites !== null && i.activites.indexOf(activite) >= 0;
          })
        : serverData
    );
  }, [serverData, activite]);

  return (
    <Container title="Stock" style={{ width: 1000, maxWidth: '90vw' }}>
      <SelectActivite setActivite={setActivite} />
      <Scroll>
        <div style={{ minWidth: 400 }}>
          <TableStock dataSource={data} editMode={mode === 'form'} />
        </div>
      </Scroll>
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
