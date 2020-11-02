import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Tag } from 'antd';
import 'antd/dist/antd.css';

import { SearchTableContainer } from '../../components/SearchTableContainer';

export const AdresseTable = () => {
  const history = useHistory();
  const columns = [
    {
      title: 'Rue',
      dataIndex: 'adresse',
      key: 'adresse',
      sorter: (a, b) => a.rue.localeCompare(b.rue),
      sortDirections: ['ascend', 'descend'],
      render: (adresse, record) => (
        <Button
          type="link"
          onClick={() => history.push(`/adresse/${record.idMaison}`)}
        >
          {adresse}
        </Button>
      ),
    },
    {
      title: 'Complement',
      dataIndex: 'complement',
      key: 'complement',
      sorter: (a, b) => a.complement.localeCompare(b.complement),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Ville',
      dataIndex: 'ville',
      key: 'ville',
      sorter: (a, b) => a.ville.localeCompare(b.ville),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Code Postal',
      dataIndex: 'code_postal',
      key: 'code_postal',
      render: (text) => <Tag key={text}>{text}</Tag>,
      sorter: (a, b) => a.codePostal.localeCompare(b.codePostal),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Geolocalisation',
      dataIndex: 'geoloc',
      key: 'geoloc',
      sorter: (a, b) => a.geoloc.localeCompare(b.geoloc),
      sortDirections: ['ascend', 'descend'],
    },
  ];

  return (
    <SearchTableContainer
      title="Liste des Adresses"
      columns={columns}
      urlLoadData="/api/adresse"
    />
  );
};
