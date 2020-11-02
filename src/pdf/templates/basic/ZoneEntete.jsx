import React from 'react';
import { Text } from '@react-pdf/renderer';
import { Zone } from '../basic/Zone';
import { Ligne } from '../basic/Ligne';

export const ZoneEntete = ({ data }) => {
  return (
    <Zone style={{ top: 50, left: 320, width: 250, height: 100 }}>
      <Zone
        style={{
          position: 'static',
          left: 10,
          top: 10,
          width: 230,
          height: 80,

          border: '1pt solid black',
        }}
      >
        <Ligne style={{ height: 16 }}></Ligne>
        <Ligne>
          <Text>Contacté par: {'  '}</Text>
          <Text style={{ fontSize: 10 }}>{data.contactePar}</Text>
        </Ligne>
        <Ligne>
          <Text>Dossier effectué par: {'  '}</Text>
          <Text style={{ fontSize: 10 }}>{data.dossier}</Text>
        </Ligne>
        <Ligne>
          <Text>Dossier Chantier effectué par: {'  '}</Text>
          <Text style={{ fontSize: 10 }}> {data.dossierChantier}</Text>
        </Ligne>
      </Zone>
    </Zone>
  );
};
