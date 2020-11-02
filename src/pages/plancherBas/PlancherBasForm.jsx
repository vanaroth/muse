import React from 'react';
import { Form, Input, Checkbox, Radio, InputNumber } from 'antd';
import 'antd/dist/antd.css';
import { CoreForm } from '../../components/CoreForm';
import TextArea from 'antd/lib/input/TextArea';

export const PlancherBasForm = () => {
  // à charger pour plus de flexibilité
  const pieces = [
    { label: 'Garage', value: 'garage' },
    { label: 'Sous-Sol', value: 'sous-sol' },
    { label: 'Cave', value: 'cave' },
    { label: 'Vide-Sanitaire', value: 'vide-sanitaire' },
  ];
  // à charger pour plus de flexibilité
  const produits = [
    { label: 'Pro Wall', value: 'prowall' },
    { label: 'Super 12', value: 'super12' },
    { label: 'Hybris', value: 'hybris' },
  ];
  // à charger pour plus de flexibilité
  const plafond = [
    { label: 'Hourdis Béton', value: 'hourdis beton' },
    { label: 'Plancher Bois', value: 'plancher bois' },
    { label: 'Hourdis Polystyrène', value: 'hourdis polystyrène' },
    { label: 'Hourdis Brique', value: 'hourdis brique' },
  ];
  // à charger pour plus de flexibilité
  const autres = [
    { label: 'Chauffe eau', value: 'chauffe eau' },
    { label: 'Porte motorise', value: 'porte motorise' },
    { label: 'Fuel', value: 'fuel' },
    { label: 'Chaudiere', value: 'chaudiere' },
  ];
  const props = {
    sendUrl: '/api/plancherbas',
    saveUrl: '/plancherbas',
    nextUrl: false,
  };
  return (
    <CoreForm
      title="Plancher Bas"
      style={{ width: 800, maxWidth: '85vw' }}
      {...props}
    >
      <Form.Item name="piece" label="Pièce">
        <Radio.Group>
          {pieces.map((piece) => (
            <Radio key={piece.value} value={piece.value}>
              {piece.label}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
      <Form.Item name="produits" label="Produits">
        <Checkbox.Group options={produits} />
      </Form.Item>
      <Form.Item noStyle>
        <Input.Group compact>
          <Form.Item name="surface" label="Surface">
            <Input placeholder="Surface" addonAfter="M²" />
          </Form.Item>
          <Form.Item name="hauteur" label="Hauteur" addonAfter="M">
            <InputNumber placeholder="Hauteur" />
          </Form.Item>
          <Form.Item name="encombrement" label="Encombrement">
            <InputNumber placeholder="Encombrement" style={{ width: 150 }} />
          </Form.Item>
          <Form.Item name="tuyaux" label="Tuyaux au plafond">
            <InputNumber
              placeholder="Tuyaux au plafond"
              style={{ width: 150 }}
            />
          </Form.Item>
        </Input.Group>
      </Form.Item>
      <Form.Item>
        <Input.Group compact>
          <Form.Item name="plafond" label="Type de Plafond">
            <Checkbox.Group options={plafond} />
          </Form.Item>
        </Input.Group>
      </Form.Item>

      <Form.Item name="autres" label="Autres">
        <Checkbox.Group options={autres} />
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
