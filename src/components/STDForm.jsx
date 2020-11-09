import React, { useState, useEffect } from 'react';

import { ValidationBar } from '../components/ValidationBar';
import { Form, Row, Col } from 'antd';

import { LoaderData } from '../components/LoaderData';
import { useParams } from 'react-router-dom';
import { apiPostData } from '../fonctions/apiPostData';
import { ButtonPasserEtape } from '../components/ButtonPasserEtape';
import { Container } from './Container';
import Title from 'antd/lib/typography/Title';
import { makeUrl } from '../pages/devis/functions/makeUrl';

export const STDForm = ({
  nextParams,
  getUrl,
  postUrl,
  onSuccess,
  onFailure,
  passerEtape,
  title,
  externalData,
  getForm,
  children,
}) => {
  const [data, setData] = useState();
  const [next, setNext] = useState(nextParams);
  const [form] = Form.useForm();
  const { id } = useParams();

  getForm && getForm(form);
  //externalSet(setData);

  const postData = (values) => {
    const method = id !== undefined ? 'post' : 'put';
    const url = makeUrl(`${postUrl}${id ? '/' + id : ''}`);
    console.log('url', url);

    const finalValue = externalData ? { ...values, ...externalData } : values;
    console.log('finalValue', finalValue);
    apiPostData(url, method, finalValue, onSuccess, onFailure, next);
  };
  useEffect(() => {
    form.setFieldsValue(data);
  }, [form, data]);

  if (id !== undefined) {
    return (
      <LoaderData url={`${getUrl}/${id}`} setData={setData}>
        {
          <FormUI
            form={form}
            postData={postData}
            next={next}
            setNext={setNext}
            passerEtape={passerEtape}
            title={title}
            serverData={data}
            children={children}
          />
        }
      </LoaderData>
    );
  } else {
    return (
      <FormUI
        form={form}
        postData={postData}
        next={next}
        setNext={setNext}
        passerEtape={passerEtape}
        title={title}
        children={children}
      />
    );
  }
};

const FormUI = ({
  form,
  postData,
  next,
  setNext,
  passerEtape,
  children,
  title,
  serverData = {},
}) => {
  const { id } = useParams();
  return (
    <Container style={{ zIndex: 1 }}>
      <Title level={4}>
        Formulaire {title} {id && `#${id}`}
      </Title>
      <Row justify="center">
        <Col>
          <ButtonPasserEtape {...passerEtape} />
          <Form
            form={form}
            initialValues={serverData}
            onFinish={(values) => {
              console.log('values', values);
              postData(values);
            }}
          >
            {children}
            <Form.Item>
              <ValidationBar form={form} next={next} setNext={setNext} />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
