import React, { useState, useEffect } from 'react';
import { Divider, List, Modal, message } from 'antd';
import 'antd/dist/antd.css';
import { Container } from '../../components/Container';

import { Link, useLocation, useHistory } from 'react-router-dom';
import Axios from 'axios';

export const Recherche = () => {
  const location = useLocation();
  const history = useHistory();
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
        const { dataResponse, isLogin } = result.data;
        if (isLogin === false) history.push('/signout');
        if (!ignore) {
          setData(dataResponse);
        }
      } catch (error) {
        message.error(
          'Problème de connexion au server ' + JSON.stringify(error)
        );
      }
    }
    fetchData();
    return () => {
      ignore = true;
    };
  }, [search]);

  return (
    <Container
      title={<SearchTitle search={search} categorie={categorie} />}
      style={{ width: '80vw', minHeight: 300, maxWidth: 1300 }}
    >
      {data ? (
        <>
          <ContactCategorie data={data.contact} categorie={categorie} />
          <AdresseCategorie data={data.adresse} categorie={categorie} />
          <StockCategorie data={data.stock} categorie={categorie} />
        </>
      ) : (
        <List />
      )}
    </Container>
  );
};

const Module = ({ data = [], name, link }) => {
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
const ContactCategorie = ({ data = [], categorie }) => {
  return (
    <Categorie
      data={data}
      name="Contact"
      link="contact"
      nomCategorie="contact"
      actuelCategorie={categorie}
    />
  );
};
const AdresseCategorie = ({ data = [], categorie }) => {
  return (
    <Categorie
      data={data}
      name="Adresse"
      link="adresse"
      nomCategorie="adresse"
      actuelCategorie={categorie}
    />
  );
};
const StockCategorie = ({ data = [], categorie }) => {
  return (
    <Categorie
      data={data}
      name="Stock"
      link="stock"
      nomCategorie="stock"
      actuelCategorie={categorie}
    />
  );
};

const Categorie = ({
  data = [],
  name,
  link,
  nomCategorie,
  actuelCategorie,
}) => {
  return (
    <>
      {(actuelCategorie === 'tous' || actuelCategorie === nomCategorie) && (
        <Module
          data={data}
          name={name + ' (' + (data ? data.length : 0) + ')'}
          link={link}
        />
      )}
    </>
  );
};
const SearchTitle = ({ search, categorie }) => {
  return (
    <>
      Recherche :{' '}
      <i>
        {search} | {categorie}
      </i>
    </>
  );
};
