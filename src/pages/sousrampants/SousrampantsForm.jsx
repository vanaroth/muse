import React from 'react';
import { Form, Input, Radio, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import { CoreForm } from '../../components/CoreForm';
import TextArea from 'antd/lib/input/TextArea';

export const SousrampantsForm = () => {
  // à charger pour plus de flexibilité
  const produits = [
    { label: 'Super 12', value: 'super12' },
    { label: 'Hybris', value: 'hybris' },
    { label: 'Laine de bois', value: 'laine de bois' },
  ];

  const props = {
    sendUrl: '/api/sousrampants',
    saveUrl: '/sousrampants',
    nextUrl: false,
  };
  return (
    <CoreForm
      title="Sousrampants "
      style={{ width: 800, maxWidth: '85vw' }}
      {...props}
    >
      <Form.Item name="produits" label="Produits">
        <Radio.Group>
          <Checkbox.Group options={produits} />
        </Radio.Group>
      </Form.Item>

      <Form.Item name="surface" label="Surface">
        <Input placeholder="Surface" style={{ width: 150 }} addonAfter="M²" />
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
