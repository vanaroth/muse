import React, { useState, useEffect } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import {
  Form,
  Input,
  Row,
  Col,
  Select,
  message,
  Modal,
  Table,
  Popconfirm,
} from 'antd';
import Title from 'antd/lib/typography/Title';
import 'antd/dist/antd.css';

import { Container } from '../../components/Container';
import {
  makeResolver,
  clearResolver,
  updateResolver,
} from '../contact/resolver';
import axios from 'axios';
import { PlusButton } from '../../components/PlusButton';
import { ValidationBar } from '../../components/ValidationBar';
import { MinusCircleOutlined } from '@ant-design/icons';
import { removeLine } from '../../fonctions/removeLine';
import { getFetchData } from '../../fonctions/loaders';

export const FiscaliteForm = () => {
  //intro from std
  const [next, setNext] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();
  console.log('fisc', location);
  /*
  if (!location.data || !location.data.ancestor.id) {
    message.info('Pour ajouter un donnée fiscale il faut passser par contact');
    history.push('/');
  }*/

  //variable
  const sendUrl = '/api/fiscalite' + (id || '');
  const saveUrl = '/fiscalite/';
  const nextUrl = '/adresse/form/';

  //spé
  const initialValues = {
    num1: '',
    num2: '',
    ref: '',
    montant: '',
  };
  const [data, setData] = useState([{ ...initialValues }]);
  const [montantTotal, setMontantTotal] = useState(50);
  const [fiscalite, setFiscalite] = useState({});

  const resolver = makeResolver(location.pathname);

  /* on doit changer le formulaire pour la modification  */
  useEffect(() => {
    let ignore = false;
    id && getFetchData('/api/fiscalite', setFiscalite, ignore);

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    const calcul = data.reduce((a, c) => {
      if (a !== false && isNaN(parseFloat(c.montant))) {
        return false;
      }
      return a + parseFloat(c.montant);
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
  const save = (values) => {
    message.info('Données envoyés');
    //on met les données à jour dans le resolver avant l'envoie
    updateResolver({ ...resolver, data: values });
    console.log('Fisc Form next', next);
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
        console.log('Fisc Form Success', res);
        const { isLogin } = res.data;
        if (!isLogin) {
          history.push({
            pathname: '/signout',
            state: { from: { pathname: location.pathname } },
          });
        }
        const {
          ajout,
          id: id,
          listOfSimilar,
          errors,
        } = res.data.dataResponse.contact_new;

        clearResolver(resolver);
        setIsLoading(false);

        if (ajout) {
          message.success('Fisc Ajouté #' + id);
          errors.map((m) => message.error(m));
          next
            ? history.push(nextUrl)
            : history.push({
                pathname: saveUrl + id,
                data: { ancestor: id },
              });
        } else {
          Modal.error({
            title: 'Fisc Existant',
            content:
              'Il existe au moins elment identique (' +
              listOfSimilar.map((i) => '#' + i.id + ' ') +
              ')',
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        message.error('Un problème est survenu ' + JSON.stringify(err));

        console.log('Fisc Form Error', err);
      });
  };
  return (
    <Container style={{ maxWidth: 1000, width: '80vw' }}>
      <Title level={4}>Formulaire Fiscalite {id && `#${id}`}</Title>
      <Row justify="center">
        <Col>
          <CustomForm
            {...{
              save,
              fiscalite,
              data,
              setData,
              montantTotal,
              next,
              setNext,
              isLoading,
              setIsLoading,
              initialValues,
              id,
              nextUrl,
              sendUrl,
              saveUrl,
              maj,
              resolver,
              history,
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};
const CustomForm = ({
  save,
  fiscalite,
  data,
  setData,
  montantTotal,
  next,
  setNext,
  isLoading,
  initialValues,
  history,
  maj,
  resolver,
}) => {
  //std

  console.log('fiscalite', fiscalite);
  const cols = [
    {
      title: 'Num 1',
      dataIndex: 'num1',
      key: 'num1',
      render: (v, r, i) => (
        <Input value={v} onChange={(e) => maj(i, 'num1', e.target.value)} />
      ),
    },
    {
      title: 'Num 2',
      dataIndex: 'num2',
      key: 'num2',
      render: (v, r, i) => (
        <Input value={v} onChange={(e) => maj(i, 'num2', e.target.value)} />
      ),
    },
    {
      title: 'ref',
      dataIndex: 'ref',
      key: 'ref',
      render: (v, r, i) => (
        <Input value={v} onChange={(e) => maj(i, 'ref', e.target.value)} />
      ),
    },
    {
      title: 'Montant',
      dataIndex: 'montant',
      key: 'montant',
      render: (v, r, i) => (
        <Input
          value={v}
          onChange={(e) => maj(i, 'montant', e.target.value)}
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
  return (
    <Form
      initialValues={fiscalite || resolver.data}
      onFinish={(topValues) => {
        const values = { ...topValues, declarants: data };
        console.log('fiscForm', values);
        save(values);
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
          <Form.Item name="bonus" label="Bonus" style={{ minWidth: 150 }}>
            <Select placeholder="Bonus" autoComplete="off">
              <Select.Option value="classique">Classique</Select.Option>
              <Select.Option value="bonus">Bonus</Select.Option>
              <Select.Option value="super">Super Bonus</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="Nbr" label="Nombre">
            <Input placeholder="Nombre d'habitant" autoComplete="off" />
          </Form.Item>

          <div style={{ paddingTop: 5 }}>
            <div style={{ marginBottom: 5, color: '#333' }}>Montant Total:</div>
            <Input
              value={montantTotal ? montantTotal : 'pas de calcul possible'}
              addonAfter="€"
              style={{ width: 200 }}
            />
          </div>
        </Input.Group>
      </Form.Item>
      <Form.Item label="Declarants">
        <Table dataSource={data} columns={cols} />
        <PlusButton
          setAdd={() => setData((p) => [...p, { ...initialValues }])}
        />
      </Form.Item>
      <Form.Item>
        <ValidationBar {...{ history, next, isLoading, setNext }} />
      </Form.Item>
    </Form>
  );
};
