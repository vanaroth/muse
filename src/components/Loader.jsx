import React from 'react';
import { Spin, Col, Row } from 'antd';
import Title from 'antd/lib/typography/Title';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 54 }} spin />;
export const Loader = () => {
  return (
    <Row justify="center" align="middle" style={{ height: '80vh' }}>
      <Col style={{ textAlign: 'center' }}>
        <Title>Chargement</Title>
        <Spin indicator={antIcon} />
      </Col>
    </Row>
  );
};
