import React, { useState } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import axios from 'axios';

import { Container } from '../../components/Container';
import { Form, Input, Button, Row, Col, Alert, message } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import './LoginForm.css';
import Title from 'antd/lib/typography/Title';

export const LoginForm = ({ authorisation, setAuthorisation }) => {
  const history = useHistory();
  const location = useLocation();

  //si connecté on retourne à l'accueil
  if (authorisation.isAuthenticated === true) history.replace('/');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const onFinish = (values) => {
    tryConnexion(
      values,
      location,
      history,
      setIsLoading,
      setAuthorisation,
      setErrorMessage
    );
  };
  return (
    <Row justify="center" align="middle" style={{ height: '80vh' }}>
      <Col>
        <div className="LoginForm">
          <Container>
            <Title level={1} align="center" style={{ margin: 0 }}>
              <LockOutlined />
            </Title>
            <Title level={3} style={{ margin: 0 }}>
              Formulaire de Connexion
            </Title>
            <Form
              style={{ marginTop: '5vh', minHeight: '20vh' }}
              onFinish={onFinish}
            >
              <Form.Item name="login">
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Identifiant"
                  autoComplete="off"
                />
              </Form.Item>
              <Form.Item name="mdp">
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Mot de passe"
                />
              </Form.Item>
              {errorMessage && (
                <Form.Item>
                  <Alert
                    message="Problème de connexion"
                    description={errorMessage}
                    type="error"
                  />
                </Form.Item>
              )}
              <Form.Item>
                <Button
                  htmlType="submit"
                  loading={isLoading}
                  type="primary"
                  style={{ width: '100%' }}
                >
                  Connexion
                </Button>
              </Form.Item>
              <Link to="/probleme">
                <InfoCircleOutlined /> Problème de connexion
              </Link>
            </Form>
          </Container>
        </div>
      </Col>
    </Row>
  );
};

const tryConnexion = (
  values,
  location,
  history,
  setIsLoading,
  setAuthorisation,
  setErrorMessage
) => {
  console.log('tryConnexion');
  setIsLoading(true);

  axios
    .post('/api/login', values)
    .then((res) => {
      if (res.data.isLogin) {
        //netMessage('success', 'Login server Success response', res);
        message.success('Login server Success response');
        setAuthorisation((p) => ({ ...p, isAuthenticated: true }));
        redirection(location, history);
      } else {
        setErrorMessage("Erreur de Mot de passe ou d'identifiant ");
      }
      setIsLoading(false);
    })
    .catch((err) => {
      //netMessage('error', 'Login server Error response', err);
      message.error('Login server Error response');
      const errorMessage = err.message.includes('404')
        ? 'Problème de réseau'
        : "Erreur de Mot de passe ou d'identifiant ";

      setIsLoading(false);
      setAuthorisation((p) => ({ ...p, isAuthenticated: false }));
      setErrorMessage(errorMessage);
    });
};

const redirection = (location, history) => {
  console.log('redirection');
  setTimeout(() => {
    const url =
      location.state && location.state.form
        ? location.state.from.pathname
        : '/';
    history.replace(url);
  }, 100);
};
