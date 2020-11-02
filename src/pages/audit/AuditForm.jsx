import React from 'react';
import { Form, Input, Radio, Slider, Space } from 'antd';
import 'antd/dist/antd.css';
import { CoreForm } from '../../components/CoreForm';
import TextArea from 'antd/lib/input/TextArea';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';

const upper = (v) => v.slice(0, 1).toUpperCase() + v.slice(1);
const formatToObj = (v) =>
  v.map((i) => ({
    label: upper(i),
    value: i,
  }));
export const AuditForm = () => {
  // à charger pour plus de flexibilité
  const typeChantier = ['Soufflage', 'Plancher bas', 'VMC'];
  const typeChantierFormat = formatToObj(typeChantier);
  const ouiNon = formatToObj(['oui', 'non']);

  const props = {
    sendUrl: '/api/vmc',
    saveUrl: '/vmc',
    nextUrl: false,
  };
  return (
    <CoreForm title="Audit" style={{ width: 800, maxWidth: '85vw' }} {...props}>
      <Form.Item name="type_chantier" label="Type Chantier ">
        <Radio.Group options={typeChantierFormat} />
      </Form.Item>
      <Form.Item name="ponctuelle" label="L'Equipe a-t-elle été ponctuelle ?">
        <Radio.Group options={ouiNon} />
      </Form.Item>
      <Form.Item
        name="nettoyage"
        label="L'Equipe a-t-elle effectué correctement le nettoyage ?"
      >
        <Radio.Group options={ouiNon} />
      </Form.Item>
      <Form.Item name="courtoisie" label="L'Equipe a-t-elle été courtoise ?">
        <Slider min={1} max={10} />
      </Form.Item>
      <Form.Item
        name="satisfaction"
        label="Êtes-vous satisfait dans l'ensemble ?"
      >
        <Slider min={1} max={10} />
      </Form.Item>
      <Space align="baseline">
        <FrownOutlined />
        <Form.Item name="recommendation" label="Recommendation ?">
          <Slider min={1} max={4} style={{ width: 200 }} />
        </Form.Item>
        <SmileOutlined />
      </Space>

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
