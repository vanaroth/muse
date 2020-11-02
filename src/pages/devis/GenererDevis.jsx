import React, { useState } from 'react';
import { LoaderData } from '../../components/LoaderData';
import {
  createDevisAuto,
  addMembraneDescription,
  addEnlevementDescription,
  spotDescription,
} from './functions/fct_devis';
import { apiPostData } from '../../fonctions/apiPostData';
import { useHistory, useLocation } from 'react-router-dom';
import {
  message,
  Spin,
  Select,
  InputNumber,
  Form,
  Input,
  Checkbox,
  Button,
} from 'antd';
import { Container } from '../../components/Container';

export const GenererDevis = () => {
  const location = useLocation();
  console.log(location);

  const history = useHistory();
  const [rawData, setRawData] = useState(false);

  const onSuccess = (response) => {
    console.log('onSuccess', response);
    const { dataResponse } = response.data;
    if (dataResponse.ajout) {
      message.success('Allons voir le devis');

      window.open(
        `http://ira.nextsetp.ovh/api/devis/print?id=${
          dataResponse.id ? dataResponse.id : ''
        }`,
        '_blank'
      );
      history.goBack();
    } else {
      message.warning("Les données n'ont pas été ajouté !");
    }
  };

  return (
    <LoaderData
      url={`/api/devis/data/?idOpportunite=${
        location.data ? location.data.ancestor.ancestorID : false
      }`}
      setData={setRawData}
    >
      <GenererDevisUI data={rawData} onSuccess={onSuccess} />
    </LoaderData>
  );
};

export const GenererDevisUI = ({ data, onSuccess }) => {
  return (
    <>
      {data && data.typeDevis === undefined ? (
        <Container
          title="Chargement des données du devis"
          style={{ textAlign: 'center' }}
        >
          <Spin />
        </Container>
      ) : data.typeDevis === 'soufflage' ? (
        <FormSoufflage serverData={data} onSuccess={onSuccess} />
      ) : (
        <GenerationDevis serverData={data} onSuccess={onSuccess} />
      )}
    </>
  );
};

const GenerationDevis = ({ serverData, onSuccess, customData = false }) => {
  generationDevisFN(serverData, customData, onSuccess);
  return <Container title="...Génération du Devis en cours !!"></Container>;
};

const onFailure = () => {
  console.log(`Une Erreur est survenue au moment de l'envoie des données`);
};

const generationDevisFN = (serverData, onSuccess, customData = false) => {
  const { typeDevis } = serverData;
  console.log('generation du devis', serverData, customData);

  if (serverData !== false && typeDevis === 'soufflage') {
    //mettre idOpportunite au lieu de idMaison
    let data = createDevisAuto('soufflage', serverData);
    data['idOpportunite'] = serverData['opportunite']['idOpportunite'];
    data = addMembraneDescription(serverData, data);
    data = addEnlevementDescription(serverData, data);
    data = spotDescription(serverData, data);
    console.log('createDevisAuto ' + typeDevis, data);
    apiPostData('/api/devis/add', 'post', data, onSuccess, onFailure, false);
  }
};

const FormSoufflage = ({ serverData, onSuccess }) => {
  //const { typeDevis } = serverData;
  const [isLoading] = useState(false);
  const { Option } = Select;
  const produits = [
    { label: 'Laine', value: 'laine' },
    { label: 'Cache Spot', value: 'cache_spot' },
    { label: 'Bas de pentes', value: 'bas_pente' },
    { label: 'Membrane', value: 'membrane' },
    { label: 'Chemin de Vie', value: 'chemin_vie' },
  ];
  return (
    <Container title="Choix des Produits">
      <Form
        initialValues={{
          produits: produits.map((p) => p.value),
          laine: 'ldv',
          r: 7,
        }}
        onFinish={(values) => generationDevisFN(serverData, onSuccess, values)}
      >
        <Form.Item name="produits">
          <Checkbox.Group options={produits} />
        </Form.Item>
        <Form.Item noStyle>
          <Input.Group compact>
            <Form.Item name="laine" label="Laine">
              <Select style={{ width: 150 }}>
                <Option value="ldv">Laine de verre</Option>
                <Option value="ldr">Laine de roche</Option>
                <Option value="ouate">Ouate</Option>
                <Option value="coton">Coton</Option>
              </Select>
            </Form.Item>
            <Form.Item name="r" label="Résistance">
              <InputNumber type="number" />
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Form.Item style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Génération du Devis
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};
