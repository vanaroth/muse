import React from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { Form, Input, message, Divider, Radio } from 'antd';
import 'antd/dist/antd.css';
import TextArea from 'antd/lib/input/TextArea';
import { formatToObj } from '../../fonctions/formatToObj';
import { EnvironmentOutlined } from '@ant-design/icons';
import { STDForm } from '../../components/STDForm';
import { makeUrl } from '../devis/functions/makeUrl';

export const AdresseForm = () => {
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();

  if (id === undefined && (!location.data || !location.data.ancestor.id)) {
    message.info('Pour ajouter une adresse il faut passser par contact');
    history.push('/');
  }

  const nextParams = { url: '/opportunite/form', state: false };
  const getUrl = '/api/adresse';
  const postUrl = '/api/adresse';
  const passerEtape = { isShow: false };
  const title = 'Adresse';
  const externalData = { idContact: location.data.ancestor.id };

  const onSuccess = (response, next) =>
    onSuccessPost(response, next, history, 'adresse');
  const onFailure = () => {
    console.log(`Une Erreur est survenue au moment de l'envoie des données`);
  };
  return (
    <AdresseFormUI
      {...{
        nextParams,
        getUrl,
        postUrl,
        onSuccess,
        onFailure,
        passerEtape,
        title,
        externalData,
      }}
    />
  );
};

const AdresseFormUI = (props) => {
  const radios = {
    type_stationnement: formatToObj([
      'parking',
      'cour',
      'bord de route',
      'ne sait pas',
    ]),
    ouiNonNeSaitPAs: ['oui', 'non', 'ne sait pas'],
    ouiNon: formatToObj(['oui', 'non']),
  };
  console.log('ui', props);
  return (
    <STDForm {...props}>
      <Form.Item name="adresse" label="Rue">
        <Input placeholder="Rue" />
      </Form.Item>

      <Form.Item name="complement" label="Complement">
        <Input placeholder="Complement Adresse" />
      </Form.Item>
      <Form.Item noStyle>
        <Input.Group compact>
          <Form.Item name="ville" label="Ville">
            <Input placeholder="Ville" style={{ width: 220 }} />
          </Form.Item>
          <Form.Item name="code_postal" label="Code Postal">
            <Input placeholder="Code Postal" style={{ width: 120 }} />
          </Form.Item>
          <Form.Item name="geolocalisation" label="Geolocalisation">
            <Input addonAfter={<EnvironmentOutlined />} />
          </Form.Item>
        </Input.Group>
        <Form.Item name="adresse_facturation" label="Adresse de facturation">
          <Radio.Group options={radios.ouiNon} />
        </Form.Item>
      </Form.Item>

      <Divider>Stationnement</Divider>
      <Form.Item name="type_stationnement" label="Type de stationnement">
        <Radio.Group options={radios.type_stationnement} />
      </Form.Item>
      <Form.Item
        name="stationnement_payant"
        label="Le stationnement est-il payant ?"
      >
        <Radio.Group options={radios.ouiNonNeSaitPAs} />
      </Form.Item>
      <Form.Item name="arrete" label="Faut-il un arrété ?">
        <Radio.Group options={radios.ouiNonNeSaitPAs} />
      </Form.Item>
      <Form.Item
        name="acces_facile"
        label="L'acces est-il facile pour les utilitaires ?"
      >
        <Radio.Group options={radios.ouiNonNeSaitPAs} />
      </Form.Item>
      <Divider>Complement</Divider>
      <Form.Item name="infos_supplementaire">
        <TextArea placeholder="Complement" rows={7} style={{ width: '100%' }} />
      </Form.Item>
    </STDForm>
  );
};

const onSuccessPost = (response, next, history, baseLink) => {
  console.log('onSuccess', response);

  const { dataResponse, isLogin } = response.data;
  const suivant = (baseLink) => {
    next && next.state
      ? history.push({
          pathname: makeUrl(next.url),
          data: { ancestor: { type: baseLink, id: dataResponse.id } },
        })
      : history.push(
          makeUrl(`/${baseLink}/${dataResponse.id ? dataResponse.id : ''}`)
        );
  };

  const needSignout = () => {
    if (isLogin === false) history.push('/signout');
  };
  needSignout();
  dataResponse.ajout
    ? suivant(baseLink)
    : message.warning("Les données n'ont pas été ajouté !");
};
