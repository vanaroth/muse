import React from 'react';

import { Form, Input, Select, Divider, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useHistory } from 'react-router-dom';
import { STDForm } from '../components/STDForm';

export const SimpleForm = () => {
  const history = useHistory();

  const nextParams = { url: '/fiscalite/form', state: false };
  const getUrl = '/contact';
  const postUrl = '/api/contact/';
  const passerEtape = { isShow: false };
  const title = 'Contact';
  //blinder le cas ou l'on a pas d'id pour dataResponse.id
  const onSuccess = (response, next) => {
    console.log('onSuccess', response);
    const { dataResponse } = response.data;
    if (dataResponse.ajout) {
      next && next.state
        ? history.push({
            pathname: next.url,
            data: { ancestor: { type: 'contact', id: dataResponse.id } },
          })
        : history.push(`/contact/${dataResponse.id ? dataResponse.id : ''}`);
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
      <Form.Item name="genre" label="Genre" rules={[{ required: true }]}>
        <Select placeholder="Genre" autoComplete="off">
          <Select.Option value="Couple">Couple</Select.Option>
          <Select.Option value="MME">Femme</Select.Option>
          <Select.Option value="M">Homme</Select.Option>
          <Select.Option value="Entreprise">Entreprise</Select.Option>
          <Select.Option value="CoupleFemme">Couple Femme</Select.Option>
          <Select.Option value="CoupleHomme">Couple Homme</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="nom" label="Nom" rules={[{ required: true }]}>
        <Input placeholder="Nom" autoComplete="off" />
      </Form.Item>
      <Form.Item name="prenom" label="Prénom">
        <Input placeholder="Prénom" autoComplete="off" />
      </Form.Item>

      <Form.Item name="tel" label="Tel" required>
        <Input placeholder="Tel" autoComplete="off" />
      </Form.Item>
      <Form.Item name="email" label="Email" required>
        <Input placeholder="Email" autoComplete="off" />
      </Form.Item>
      <Divider />
      <Form.Item>
        <Input.Group compact>
          <Form.Item name="commentaire" label="Commentaire">
            <TextArea
              placeholder="Commentaire"
              style={{ width: 480, maxWidth: '75vw' }}
              rows={8}
            />
          </Form.Item>
        </Input.Group>
      </Form.Item>
    </STDForm>
  );
};
