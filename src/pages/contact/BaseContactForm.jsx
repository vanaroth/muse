import React from 'react';
import { Form, Input, Select } from 'antd';

export const BaseContactForm = ({ id = false, field = null }) => {
  let idName = 'idContact';
  let genreName = 'genre';
  let nomName = 'nom';
  let prenomName = 'prenom';
  let telName = 'tel';
  let emailName = 'email';

  if (field !== null) {
    idName = listNameIs(field, idName);
    genreName = listNameIs(field, genreName);
    nomName = listNameIs(field, nomName);
    prenomName = listNameIs(field, prenomName);
    telName = listNameIs(field, telName);
    emailName = listNameIs(field, emailName);
  }
  return (
    <>
      {' '}
      <Form.Item name={idName} noStyle></Form.Item>
      <Form.Item noStyle>
        <Input.Group compact>
          <Form.Item
            name={genreName}
            label="Genre"
            rules={[{ required: true }]}
          >
            <Select placeholder="Genre" autoComplete="off">
              <Select.Option value="MME">Femme</Select.Option>
              <Select.Option value="M">Homme</Select.Option>
              <Select.Option value="Entreprise">Entreprise</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name={nomName} label="Nom" rules={[{ required: true }]}>
            <Input placeholder="Nom" autoComplete="off" />
          </Form.Item>
          <Form.Item name={prenomName} label="Prénom">
            <Input placeholder="Prénom" autoComplete="off" />
          </Form.Item>
        </Input.Group>
      </Form.Item>
      <Form.Item noStyle>
        <Input.Group compact>
          <Form.Item name={telName} label="Tel" required>
            <Input placeholder="Tel" autoComplete="off" />
          </Form.Item>
          <Form.Item name={emailName} label="Email" required>
            <Input placeholder="Email" autoComplete="off" />
          </Form.Item>
        </Input.Group>
      </Form.Item>
    </>
  );
};

const listNameIs = (field, val) => [field.name, val];
