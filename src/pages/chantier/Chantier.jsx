import React from 'react';
import { Tabs, Form, Input, InputNumber } from 'antd';
import 'antd/dist/antd.css';
import { Container } from '../../components/Container';
import { Stock } from '../stock/Stock';
import { TableStock } from '../../components/TableStock';

const { TabPane } = Tabs;

export const Chantier = () => {
  const infoChantier = {
    contact: {
      nom: 'Test',
      prenom: 'Jules',
      tel: '06060606',
      email: 'test.jules@hotvibes.fr',
    },
    adresse: {
      adresse: '2 rue de la montée verte',
      ville: 'VilleVerte',
      code_postal: '60600',
      email: 'test.jules@hotvibes.fr',
      complement: '',
    },
    date: '25/10/2010 à 11h30',
    duree: { quantite: 1, unite: 'jour' },
  };
  return (
    <Container title="Chantier X" style={{ width: 1000, maxWidth: '90vw' }}>
      <Tabs defaultActiveKey="2" tabPosition="left">
        <TabPane tab="Details" key="1">
          <Details {...infoChantier} />
        </TabPane>
        <TabPane tab="Prévisions" key="2">
          <Prevision />
        </TabPane>
        <TabPane tab="Départs" key="3">
          Liste des Départs du chantier
        </TabPane>
        <TabPane tab="Retours" key="4">
          Liste des retours du chantier
        </TabPane>
        <TabPane tab="Totaux" key="5">
          Liste des Totaux du chantier
        </TabPane>
        <TabPane tab="Rentabilité" key="6">
          Rentabilité
        </TabPane>
      </Tabs>
    </Container>
  );
};

const Details = ({ contact, adresse, devis, date, duree }) => {
  return (
    <>
      <p>
        Contact: {contact.prenom} {contact.nom} {contact.tel} {contact.email}
      </p>
      <p>
        Adresse: {adresse.adresse} {adresse.ville} {adresse.code_postal}
      </p>
      <p>Date Chantier: {date}</p>
      <p>
        Duree Prévisionnel: {duree.quantite} {duree.unite}
      </p>
    </>
  );
};
const Prevision = () => {
  return (
    <>
      <FormPrevision />
      <TableStock dataSource={[]} />
    </>
  );
};
const FormPrevision = () => {
  return (
    <Form>
      <Form.Item noStyle>
        <Input.Group compact>
          <Form.Item name="nbr_personne" label="Nombre de personnes">
            <InputNumber />
          </Form.Item>
          <Form.Item name="taux_horaire" label="Taux horaire">
            <InputNumber />
          </Form.Item>
          <Form.Item name="nbr_heure" label="Nombre d'heures">
            <InputNumber />
          </Form.Item>
        </Input.Group>
      </Form.Item>
      <Form.Item noStyle>
        <Input.Group compact>
          <Form.Item name="nbr_vehicule" label="Nombre de véhicules">
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="cout_journalier_vehicule"
            label="Coût journalier véhicule"
          >
            <InputNumber />
          </Form.Item>
        </Input.Group>
      </Form.Item>
    </Form>
  );
};
