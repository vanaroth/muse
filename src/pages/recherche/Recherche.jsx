import React, { useState, useEffect } from 'react';
import { Divider, List, Modal } from 'antd';
import 'antd/dist/antd.css';
import { Container } from '../../components/Container';

import { Link, useLocation } from 'react-router-dom';
import Axios from 'axios';

export const Recherche = () => {
  const location = useLocation();
  console.log('location', location);
  const [search, setSearch] = useState(false);
  const [categorie, setCategorie] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    const base = decodeURI(location.search.slice(3)).split('&');

    setSearch(location.search ? base[0] : false);
    setCategorie(location.search ? base[1] : false);
  }, [location]);

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      try {
        const result = await Axios.post('/api/recherche', { value: search });
        if (!ignore) {
          setData(result.data.dataResponse);
        }
      } catch (error) {
        Modal.error({
          title: 'Problème de connexion au server',
          content: JSON.stringify(error),
        });
      }
    }
    fetchData();
    return () => {
      ignore = true;
    };
  }, [search]);

  return (
    <Container
      title={
        <>
          Recherche :{' '}
          <i>
            {search} | {categorie}
          </i>
        </>
      }
      style={{ width: '80vw', minHeight: 300, maxWidth: 1300 }}
    >
      {data ? (
        <>
          {(categorie === 'tous' || categorie === 'contact') && (
            <Module
              data={data.contact || []}
              name={
                'Contact (' + (data.contact ? data.contact.length : 0) + ')'
              }
              link="contact"
            />
          )}
          {(categorie === 'tous' || categorie === 'adresse') && (
            <Module
              data={data.adresse || []}
              name={
                'Adresse (' + (data.adresse ? data.adresse.length : 0) + ')'
              }
              link="adresse"
            />
          )}
          {(categorie === 'tous' || categorie === 'stock') && (
            <Module
              data={data.stock || []}
              name={'Stock (' + (data.stock ? data.stock.length : 0) + ')'}
              link="stock"
            />
          )}
        </>
      ) : (
        <List />
      )}
    </Container>
  );
};

const Module = ({ data, name, link }) => {
  if (data.length > 0)
    return (
      <>
        <Divider>{name}</Divider>
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Link to={link + '/' + item.id}>{item.text}</Link>
            </List.Item>
          )}
        />
      </>
    );
  else return null;
};
