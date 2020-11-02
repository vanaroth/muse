import React from 'react';
import { Form, Input, Radio } from 'antd';
import 'antd/dist/antd.css';
import { CoreForm } from '../../components/CoreForm';
import TextArea from 'antd/lib/input/TextArea';

export const MursForm = () => {
  // à charger pour plus de flexibilité
  const supports = [
    { label: 'Pisé', value: 'pisé' },
    { label: 'Béton', value: 'béton' },
    { label: 'Bois', value: 'bois' },
    { label: 'Placo', value: 'placo' },
    { label: 'Brique', value: 'brique' },
  ];

  const props = {
    sendUrl: '/api/murs',
    saveUrl: '/murs',
    nextUrl: false,
  };
  return (
    <CoreForm title="Murs" style={{ width: 800, maxWidth: '85vw' }} {...props}>
      <Form.Item name="support" label="Support">
        <Radio.Group>
          {supports.map((support) => (
            <Radio key={support.value} value={support.value}>
              {support.label}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>

      <Form.Item noStyle>
        <Input.Group compact>
          <Form.Item name="surface_froid" label="Surface Murs Froid">
            <Input
              placeholder="Surface Murs Froid"
              style={{ width: 150 }}
              addonAfter="M²"
            />
          </Form.Item>
          <Form.Item name="surface_chaud" label="Surface Murs Chaud">
            <Input
              placeholder="Surface Murs Chaud"
              style={{ width: 150 }}
              addonAfter="M²"
            />
          </Form.Item>
        </Input.Group>
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
