import React, { useState } from 'react';
import { Divider } from 'antd';
import 'antd/dist/antd.css';

import { useParams, useHistory } from 'react-router-dom';
import { AdresseDescriptions } from './AdresseDescriptions';
import { ListeDevis } from '../../components/ListDevis';
import { HabitationDescription } from './HabitationDescription';
import { LoaderData } from '../../components/LoaderData';
import { OpportuniteDescription } from '../opportunite/OpportuniteDescription';
import { ComblesDescription } from './ComblesDescription';
import { Liste } from '../../components/Liste';

export const AdresseDetails = () => {
  const [data, setData] = useState({
    rue: "11 chaussée de l'essart",
    code_postal: '38090',
    ville: 'Villefontaine',
    devis: [
      { id: 55, activite: 'soufflage', etat: 'envoyé' },
      { id: 56, activite: 'plancher bas', etat: 'signé' },
      { id: 57, activite: 'soufflage', etat: 'annulé' },
    ],
    habitation: {},
    combles: {},
  });

  const history = useHistory();
  const { id } = useParams();
  console.log('Adresse Details', id);

  return (
    <LoaderData url={`/api/adresse/${id}`} setData={setData}>
      <AdresseDescriptions {...data} id={id || ''} history={history} />
      <HabitationDescription
        listeItems={data && data.habitation ? data.habitation : []}
      />

      <OpportuniteDescription
        listeItems={data && data.opportunite ? data.opportunite : []}
        ancestorID={id || null}
      />
      {/*
          
          
          Opportunités

            combles
              chemin de vie


            planchers bas
              murs
              sousrampants

            VMC


            ITE(option)
            ITI(option)


       */}
      <Liste
        title="Chantiers"
        data={
          (data && data.listeChantiers) || [
            { idChantier: 1, dateDebut: '25/10/20', activite: 'Plancher Bas' },
            { idChantier: 2, dateDebut: '10/10/20', activite: 'Soufflage' },
          ]
        }
        history={history}
      />
      <ListeDevis data={(data && data.listeDevis) || []} history={history} />
      <Divider>Données</Divider>
      <ComblesDescription
        listeItems={data && data.combles ? data.combles : []}
        ancestorID={id}
      />
    </LoaderData>
  );
};
