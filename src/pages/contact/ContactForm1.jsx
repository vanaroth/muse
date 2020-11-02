import React, { useState, useEffect } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  Select,
  Tooltip,
  message,
  Modal,
} from 'antd';
import Title from 'antd/lib/typography/Title';
import 'antd/dist/antd.css';

import { Container } from '../../components/Container';
import { CloseOutlined, RightOutlined, SaveOutlined } from '@ant-design/icons';
import {
  makeResolver,
  clearResolver,
  updateResolver,
} from '../../fonctions/resolver';
import axios from 'axios';
import TextArea from 'antd/lib/input/TextArea';
import { getFetchData } from '../../fonctions/loaders';

export const ContactForm = () => {
  const [contact, setContact] = useState(false);
  const [next, setNext] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();
  const sendUrl = '/api/contact' + (id || '');
  console.log('Contact Form');
  //il manque l'id contact pour faire le lien
  const saveUrl = '/contact/';
  const nextUrl = '/fiscalite/form/';

  const resolver = makeResolver(location.pathname);

  useEffect(() => {
    let ignore = false;
    id && getFetchData('/api/contact/', setContact, ignore, id);

    return () => {
      ignore = true;
    };
  }, [id]);

  return (
    <Container style={{ maxWidth: 1000, width: '80vw' }}>
      <Title level={4}>Formulaire Contact {id && `#${id}`}</Title>
      <Row justify="center">
        <Col>
          <Form
            initialValues={contact || resolver.data}
            onFinish={(values) => {
              console.log(values);
              message.info('Données envoyés');
              //on met les données à jour dans le resolver avant l'envoie
              updateResolver({ ...resolver, data: values });
              console.log('Contact Form next', next);
              setIsLoading(true);
              axios
                .post(sendUrl, values)
                .then((res) => {
                  message.info('La requete a abouti');
                  /*
                    Il faut que l'on verifie la connexion sinon 
                    history.push('/login')
                    Ensuite on doit vérifier l'ajout et récupérer l'id et verifier le code du resolver pour clear le localStorage
                    pour finir si tout c'est bien passer on lance un success message et on fait suivant ou on va sur la page contact
                  */
                  console.log('Contact Form Success', res);
                  const { isLogin } = res.data;
                  if (!isLogin) {
                    history.push({
                      pathname: '/signout',
                      state: { from: { pathname: location.pathname } },
                    });
                  }
                  const {
                    ajout,
                    id: idContact,
                    listOfSimilarContacts,
                    errors,
                  } = res.data.dataResponse.contact_new;

                  clearResolver(resolver);
                  setIsLoading(false);

                  if (ajout) {
                    message.success('Contact Ajouté #' + id);
                    errors.map((m) => message.error(m));
                    next
                      ? history.push(nextUrl)
                      : history.push({
                          pathname: saveUrl + idContact,
                          data: { ancestor: idContact },
                        });
                  } else {
                    Modal.error({
                      title: 'Contact Existant',
                      content:
                        'Il existe au moins un contact possédant nom prenom tel identique (' +
                        listOfSimilarContacts.map(
                          (i) => '#' + i.idContact + ' '
                        ) +
                        ')',
                    });
                  }
                })
                .catch((err) => {
                  setIsLoading(false);
                  message.error(
                    'Un problème est survenu ' + JSON.stringify(err)
                  );

                  console.log('Contact Form Error', err);
                });
            }}
          >
            <Form.Item name="genre" label="Genre">
              <Select placeholder="Genre" autoComplete="off">
                <Select.Option value="MME">Femme</Select.Option>
                <Select.Option value="M">Homme</Select.Option>
                <Select.Option value="Entreprise">Entreprise</Select.Option>
                <Select.Option value="Couple">Couple</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item noStyle>
              <Input.Group compact>
                <Form.Item name="nom" label="Nom">
                  <Input placeholder="Nom" autoComplete="off" />
                </Form.Item>
                <Form.Item name="prenom" label="Prénom">
                  <Input placeholder="Prénom" autoComplete="off" />
                </Form.Item>
              </Input.Group>
            </Form.Item>
            <Form.Item name="tel" label="Tel">
              <Input placeholder="Tel" autoComplete="off" />
            </Form.Item>
            <Form.Item name="email" label="Email">
              <Input placeholder="Email" autoComplete="off" />
            </Form.Item>
            <Form.Item name="commentaire" label="Commentaire">
              <TextArea placeholder="Commentaire" rows={7} />
            </Form.Item>
            <Form.Item>
              <Row justify="center" gutter={16}>
                <Col>
                  <DangerButton
                    text="Annuler"
                    htmlType="submit"
                    history={history}
                  />
                </Col>
                <Col>
                  <SaveButton
                    text="Enregistrer"
                    type="primary"
                    htmlType="submit"
                    icon={<SaveOutlined />}
                    loading={!next && isLoading}
                  />
                </Col>
                <Col>
                  <SuccessButton
                    text="Suivant"
                    htmlType="submit"
                    setNext={setNext}
                    loading={next && isLoading}
                  />
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

const DangerButton = ({ text, htmlType, history, ...props }) => {
  return (
    <Tooltip title={text}>
      <Button
        type="primary"
        htmlType={htmlType}
        icon={<CloseOutlined />}
        style={{ backgroundColor: 'tomato', border: '1px solid tomato' }}
        onClick={() => history.push('/contact')}
        {...props}
      ></Button>
    </Tooltip>
  );
};
const SaveButton = ({ text, htmlType, ...props }) => {
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

const SuccessButton = ({ text, htmlType, setNext, ...props }) => {
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
        }}
        onClick={() => setNext(true)}
        {...props}
      >
        {' '}
      </Button>
    </Tooltip>
  );
};
