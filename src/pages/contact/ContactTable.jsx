import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Tag, message } from 'antd';
import Title from 'antd/lib/typography/Title';
import 'antd/dist/antd.css';

import { Container } from '../../components/Container';
import { SearchTable } from '../../components/SearchTable';
import Axios from 'axios';
import { Scroll } from '../../components/Scroll';

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

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      try {
        const result = await Axios.get('/api/contact');
        if (!ignore) {
          setData(result.data.dataResponse);
          console.log('Contact List ', result);
        }
      } catch (err) {
        message.error(`Les données n'ont pas pu être chargé`);

        setData([
          {
            idContact: '3220',
            genre: 'M',
            nom: 'Test',
            prenom: 'Testy',
            tel: '0606060606',
            email: 'testy.test@tt.fr',
          },
          {
            idContact: '3221',
            genre: 'M',
            nom: 'rergerg',
            prenom: '',
            tel: '0808080808 / 04rgerg erg erg',
            email: 'testy.test@tt.fr',
          },
          {
            complement_origine: 'OP-202010021841171',
            creation: '2020-10-16 16:33:24',
            descriptif: 'M GRIGNON Pascal 0680237371 ',
            dossier: '',
            email: 'pascal.grignon@gmail.com',
            genre: 'M',
            idContact: '3220',
            idOrigine: '11',
            nom: 'GRIGNON',
            prenom: 'Pascal',
            tel: '0680237371',
          },
        ]);
      }
    }
    fetchData();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <Container style={{ width: 1000, maxWidth: '90vw' }}>
      <Title level={4} style={{ fontSize: '1.2em' }}>
        Liste des Contacts
      </Title>
      <Scroll>
        <SearchTable columns={columns} dataSource={data} isScroll />
      </Scroll>
    </Container>
  );
};
