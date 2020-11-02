import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { Form, Input, Radio, Checkbox, Divider, message } from 'antd';
import 'antd/dist/antd.css';

import TextArea from 'antd/lib/input/TextArea';
import { getFetchData } from '../../fonctions/loaders';
import { STDForm } from '../../components/STDForm';

export const HabitationFrom = () => {
  const [data, setData] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const { id } = useParams();
  console.log('habitation Form');

  useEffect(() => {
    let ignore = false;
    id && getFetchData('/api/habitation', setData, id);
    return () => {
      ignore = true;
    };
  }, [id]);

  const autreCaraOptions = [
    { label: '+2ans', value: 'plus2ans' },
    { label: 'Maison De Village', value: 'village' },
    { label: 'Maison Phoenix', value: 'phoneix' },
    { label: 'Appartement', value: 'appartement' },
    { label: 'Maison Plein Pied', value: 'plein_pied' },
    { label: 'Maison Etage', value: 'etage' },
    { label: 'Maison Sur Sous Sol', value: 'sur_sous_sol' },
    { label: 'Maison En L', value: 'maison_en_l' },
  ];
  const modeChauffage = [
    { label: 'Combustible', value: 'combustible' },
    { label: 'Electrique', value: 'electrique' },
    { label: 'Insert', value: 'insert' },
  ];
  const typeChaudiere = [
    { label: 'Bois', value: 'bois' },
    { label: 'Condensation', value: 'condensation' },
    { label: 'Granulé', value: 'granule' },
    { label: 'Gaz', value: 'gaz' },
    { label: 'Fuel', value: 'fuel' },
    { label: 'Electrique', value: 'electrique' },
  ];
  const typeProprietaire = [
    { label: 'Propriétaire', value: 'proprietaire' },
    { label: 'Locataire', value: 'locataire' },
    { label: 'Bailleur', value: 'bailleur' },
    { label: 'Autre', value: 'autre' },
  ];

  let nextData = [];
  const moduleActif = ['soufflage'];
  switch (moduleActif) {
    case 'soufflage':
      nextData = { label: 'Formulaire Combles', url: '/combles/form/' };
      break;
    case 'plancher bas':
      nextData = {
        label: 'Formulaire Plancher bas',
        url: '/plancherbas/form/',
      };
      break;
    case 'vmc':
      nextData = {
        label: 'Formulaire VMC',
        url: '/vmc/form/',
      };
      break;
    case 'calo':
      nextData = {
        label: 'Formulaire Calo',
        url: '/calo/form/',
      };
      break;
    default:
      nextData = false;
      break;
  }

  /*
  
    On peut avoir dans location.data un chemin qui va de contact à
    habitation et qui en fonction
    de opportunité programme la suite 
  */
  const nextParams = { url: '/', state: false };
  const getUrl = '/api/opportunite';
  const postUrl = '/api/opportunite/';
  const passerEtape = { isShow: false };
  const title = 'Habitation';

  const onSuccess = (response, next) => {
    console.log('onSuccess', response);
    const { dataResponse } = response.data;
    if (dataResponse.ajout) {
      next && next.state
        ? history.push({
            pathname: next.url,
            data: { ancestor: location.data.ancestor },
          })
        : history.push(`/adresse/${location.data.ancestor.id}`);
    } else {
      message.warning("Les données n'ont pas été ajouté !");
    }
  };

  const onFailure = () => {
    console.log(`Une Erreur est survenue au moment de l'envoie des données`);
  };
  return (
    <STDForm
      {...{
        nextParams,
        getUrl,
        postUrl,
        onSuccess,
        onFailure,
        passerEtape,
        title,
      }}
    >
      <Form.Item name="propriete" label="Propriété">
        <Radio.Group options={typeProprietaire} />
      </Form.Item>
      <Form.Item name="complement_propriete" label="Complement">
        <Input placeholder="Complement Propriété" />
      </Form.Item>
      <Divider />
      <Form.Item name="type_habitation" label="Type d'habitation">
        <Radio.Group>
          <Radio value="individuelle">Individuelle</Radio>
          <Radio value="mitoyenne">Mitoyenne</Radio>
          <Radio value="ne sait pas">Ne sait pas</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="autre_caracteriqstique" label="Autres Caracteriqstique">
        <Checkbox.Group options={autreCaraOptions} />
      </Form.Item>

      <Divider />

      <Form.Item name="mode_chauffage" label="Mode de chauffage">
        <Checkbox.Group options={modeChauffage} />
      </Form.Item>
      <Form.Item name="type_chaudiere" label="Type de Chaudiere">
        <Checkbox.Group options={typeChaudiere} />
      </Form.Item>

      <Form.Item
        name="complement_mode_chauffage"
        label="Complement mode de chauffage"
      >
        <Input placeholder="Complement " />
      </Form.Item>

      <Divider>Commentaire</Divider>

      <Form.Item name="commentaire">
        <TextArea placeholder="Commentaire" rows={7} />
      </Form.Item>
    </STDForm>
  );
};
