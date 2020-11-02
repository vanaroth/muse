import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { Zone } from '../basic/Zone';
import { Ligne } from '../basic/Ligne';

export const ZoneCaracteristiqueHabitation = ({ data }) => {
  const column = [
    ['Type Maison', 'Habitation', 'Stationnement', 'Trappe'],
    ['Conduit de cheminée', 'Ecran sous toiture', 'Volige', 'VMC'],
    ['Echelle', 'Longueur de Couronne', 'VT Effectué'],
  ];

  console.log('Type Maison', data['Type Maison']);
  return (
    <Zone
      style={{
        position: 'static',
        left: 0,
        top: 5,
        width: 480,
        height: 190,
      }}
    >
      <Ligne>
        <Text style={{ fontSize: 15, textAlign: 'center' }}>
          Caracteristique Habitation
        </Text>
      </Ligne>
      {column.map((partie) => (
        <Partie column={partie} data={data} />
      ))}

      <Ligne style={{ width: 300 }}>
        <Text style={{ fontSize: 15 }}>Divers :</Text>
      </Ligne>
      <Ligne style={{ width: 300, paddingLeft: 20 }}>
        <Text style={{ fontSize: 10 }}>{data.divers}</Text>
      </Ligne>
    </Zone>
  );
};

const Partie = ({ column, data }) => {
  return (
    <>
      <Ligne style={{ flexDirection: 'row' }}>
        {column.map((i, k) => (
          <View
            key={k}
            style={{ padding: 2, width: 115, backgroundColor: '#eee' }}
          >
            <Text style={{ fontSize: 10, textAlign: 'center' }}>{i}</Text>
          </View>
        ))}
      </Ligne>
      <Ligne
        style={{
          flexDirection: 'row',
          height: 11,
          paddingTop: 0,
          paddingBottom: 0,
        }}
      >
        {column.map((i, k) => (
          <View
            key={k}
            style={{
              top: 0,
              width: 115,
              textAlign: 'center',
            }}
          >
            <Text style={{ fontSize: 9 }}>{data[i]}</Text>
          </View>
        ))}
      </Ligne>
    </>
  );
};
