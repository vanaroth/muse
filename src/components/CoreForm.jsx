import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Form, Row, Col } from 'antd';
import Title from 'antd/lib/typography/Title';
import 'antd/dist/antd.css';

import { Container } from './Container';
import { makeResolver } from '../fonctions/resolver';
import { ValidationBar } from './ValidationBar';

export const CoreForm = ({
  setNext,
  sendState,
  title,
  onFinish,
  children,
  form,
  ...props
}) => {
  //intro from std

  const location = useLocation();
  const { id } = useParams();

  //std
  const resolver = makeResolver(location.pathname);

  return (
    <Container {...props}>
      <Title level={4}>
        Formulaire {title} {id && `#${id}`}
      </Title>
      <Row justify="center">
        <Col>
          <Form
            form={form}
            initialValues={form.getFieldsValue() || resolver.data}
            onFinish={(values) => onFinish(form.getFieldsValue())}
          >
            {children}
            <ValidationBar setNext={setNext} isLoading={sendState.isLoading} />
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
