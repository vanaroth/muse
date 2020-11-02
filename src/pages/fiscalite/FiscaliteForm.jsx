import React, { useState, useEffect } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import {
  Form,
  Input,
  Select,
  message,
  Table,
  Popconfirm,
  InputNumber,
} from 'antd';
import 'antd/dist/antd.css';

import { PlusButton } from '../../components/PlusButton';
import { MinusCircleOutlined } from '@ant-design/icons';
import { removeLine } from '../../fonctions/removeLine';
import { STDForm } from '../../components/STDForm';

export const FiscaliteForm = () => {
  //intro from std
  //const [next, setNext] = useState(false);
  //const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();
  console.log('fisc', location);

  if (id === undefined && (!location.data || !location.data.ancestor.id)) {
    message.info('Pour ajouter un donnée fiscale il faut passser par contact');
    history.push('/');
  }

  //spé
  const initialValues = {
    numero: '',
    numero2: '',
    ref_avis: '',
    revenu_fiscal: '',
  };
  const [data, setData] = useState([{ ...initialValues }]);

  const [montantTotal, setMontantTotal] = useState(50);
  //const [fiscalite, setFiscalite] = useState({});

  const nextParams = { url: '/adresse/form', state: false };
  const getUrl = '/api/fiscalite';
  const postUrl = '/api/fiscalite/';
  const passerEtape = { url: '/adresse/form', isShow: true };
  const title = 'Fiscalité';
  const externalData = {
    liste_declarants: data,
    idContact: (location.data && location.data.ancestor.id) || false,
  };

  useEffect(() => {
    const calcul = data.reduce((a, c) => {
      if (a !== false && isNaN(parseFloat(c.revenu_fiscal))) {
        return false;
      }
      return a + parseFloat(c.revenu_fiscal);
    }, 0);
    console.log('Use Effect', calcul);
    setMontantTotal(calcul);
  }, [data]);

  const maj = (ligne, col, value) => {
    console.log('MAJ', data);
    setData((p) => {
      let o = [...p];
      let l = o[ligne];
      l[col] = value;
      o[ligne] = l;
      return [...o];
    });
  };
  const cols = [
    {
      title: 'Num 1',
      dataIndex: 'numero',
      key: 'numero',
      render: (v, r, i) => (
        <Input value={v} onChange={(e) => maj(i, 'numero', e.target.value)} />
      ),
    },
    {
      title: 'Num 2',
      dataIndex: 'numero2',
      key: 'numero2',
      render: (v, r, i) => (
        <Input value={v} onChange={(e) => maj(i, 'numero2', e.target.value)} />
      ),
    },
    {
      title: 'ref',
      dataIndex: 'ref_avis',
      key: 'ref_avis',
      render: (v, r, i) => (
        <Input value={v} onChange={(e) => maj(i, 'ref_avis', e.target.value)} />
      ),
    },
    {
      title: 'Montant',
      dataIndex: 'revenu_fiscal',
      key: 'revenu_fiscal',
      render: (v, r, i) => (
        <Input
          value={v}
          onChange={(e) => maj(i, 'revenu_fiscal', e.target.value)}
          addonAfter="€"
        />
      ),
    },
    {
      title: '',
      dataIndex: '',
      key: 'sup',
      render: (v, r, index) => (
        <Popconfirm
          title="Êtes-vous sur de vouloir supprimer la ligne?"
          okText="Oui"
          cancelText="Non"
          onConfirm={() => setData((p) => [...removeLine(p, index)])}
        >
          <MinusCircleOutlined />
        </Popconfirm>
      ),
    },
  ];

  const onSuccess = (response, next) => {
    console.log('onSuccess', response);
    const { dataResponse } = response.data;
    if (dataResponse.ajout) {
      next && next.state
        ? history.push({
            pathname: next.url,
            data: { ancestor: location.data.ancestor },
          })
        : history.push(`/contact/${location.data.ancestor.id}`);
    } else {
      message.warning("Les données n'ont pas été ajouté !");
    }
  };

  const onFailure = () => {
    console.log(`Une Erreur est survenue au moment de l'envoie des données`);
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
      <Form.Item noStyle>
        <Input.Group
          compact
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Form.Item name="idPrime" label="Bonus" style={{ minWidth: 150 }}>
            <Select placeholder="Bonus" autoComplete="off">
              <Select.Option value="1">Classique</Select.Option>
              <Select.Option value="2">Bonus</Select.Option>
              <Select.Option value="3">Super Bonus</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="nbr_residents" label="Nombre habitant">
            <InputNumber
              type="number"
              placeholder="Nombre d'habitant"
              autoComplete="off"
              style={{ width: 150 }}
            />
          </Form.Item>

          <div style={{ paddingTop: 5 }}>
            <div style={{ marginBottom: 5, color: '#333' }}>Montant Total:</div>
            <Input
              type="number"
              value={montantTotal ? montantTotal : 'pas de calcul possible'}
              addonAfter="€"
              style={{ width: 200 }}
              readOnly
            />
          </div>
        </Input.Group>
      </Form.Item>
      <Form.Item noStyle>
        <Input.Group compact>
          <Form.Item label="Declarants">
            <Table dataSource={data} columns={cols} />
            <PlusButton
              setAdd={() => setData((p) => [...p, { ...initialValues }])}
            />
          </Form.Item>
        </Input.Group>
      </Form.Item>
    </STDForm>
  );
};
