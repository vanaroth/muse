import React from 'react';
import { Form, Input, Radio, InputNumber } from 'antd';
import 'antd/dist/antd.css';
import { CoreForm } from '../../components/CoreForm';
import TextArea from 'antd/lib/input/TextArea';

const upper = (v) => v.slice(0, 1).toUpperCase() + v.slice(1);
export const VMCForm = () => {
  // à charger pour plus de flexibilité
  const vmcExistante = [
    { label: 'Oui', value: 'oui' },
    { label: 'Non', value: 'non' },
  ];
  const typeFenetre = ['bois', 'alu', 'pvc'];

  const typefenetreFormat = typeFenetre.map((i) => ({
    label: upper(i),
    value: i,
  }));
  const props = {
    sendUrl: '/api/vmc',
    saveUrl: '/vmc',
    nextUrl: false,
  };
  return (
    <CoreForm title="VMC " style={{ width: 800, maxWidth: '85vw' }} {...props}>
      <Form.Item noStyle>
        <Input.Group compact>
          <Form.Item name="vmc_existante" label="VMC Existante">
            <Radio.Group options={vmcExistante} />
          </Form.Item>
          <Form.Item name="date_pause" label="Date de Pause">
            <Input />
          </Form.Item>
          <Form.Item name="distance_trappe" label="Distance à la trappe">
            <Input
              placeholder="Distance à la trappe"
              style={{ width: 150 }}
              addonAfter="M"
            />
          </Form.Item>
        </Input.Group>
      </Form.Item>

      <Form.Item name="surface_habitable" label="Surface Habitable">
        <Input
          placeholder="Surface Habitable"
          style={{ width: 150 }}
          addonAfter="M²"
        />
      </Form.Item>
      <Form.Item noStyle>
        <Input.Group compact>
          <Form.Item name="type_fenetre" label="Type de fenêtre">
            <Radio.Group>
              {typefenetreFormat.map((i) => (
                <Radio key={i.value} value={i.value}>
                  {i.label}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
          <Form.Item name="nbr_fenetre" label="Nombre de fenêtre">
            <InputNumber style={{ width: 150 }} />
          </Form.Item>
        </Input.Group>
      </Form.Item>

      <Form.Item name="nbr_bouche_existante" label="Nombre De Bouche Existante">
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="nbr_creation_bouche"
        label="Nombre De Création De Bouche "
      >
        <InputNumber />
      </Form.Item>
      <Form.Item name="nbr_entree_air" label="Nombre D'Entrée D'Air">
        <InputNumber />
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
