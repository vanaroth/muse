import React from 'react';
import { Text } from '@react-pdf/renderer';
import { Zone } from '../basic/Zone';
import { Ligne } from '../basic/Ligne';

export const ZoneAdresse = ({ data }) => {
  return (
    <Zone
      style={{
        position: 'static',
        left: 20,
        top: 0,
        width: 250,
        height: 80,
      }}
    >
      <Ligne>
        <Text style={styles.title}>Adresse Client</Text>
      </Ligne>
      <Ligne>
        <Text style={styles.text}>{data.rue}</Text>
      </Ligne>
      {data.complement_adresse && (
        <Ligne>
          <Text style={styles.text}>{data.complement_adresse}</Text>
        </Ligne>
      )}
      <Ligne>
        <Text style={styles.text}>
          {data.code_postal} {data.ville}
        </Text>
      </Ligne>
    </Zone>
  );
};

const styles = {
  title: { fontSize: 12, textAlign: 'center' },
  text: { fontSize: 10, textAlign: 'center' },
};
