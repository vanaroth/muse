import React, { useState } from 'react';
import { Page, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { Zone } from './basic/Zone';
import { ZoneCaracteristiqueHabitation } from './fichierContact/ZoneCaracteristiqueHabitation';
import { ZoneTache } from './fichierContact/ZoneTache';
import { ZoneChantier } from './fichierContact/ZoneChantier';
import { ZoneEntete } from './basic/ZoneEntete';
import { ZoneContact } from './basic/ZoneContact';
import { ZoneAdresse } from './basic/ZoneAdresse';

export const FicheChantier = () => {
  const [data] = useState({
    entete: {
      contactePar: 'Caroline Horta',
      dossier: 'Caroline Horta',
      dossierChantier: 'Marie Dutour',
    },
    adresse: {
      rue: '27 rue du midi',
      complement_adresse: 'false',
      ville: 'Villefontaine',
      code_postal: '38090',

      commentaire: `ezfzefze zfe ef zef zef zef zef zef zef zef`,
    },
    taches: {
      ctrlSurface: true,
      documentManquant: [
        `Avis d'imposition`,
        `Justificatif de domicile`,
        `Plan cadastral`,
      ],
      poseSpot: 5,
      resumeDevis: 'resumeDevis',
    },
    habitation: {
      'Type Maison': 'Maison Individuel',
      Habitation: 'Etage',
      Stationnement: 'Cour',
      Trappe: '3',
      'Conduit de cheminée': '0',
      'Ecran sous toiture': 'Non',
      Volige: 'Oui',
      VMC: '0',
      Echelle: '0',
      'Longueur de Couronne': '2',
      'VT Effectué': 'Geoffrey',
      divers: 'e erg erg erg erg erg erg erg erg erg erg',
    },
    contact: {
      nom: 'DURAND',
      prenom: 'Paul',
      tel: '06 06 06 06 06',
      email: 'pdurand@email.fr',
    },
  });
  return (
    <Document style={styles.document}>
      <Page size="A4" style={styles.body}>
        <Image
          src="../images/fiche-chantier-1.png"
          style={{ width: '100%', height: '100%' }}
        />
        <ZoneEntete data={data.entete} />
        <Masque>
          <ZoneChantier data={data.chantier} />
          <Zone
            style={{
              flexDirection: 'row',
              position: 'static',
              width: 500,
              height: 80,
            }}
          >
            <ZoneContact data={data.contact} />
            <ZoneAdresse data={data.adresse} />
          </Zone>
          <ZoneCaracteristiqueHabitation data={data.habitation} />
          <ZoneTache taches={data.taches} />
        </Masque>
      </Page>
    </Document>
  );
};

const Masque = ({ children }) => {
  return <Zone style={styles.masque}>{children}</Zone>;
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
