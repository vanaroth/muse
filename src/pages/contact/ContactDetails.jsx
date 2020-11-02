import React, { useState } from 'react';
import { Button, List, Empty, Space, message } from 'antd';
import 'antd/dist/antd.css';
import '../../App.css';
import { Container } from '../../components/Container';
import {
  PrinterOutlined,
  EnvironmentOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useParams, useHistory, Link } from 'react-router-dom';
import { LoaderData } from '../../components/LoaderData';
import { FiscaliteDescription } from './FiscaliteDescription';
import { ContactDescription } from './ContactDescription';

export const ContactDetails = () => {
  const history = useHistory();
  const { id } = useParams();

  if (id === undefined) {
    message.error(`Vous n'avez pas fourni d'Identifant au contact !`);
    history.push('/');
  }

  const [contact, setContact] = useState({});

  console.log('Contact Details', id);

  return (
    <LoaderData url={`/api/contact/${id}`} setData={setContact}>
      <ContactDescription data={contact} id={id || ''} history={history} />
      <FiscaliteDescription
        data={(contact && contact.fiscalite) || false}
        ancestorID={id}
        history={history}
      />
      <ListeAdresse
        data={(contact && contact.adresses) || false}
        ancestorID={id}
        history={history}
      />
      <ListeDevis
        data={(contact && contact.listeDevis) || false}
        history={history}
      />
    </LoaderData>
  );
};

const ListeAdresse = ({ data, ancestorID }) => {
  const history = useHistory();
  console.log(data);
  return (
    <Container title="Liste des Adresses">
      {data ? (
        <>
          <List
            dataSource={data}
            renderItem={(adresse) => (
              <List.Item>
                <Space>
                  <Link to={'/adresse/' + adresse.idMaison}>
                    {adresse.rue} {adresse.code_postal} {adresse.ville}
                  </Link>
                  <Button
                    target="_blank"
                    href={`https://www.google.fr/maps/place/+${adresse.rue}+${adresse.code_postal}+${adresse.ville}`}
                  >
                    <EnvironmentOutlined /> Maps
                  </Button>
                </Space>
              </List.Item>
            )}
          />
        </>
      ) : (
        <Empty />
      )}
      <div style={{ textAlign: 'center' }}>
        <Button
          type="primary"
          onClick={() =>
            history.push({
              pathname: '/adresse/form',
              data: { ancestor: { type: 'contact', id: ancestorID } },
            })
          }
          icon={<PlusOutlined />}
        ></Button>
      </div>
    </Container>
  );
};
const ListeDevis = ({ data }) => {
  return (
    <Container title="Liste des devis">
      {data ? (
        <>
          <List
            dataSource={[data]}
            renderItem={(devis) => (
              <a
                href={
                  'http://ira.nextsetp.ovh/api/devis/print?id=' + devis.idDevis
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <PrinterOutlined />
                Imprimer le devis
              </a>
            )}
          />
        </>
      ) : (
        <Empty />
      )}
    </Container>
  );
};
