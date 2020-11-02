import React from 'react';
import { Button, Row, Col, Tooltip, Popconfirm } from 'antd';

import 'antd/dist/antd.css';

import { CloseOutlined, RightOutlined, SaveOutlined } from '@ant-design/icons';

export const ValidationBar = ({ form, next, setNext, isLoading, ...props }) => {
  const abortLabel = 'Annuler ';
  const saveLabel = 'Enregistrer';
  const nextLabel = 'Suivant';
  return (
    <Row justify="center" gutter={16} style={{ margin: 'auto' }}>
      <Col>
        <Popconfirm
          placement="topLeft"
          title="Êtes-vous sûr de vouloir faire une remise à zero ?"
          onConfirm={() => form.resetFields()}
          okText="Oui"
          cancelText="Non"
        >
          <DangerButton text={abortLabel} htmlType="submit" />
        </Popconfirm>
      </Col>
      <Col>
        <SaveButton
          text={saveLabel}
          type="primary"
          htmlType="submit"
          icon={<SaveOutlined />}
          loading={isLoading}
        />
      </Col>
      {next !== false && (
        <Col>
          <SuccessButton
            text={nextLabel}
            htmlType="submit"
            setNext={() => setNext((p) => ({ ...p, state: true }))}
            loading={isLoading}
          />
        </Col>
      )}
    </Row>
  );
};

export const DangerButton = ({ text, ...props }) => {
  return (
    <Tooltip title={text}>
      <Button
        type="primary"
        icon={<CloseOutlined />}
        style={{ backgroundColor: 'tomato', border: '1px solid tomato' }}
        {...props}
      ></Button>
    </Tooltip>
  );
};
export const SaveButton = ({ text, htmlType, ...props }) => {
  return (
    <Tooltip title={text}>
      <Button
        type="primary"
        htmlType={htmlType}
        icon={<SaveOutlined />}
        {...props}
      ></Button>
    </Tooltip>
  );
};

export const SuccessButton = ({ text, htmlType, setNext, ...props }) => {
  return (
    <Tooltip title={text}>
      <Button
        type="primary"
        htmlType={htmlType}
        icon={
          <>
            <SaveOutlined />
            <RightOutlined />
          </>
        }
        style={{
          backgroundColor: '#52c41a',
          border: '1px solid #52c41a',
          width: 50,
        }}
        onClick={() => setNext(true)}
        {...props}
      ></Button>
    </Tooltip>
  );
};
