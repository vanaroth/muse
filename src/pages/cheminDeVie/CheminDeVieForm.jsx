import React from 'react';
import { Form, Input, Radio } from 'antd';
import 'antd/dist/antd.css';
import { CoreForm } from '../../components/CoreForm';
import TextArea from 'antd/lib/input/TextArea';

export const CheminDeVieForm = () => {
  // à charger pour plus de flexibilité
  const typeCharpentes = [
    { label: 'Fermette', value: 'fermette' },
    { label: 'Traditionnel', value: 'traditionnel' },
    { label: 'Plancher bois', value: 'plancher bois' },
    { label: 'Plancher béton', value: 'plancher béton' },
  ];

  const props = {
    sendUrl: '/api/chemindevie',
    saveUrl: '/chemindevie',
    nextUrl: false,
  };
  return (
    <CoreForm
      title="Chemin De Vie "
      style={{ width: 800, maxWidth: '85vw' }}
      {...props}
    >
      <Form.Item name="type_de_charpente" label="Type de Charpente">
        <Radio.Group>
          {typeCharpentes.map((typeCharpente) => (
            <Radio key={typeCharpente.value} value={typeCharpente.value}>
              {typeCharpente.label}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>

      <Form.Item name="distance" label="Distance trappe -> Chemin">
        <Input placeholder="Distance" style={{ width: 150 }} addonAfter="M²" />
      </Form.Item>
      <Form.Item name="longeur" label="Longeur">
        <Input placeholder="Longeur" style={{ width: 150 }} addonAfter="M²" />
      </Form.Item>

      <Form.Item>
        <Input.Group compact>
          <Form.Item name="complement" label="Complément">
            <TextArea
              placeholder="Complément"
              style={{ width: 480, maxWidth: '75vw' }}
            />
          </Form.Item>
        </Input.Group>
      </Form.Item>
    </CoreForm>
  );
};
