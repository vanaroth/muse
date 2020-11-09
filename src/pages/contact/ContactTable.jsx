import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Tag } from 'antd';
import Title from 'antd/lib/typography/Title';
import 'antd/dist/antd.css';

import { Container } from '../../components/Container';
import { SearchTable } from '../../components/SearchTable';
import { Scroll } from '../../components/Scroll';
import { LoaderData } from '../../components/LoaderData';
import { makeUrl } from '../devis/functions/makeUrl';

export const ContactTable = () => {
  console.log('Contact List 1');
  const [data, setData] = useState([]);
  const history = useHistory();

  const columns = [
    {
      title: 'Genre',
      dataIndex: 'genre',
      key: 'genre',
      filters: [
        {
          text: 'Homme',
          value: 'M',
        },
        {
          text: 'Femme',
          value: 'MME',
        },
        {
          text: 'Entreprise',
          value: 'Entreprise',
        },
        {
          text: 'Couple',
          value: 'Couple',
        },
      ],
      onFilter: (value, record) => record.genre.indexOf(value) === 0,
      sorter: (a, b) => a.genre.localeCompare(b.genre),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Nom',
      dataIndex: 'nom',
      key: 'nom',
      sorter: (a, b) => a.genre.localeCompare(b.nom),
      sortDirections: ['ascend', 'descend'],
      render: (contact, record) => (
        <Button
          type="link"
          onClick={() => history.push(`/contact/${record.idContact}`)}
        >
          {contact}
        </Button>
      ),
    },
    {
      title: 'Prénom',
      dataIndex: 'prenom',
      key: 'prenom',
      sorter: (a, b) => a.genre.localeCompare(b.prenom),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Tel',
      dataIndex: 'tel',
      key: 'tel',
      render: (text) =>
        text.split('/').map((tag) => <Tag key={tag}>{tag.toUpperCase()}</Tag>),
      sorter: (a, b) => a.genre.localeCompare(b.tel),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.genre.localeCompare(b.email),
      sortDirections: ['ascend', 'descend'],
    },
  ];
  const url = '/api/contact';

  return (
    <Container style={{ width: 1000, maxWidth: '90vw' }}>
      <Title level={4} style={{ fontSize: '1.2em' }}>
        Liste des Contacts
      </Title>
      <LoaderData url={url} setData={setData}>
        <Scroll>
          <SearchTable columns={columns} dataSource={data} isScroll />
        </Scroll>
      </LoaderData>
    </Container>
  );
};
