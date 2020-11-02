import React from 'react';
import { Text } from '@react-pdf/renderer';
import { Zone } from '../basic/Zone';
import { Ligne } from '../basic/Ligne';

export const ZoneContact = ({ data }) => {
  return (
    <Zone style={styles.main}>
      <Ligne>
        <Text style={styles.title}>Contact Client</Text>
      </Ligne>
      <Ligne>
        <Text style={styles.text}>
          {data.nom} {data.prenom}
        </Text>
      </Ligne>
      <Ligne>
        <Text style={styles.text}>Tel: {data.tel}</Text>
      </Ligne>
    </Zone>
  );
};

const styles = {
  main: { position: 'static', left: 0, top: 0, width: 230, height: 80 },
  title: { fontSize: 12, textAlign: 'center' },
  text: { fontSize: 10, textAlign: 'center' },
};
