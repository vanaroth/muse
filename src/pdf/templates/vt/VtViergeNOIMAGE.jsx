import React, { useState } from 'react';
import { Page, Document, StyleSheet } from '@react-pdf/renderer';
import { Cell } from '../basic/Cell';
import { userShow } from '../basic/fct';

export const VtViergeNOIMAGE = () => {
  const [data] = useState({
    contact: {
      nom: 'TEST',
      prenom: 'Test',
      tel: '06 06 06 06 06',
      email: 'zfzaaz@ddg.fr',
    },
    adresse: { rue: '21 rue test', ville: 'VilleTest', code_postal: 38018 },
    dateDevis: '21/10/2020',
    dateChantier: '21/11/2020',
    dateFacture: '21/11/2020',
    dateReceptionChantier: '21/11/2020',
  });
  return (
    <Document style={styles.document}>
      <Page size="A4" style={styles.body}>
        <Cell
          style={{
            top: 175,
            left: 200,
            fontSize: 10,
            backgroundColor: 'white',
          }}
          children={data.adresse.rue}
        />
        <Cell
          style={{
            top: 190,
            left: 150,
            fontSize: 10,
            backgroundColor: 'white',
          }}
          children={data.adresse.code_postal}
        />
        <Cell
          style={{
            top: 190,
            left: 300,
            fontSize: 10,
            backgroundColor: 'white',
          }}
          children={data.adresse.ville}
        />
        <Cell
          style={{ top: 570, left: 165, fontSize: 12 }}
          children={userShow(data.contact)}
        />
        <Cell
          style={{
            top: 263,
            left: 194,
            fontSize: 11,
            backgroundColor: 'white',
          }}
          children={data.dateDevis}
        />
        <Cell
          style={{
            top: 280,
            left: 194,
            fontSize: 11,
            backgroundColor: 'white',
          }}
          children={data.dateChantier}
        />
        <Cell
          style={{
            top: 297,
            left: 194,
            fontSize: 11,
            backgroundColor: 'white',
          }}
          children={data.dateFacture}
        />

        <Cell
          style={{
            top: 383,
            width: 180,
            left: 150,
            fontSize: 10,
            backgroundColor: 'white',
          }}
          children={data.contact.tel}
        />
        <Cell
          style={{
            top: 418,
            width: 180,
            left: 250,
            fontSize: 15,
            backgroundColor: 'white',
          }}
          children={data.dateReceptionChantier}
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
