import React, { useState, useEffect } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import {
  Form,
  Input,
  Select,
  message,
  Modal,
  Space,
  Button,
  Popconfirm,
  DatePicker,
  Mentions,
} from 'antd';
import 'antd/dist/antd.css';

import {
  makeResolver,
  clearResolver,
  updateResolver,
} from '../../fonctions/resolver';
import axios from 'axios';
import { ValidationBar } from '../../components/ValidationBar';
import { PageForm } from '../../components/PageForm';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Scroll } from '../../components/Scroll';
import { getFetchData } from '../../fonctions/loaders';

const { Option } = Select;

export const OpportuniteForm = () => {
  const [next, setNext] = useState(false);
  const [contacts, setContact] = useState([]);
  const [users, setUsers] = useState([]);
  const [serverData, setServerData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();

  const sendUrl = '/api/opportunite' + (id || '');

  const saveUrl = '/opportunite/';
  const nextUrl = '/habitation/form/';

  //oppportunité
  useEffect(() => {
    let ignore = false;
    id && getFetchData('/api/opportunite', setServerData, id);
    return () => {
      ignore = true;
    };
  }, [id]);

  //user
  useEffect(() => {
    let ignore = false;
    getFetchData('/api/user', setContact);
    return () => {
      ignore = true;
    };
  }, []);
  //contact
  useEffect(() => {
    let ignore = false;
    getFetchData('/api/contact', setContact);
    return () => {
      ignore = true;
    };
  }, []);

  const resolver = makeResolver(location.pathname);

  const columnStyle = {
    padding: '10px 0px',
    width: 130,
    textAlign: 'center',
    backgroundColor: '#eee',
  };
  const columns = [
    {
      title: 'Origine',
      dataIndex: 'origine',
      style: columnStyle,
      children: (
        <Select style={{ minWidth: columnStyle.width }}>
          <Option value="cns">Connaissance</Option>
          <Option value="geo">Geo</Option>
          <Option value="ira">Isol RA</Option>
          <Option value="pj">Page Jaune</Option>
        </Select>
      ),
    },
    {
      title: 'Complement Origine',
      dataIndex: 'complement_origine',
      style: { ...columnStyle, width: 170 },
      children: (
        <Mentions style={{ width: 170 }}>
          {contacts.map((contact) => (
            <Mentions.Option
              value={`${contact.prenom}#${contact.nom}#${contact.idContact}`}
              key={contact.idContact}
            >
              {contact.prenom} {contact.nom}
            </Mentions.Option>
          ))}
        </Mentions>
      ),
    },
    {
      title: 'Activité',
      dataIndex: 'activite',
      style: { ...columnStyle },
      children: (
        <Select style={{ minWidth: columnStyle.width }}>
          <Option value="soufflage">soufflage</Option>
          <Option value="plancher bas">Plancher Bas</Option>
          <Option value="VMC">vmc</Option>
          <Option value="ite">ITE</Option>
        </Select>
      ),
    },
    {
      title: 'N°Dossier',
      dataIndex: 'dossier',
      style: { ...columnStyle, width: 100 },
      children: <Input style={{ width: 100 }} />,
    },
    {
      title: 'Suivi Par',
      dataIndex: 'suivi_par',
      style: columnStyle,
      children: (
        <Mentions style={{ width: columnStyle.width }}>
          {users.map((user) => (
            <Mentions.Option
              value={`${user.prenom} ${user.nom}`}
              key={user.idUser}
            >
              {user.prenom} {user.nom}
            </Mentions.Option>
          ))}
        </Mentions>
      ),
    },
    {
      title: "Date d'intervention",
      dataIndex: 'date_intervention',
      style: { ...columnStyle, width: 150 },
      children: <DatePicker style={{ width: 150 }} />,
    },
  ];
  const params = {
    sendUrl: '/api/opportunite',
    backData: { label: 'Adresse', url: '/adresse/x' },
    saveData: { label: 'Adresse Details', url: '/adresse/x' },
    nextData: { label: 'Formulaire Habitation', url: '/habitation/form/' },
  };
  const onFinish = (values) =>
    genericOnFinish(
      resolver,
      setIsLoading,
      sendUrl,
      next,
      nextUrl,
      saveUrl,
      history,
      location,
      values
    );
  return (
    <PageForm title="Formulaire Opportunité " isFem>
      <Scroll>
        <Space>
          {columns.map((col, k) => (
            <div style={col.style}>{col.title}</div>
          ))}
          <div style={{ width: 50 }}></div>
        </Space>
        <Form
          initialValues={serverData || resolver.data}
          onFinish={onFinish}
          autoComplete="off"
          style={{ marginTop: 30, minWidth: 500 }}
        >
          <Form.List name="ops">
            {(fields, { add, remove }) => {
              return (
                <div>
                  {fields.map((field) => (
                    <Space
                      style={{ display: 'flex', marginBottom: 8 }}
                      align="start"
                    >
                      {columns.map((col, key) => (
                        <Form.Item
                          {...field}
                          name={[field.name, col.dataIndex]}
                          fieldKey={[field.fieldKey, col.dataIndex]}
                        >
                          {col.children}
                        </Form.Item>
                      ))}

                      <Popconfirm
                        onConfirm={() => remove(field.name)}
                        title="Voulez-vous vraiment supprimer cette ligne ?"
                      >
                        <MinusCircleOutlined style={{ marginTop: 8 }} />
                      </Popconfirm>
                    </Space>
                  ))}
                  <Form.Item style={{ textAlign: 'center' }}>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusCircleOutlined />}
                    >
                      Ajouter une Opportunité
                    </Button>
                  </Form.Item>
                </div>
              );
            }}
          </Form.List>
          <Form.Item style={{ textAlign: 'center', marginTop: 50 }}>
            <ValidationBar
              next={next}
              setNext={setNext}
              isLoading={isLoading}
              history={history}
              {...params}
            />
          </Form.Item>
        </Form>
      </Scroll>
    </PageForm>
  );
};

const genericOnFinish = (
  resolver,
  setIsLoading,
  sendUrl,
  next,
  nextUrl,
  saveUrl,
  history,
  location,
  values
) => {
  console.log(values);
  message.info('Données envoyés');
  //on met les données à jour dans le resolver avant l'envoie
  updateResolver({ ...resolver, data: values });

  setIsLoading(true);
  axios
    .post(sendUrl, values)
    .then((res) => {
      const { isLogin } = res.data;
      if (!isLogin) {
        history.push({
          pathname: '/signout',
          state: { from: { pathname: location.pathname } },
        });
      }
      const { ajout, id, listOfSimilar, errors } = Object.entries(
        res.data.dataResponse
      )[1];

      clearResolver(resolver);
      setIsLoading(false);

      if (ajout) {
        message.success('Ajouté #' + id);
        errors.map((m) => message.error(m));
        next
          ? history.push({
              pathname: nextUrl,
              data: { ancestor: id },
            })
          : history.push(saveUrl + id);
      } else {
        Modal.error({
          title: 'Existant',
          content:
            'Il existe au moins un élément identique (' +
            listOfSimilar.map((i) => '#' + i.id + ' ') +
            ')',
        });
      }
    })
    .catch((err) => {
      setIsLoading(false);
      message.error("Un problème est survenu lors de l'envoie du formulaire");
    });
};
