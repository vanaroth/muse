import React, { useState } from 'react';

import { Table, Select, Button, message } from 'antd';
import { EmptyAddButton } from '../../components/EmptyAddButton';
import { Container } from '../../components/Container';
import { EditButton } from '../../components/EditButton';
import { RocketOutlined } from '@ant-design/icons';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

export const OpportuniteDescription = ({ listeItems = {}, ancestorID }) => {
  const history = useHistory();

  const title = ['origine', 'complement', 'activite', 'suivi_par'];
  const cols = title.map((cle) => ({
    title: cle.toUpperCase(),
    dataIndex: cle,
    key: cle,
  }));
  const othersCols = [
    {
      title: 'STATUT',
      dataIndex: 'statut',
      key: 'statut',
      render: (val, r) => (
        <StatutOP value={val} idOpportunite={r.idOpportunite} />
      ),
    },
    {
      title: 'Générer Devis',
      dataIndex: 'statut',
      key: 'statut',
      render: (val, r) => (
        <Button
          type="default"
          onClick={() =>
            history.push({
              pathname: '/devis/generer/',
              data: {
                ancestor: {
                  type: 'oppotunite',
                  id: r.idOpportunite,
                },
              },
            })
          }
          icon={<RocketOutlined />}
        ></Button>
      ),
    },
  ];
  const edit = {
    title: 'Editer',
    dataIndex: 'edit',
    key: 'edit',
    render: (id, record) => (
      <EditButton url={`/opportunite/form/${record.idOpportunite}`} />
    ),
  };
  const columns = [edit, ...cols, ...othersCols];
  return (
    <Container title="Opportunités">
      {listeItems.length > 0 ? (
        <Table
          dataSource={listeItems}
          columns={columns}
          style={{ textAlign: 'center' }}
        />
      ) : (
        <EmptyAddButton
          pathname="/opportunite/form"
          typeAncestor="adresse"
          ancestorID={ancestorID}
        />
      )}
    </Container>
  );
};

const StatutOP = ({ value, idOpportunite }) => {
  const [statut, setStatut] = useState(value);
  const { Option } = Select;
  return (
    <Select
      value={statut}
      onChange={(value) => changeStatut(value, idOpportunite, setStatut)}
    >
      <Option value="info">Attente d'Information</Option>
      <Option value="vt">Attente VT</Option>
      <Option value="envoye">Devis Envoyé</Option>
      <Option value="signe">Devis Signé</Option>
      <Option value="annule">Annulé</Option>
    </Select>
  );
};

const changeStatut = (value, idOpportunite, setStatut) => {
  Axios.post(`/api/opportunite/${idOpportunite}/statut`, { value })
    .then((dataResponse) => {
      message.success('Changement de statut réussi');
      if (dataResponse.change) {
        setStatut(value);
      }
    })
    .catch((e) => {
      message.error(`Erreur Changement de statut (${value})`);
    });
};
