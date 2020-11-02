import { Text, View } from '@react-pdf/renderer';
import React from 'react';
import { Zone } from '../basic/Zone';

export const ZoneChantier = () => {
  const date = '21/08/20';
  const heure = '8H-15H';
  const dossier = 'Car51515';
  return (
    <Zone style={styles.main}>
      <ViewCell cle="N°Dossier" valeur={dossier} />
      <ViewCell cle="Date Chantier" valeur={date} />
      <ViewCell cle="Heure RDV" valeur={heure} />
    </Zone>
  );
};
const ViewCell = ({ cle, valeur }) => {
  return (
    <View style={{ width: 150 }}>
      <Text style={{ fontSize: 10 }}>
        {cle}: {valeur}
      </Text>
    </View>
  );
};
const styles = {
  main: {
    position: 'static',
    padding: '5px 0',
    width: 500,
    height: 23,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#eee',
  },
  title: { fontSize: 12, textAlign: 'center' },
  text: { fontSize: 10, textAlign: 'center' },
};
