import React from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'antd';
import Title from 'antd/lib/typography/Title';
import 'antd/dist/antd.css';

import { Container } from './Container';

export const PageForm = ({ title, isFem, children }) => {
  const { id } = useParams();

  return (
    <Container style={{ maxWidth: 1000, width: '80vw' }}>
      <Title level={4}>{formatTitle(title, id, isFem)}</Title>
      <Row justify="center">
        <Col>{children}</Col>
      </Row>
    </Container>
  );
};

const formatTitle = (title, id, isFem) => {
  return (
    (id ? '' : isFem ? 'Nouvelle ' : 'Nouveau ') + title + (id ? '#' + id : '')
  );
};
