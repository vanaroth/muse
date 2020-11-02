import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { Container } from '../../components/Container';
import Axios from 'axios';

export const Stock = () => {
  const [data, setData] = useState([
    {
      key: 1,
      nom: 'Scotch Orange',
      quantite: 36,
      unite: 'RL',
      proprietaire: 'IRA',
    },
    { key: 2, nom: 'Argrafes G 14MM Stalney', quantite: 6, unite: 'BT' },
  ]);
  const columns = [
    { title: 'Produit', dataIndex: 'nom', key: 'nom' },
    { title: 'Quantié', dataIndex: 'quantite', key: 'quantite' },
    { title: 'Unité', dataIndex: 'unite', key: 'unite' },
    { title: 'Propriétaire', dataIndex: 'proprietaire', key: 'proprietaire' },
  ];

  useEffect(() => {
    const ignore = false;

    async function fetchData() {
      try {
        const result = await Axios.get('/api/stock?login=wpeilhon&mdp=xool');
        const { dataResponse } = result.data;
        if (!ignore) setData(dataResponse);
      } catch (err) {
        console.log('Erreur de Chargement Stock', err);
      }
    }

    fetchData();

    return () => (ignore = true);
  });

  return (
    <Container title="Stock">
      <Table columns={columns} dataSource={data} />
    </Container>
  );
};
