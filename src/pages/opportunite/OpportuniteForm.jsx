import React, { useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import {
  Form,
  Input,
  Select,
  message,
  Space,
  Button,
  Popconfirm,
  DatePicker,
  Mentions,
} from 'antd';
import 'antd/dist/antd.css';

import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { STDForm } from '../../components/STDForm';

const { Option } = Select;

export const OpportuniteForm = () => {
  const [contacts] = useState([]);
  const [users] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();

  if (id === undefined && location.data && !location.data.ancestor.id) {
    message.info('Pour ajouter un donnée fiscale il faut passer par ADRESSE');
    history.push('/');
  }
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
          <Option value="15">Recommander Par</Option>
          <Option value="11">Geo</Option>
          <Option value="13">Isol RA</Option>
          <Option value="12">Page Jaune</Option>
          <Option value="12">Page Jaune</Option>
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
    {
      title: 'Statut',
      dataIndex: 'statut',
      style: { ...columnStyle, width: 150 },
      children: (
        <Select>
          {['dossier incomplet', 'devis prêt', 'devis envoyé'].map((val) => (
            <Option key={val} value={val}>
              {val}
            </Option>
          ))}
        </Select>
      ),
    },
  ];

  const nextParams = { url: '/habitation/form', state: false };
  const getUrl = '/api/opportunite';
  const postUrl = getUrl;
  const passerEtape = { url: '/habitation/form', isShow: true };
  const title = 'Opportunité';

  const onSuccess = (response, next) => {
    console.log('onSuccess', response);
    const { dataResponse } = response.data;
    if (dataResponse.ajout) {
      next && next.state
        ? history.push({
            pathname: next.url,
            data: { ancestor: location.data.ancestor },
          })
        : history.push(`/adresse/${location.data.ancestor.id}`);
    } else {
      message.warning("Les données n'ont pas été ajouté !");
    }
  };

  const onFailure = () => {
    console.log(`Une Erreur est survenue au moment de l'envoie des données`);
  };
  const externalData = {
    idAdresse: location.data.ancestor.id,
  };

  return (
    <STDForm
      {...{
        nextParams,
        getUrl,
        postUrl,
        onSuccess,
        onFailure,
        passerEtape,
        title,
        externalData,
      }}
    >
      <Space style={{ marginBottom: 20 }}>
        {columns.map((col, k) => (
          <div style={col.style}>{col.title}</div>
        ))}
        <div style={{ width: 50 }}></div>
      </Space>

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
                  <Form.Item
                    noStyle
                    {...field}
                    name={[field.name, 'idOpportunite']}
                  ></Form.Item>

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
    </STDForm>
  );
};
