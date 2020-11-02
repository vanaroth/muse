import React, { useState } from 'react';
import { Page, Text, Document, Image, StyleSheet } from '@react-pdf/renderer';
import { Cell } from '../basic/Cell';

export const PV = () => {
  const [data] = useState({
    contact: { nom: 'TEST', prenom: 'Test' },
    adresse: { rue: '21 rue test', ville: 'VilleTest', code_postal: 38018 },
    date: '21/10/2020',
  });
  return (
    <Document style={styles.document}>
      <Page size="A4" style={styles.body}>
        <Image
          src="../images/pv-1.png"
          style={{ width: '100%', height: '100%' }}
        />
        <Cell
          style={{ top: 202, left: 125, fontSize: 8 }}
          children={userShow(data.contact)}
        />
        <Cell
          style={{ top: 202, left: 265, fontSize: 8 }}
          children={userAdresse(data.adresse)}
        />
        <Cell
          style={{
            paddingLeft: 5,
            top: 222,
            left: 80,
            width: 40,
            fontSize: 8,
            backgroundColor: 'white',
          }}
          children={data.date}
        />
      </Page>
    </Document>
  );
};
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  document: {
    backgroundColor: 'trasparent',
    padding: '2em',
  },
  masque: {
    top: 176,
    left: 48,
    width: 470,
    height: 550,
  },
});

const userShow = (contact) => {
  return (
    <Text>
      {contact.nom} {contact.prenom}
    </Text>
  );
};
const userAdresse = (adresse) => {
  return (
    <Text>
      {adresse.rue} {adresse.complement_adresse} {adresse.code_postal}{' '}
      {adresse.ville}
    </Text>
  );
};
