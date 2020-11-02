import { Text, View } from '@react-pdf/renderer';
import React from 'react';
import { Ligne } from '../basic/Ligne';
import { Zone } from '../basic/Zone';
import { Item } from '../basic/Item';

export const ZoneTache = ({ taches }) => {
  return (
    <Zone style={styles.main}>
      <Ligne>
        <Text style={styles.title}>Liste des Tâches</Text>
      </Ligne>
      {taches.ctrlSurface && (
        <Item
          children="Controle de la Surface: ..........................M²     Equipe: ..............      Souffleur: ........................"
          textSyle={{ ...styles.text, color: 'tomato' }}
        />
      )}
      {taches.documentManquant && (
        <Item
          children={
            <>
              Document à Récupérer:{' '}
              <Text style={styles.text}>
                {taches.documentManquant.join(', ')}
              </Text>
            </>
          }
          textSyle={styles.text}
        />
      )}
      {taches.poseSpot && (
        <>
          <Item
            children={'Controler le nombre de spot '}
            textSyle={styles.text}
          />
          <Item
            children={'Nombre de spot à poser prévu : ' + taches.poseSpot}
            textSyle={styles.text}
          />
        </>
      )}
      {taches.resumeDevis && (
        <Item
          children={'Resume du Devis : ' + taches.resumeDevis}
          textSyle={styles.text}
        />
      )}
    </Zone>
  );
};

export const Partie = ({ column, data }) => {
  return (
    <>
      <Ligne style={{ flexDirection: 'row' }}>
        {column.map((i, k) => (
          <View
            key={k}
            style={{ padding: 5, width: 115, backgroundColor: '#eee' }}
          >
            <Text style={styles.text}>{i}</Text>
          </View>
        ))}
      </Ligne>
      <Ligne style={{ flexDirection: 'row' }}>
        {column.map((i, k) => (
          <View key={k} style={{ padding: 2, width: 115, textAlign: 'center' }}>
            <Text style={{ fontSize: 10 }}>{data[i]}</Text>
          </View>
        ))}
      </Ligne>
    </>
  );
};

const styles = {
  main: { position: 'static', left: 0, top: 5, width: 480, height: 150 },
  title: { fontSize: 15, textAlign: 'center' },
  text: { fontSize: 10 },
};
