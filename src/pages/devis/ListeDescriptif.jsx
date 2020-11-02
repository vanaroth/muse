import React, { useState, useEffect } from 'react';
import { Button, Input, Select, List, Form, message } from 'antd';
import 'antd/dist/antd.css';
import '../../App.css';
import Modal from 'antd/lib/modal/Modal';
import { Option } from 'antd/lib/mentions';
import Axios from 'axios';

const FormSoufflage = (props) => {
  return (
    <Form onFinish={(values) => console.log('soufflage', values)}>
      <Form.Item name="produit" label="Produit">
        <Input />
      </Form.Item>
      <Form.Item name="marque" label="Marque">
        <Input />
      </Form.Item>
      <Form.Item name="r" label="Résitance">
        <Input defaultValue={7} />
      </Form.Item>
    </Form>
  );
};

/*
    Il vaudrait mieux que la liste provienne de la bdd quite à avoir un json
*/

export const ListDescriptif = ({ onSelect }) => {
  const [rang, setRang] = useState(false);
  const [form, setForm] = useState(false);
  const [produitSelect, setProduitSelect] = useState(-1);
  const [produit, setProduit] = useState(0);
  const [marque, setMarque] = useState(0);
  const [model, setModel] = useState(0);

  const [produits, setProduits] = useState([
    {
      nom: 'Laine de verre',
      marques: [
        { title: 'Superglass', models: [{ nom: 'White Loft' }] },
        { title: 'Knauf', models: [{ nom: 'Supafil' }] },
        { title: 'Isover', models: [{ nom: 'Isolène' }, { nom: 'Insulsafe' }] },
      ],
      params: { pu: 10, unite: 'm2', prime: 12, tva: 5.5 },
    },
    {
      nom: 'Laine de roche',
      marques: [{ title: 'Rockwool', models: [{ nom: 'Jetrock 2' }] }],
      params: { unite: 'm3', prime: 10, tva: 5.5 },
    },
    {
      nom: 'Ouate de cellulose',
      marques: [
        { title: 'Soprema', models: [{ nom: 'Universel' }] },
        { title: 'Igloo', models: [{ nom: '?' }] },
      ],
      params: { unite: 'm2', prime: 10, tva: 5.5 },
    },
    {
      nom: 'Laine de Coton',
      marques: [{ title: '?', models: ['?'] }],
      params: { pu: 20, unite: 'm2', prime: 10, tva: 5.5 },
    },
    {
      nom: 'Laine de Coton',

      params: { pu: 20, unite: 'm2', prime: 10, tva: 5.5 },
    },
  ]);

  const [descriptifs, setDescriptif] = useState([
    {
      titre: 'Soufflage',
      description: `Soufflage en %s de marque %s et de model %s avec comme numero d'acermi %s`,
      data_wait: {
        produit: ``,
        r: 7,
        marques: ``,
        model: '',
      },
    },
    {
      titre: 'Rehausse',
      description: 'Rehausse ezf zef zef zef zef ',
      params: { pu: 0, unite: 'U', prime: 0, tva: 20 },
    },
    {
      titre: 'Localisation conduit',
      description: 'Localisation ezf zef zef zef zef ',
      params: { pu: 0, unite: 'U', prime: 0, tva: 20 },
    },
    {
      titre: 'Enlèvement',
      description: 'Enlèvement ezf zef zef zef zef ',
      params: { pu: 20, unite: 'm2', prime: 0, tva: 20 },
    },
  ]);

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      try {
        const result = await Axios.get('/api/descriptif/');
        const data = result.data.dataResponse;
        console.log('fetchData *** result ', result);
        console.log('fetchData', data);
        const listeProduits = data.produits;
        const listeDescriptifs = data.descriptifs;
        if (!ignore) {
          setProduits(listeProduits);
          setDescriptif(listeDescriptifs);
        }
      } catch (err) {
        message.error('Problème de connexion au server');
      }
    }
    fetchData();
    return () => {
      ignore = true;
    };
  }, []);

  const Tag = 'FormSoufflage';
  console.log('Tag', Tag);

  return (
    <>
      {form ? (
        <Form
          onFinish={(values) => {
            console.log('onFinish', values);
            const myProd = produits[produit];
            const myMarque = myProd.marques
              ? myProd.marques[marque]
              : { title: '' };
            const myModel = myProd.marques
              ? myMarque.models[model]
              : { nom: '' };
            onSelect(
              fied({ ...produitSelect, params: myProd.params }, [
                myProd.nom,
                myMarque.title,
                myModel.nom,
                values.r || 7,
              ])
            );
            setForm(false);
          }}
        >
          <Form.Item name="produit" label="Produit">
            <SelectOp
              option={produits.map((i, k) => ({
                label: i.nom,
                value: k,
              }))}
              onChange={(indexProduit) => {
                setProduit(indexProduit);
                setMarque(0);
                setModel(0);
              }}
            />
          </Form.Item>
          <Form.Item name="marque" label="Marque">
            <SelectOp
              option={
                produits[produit].marques
                  ? produits[produit].marques.map((i, k) => ({
                      label: i.title,
                      value: k,
                    }))
                  : []
              }
              onChange={(indexMarque) => {
                setMarque(indexMarque);
                setModel(produits[produit].marques[indexMarque].models[0]);
              }}
            />
          </Form.Item>
          <Form.Item name="model" label="Model">
            <SelectOp
              option={
                produits[produit].marques
                  ? produits[produit].marques[marque].models.map((i, k) => ({
                      label: i.nom,
                      value: k,
                    }))
                  : []
              }
              onChange={(indexModel) => {
                setModel(indexModel);
              }}
            />
          </Form.Item>
          <Form.Item name="r" label="Résistance">
            <Input defaultValue="7" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Valider
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <List
          dataSource={descriptifs}
          renderItem={(item, i) => (
            <List.Item
              onClick={() => {
                //si produit contient data -> show form -> custom content with data
                if (item.data_wait !== undefined) {
                  //afficher un form en fonction des données attendue
                  //setVisible(true);
                  console.log(item);
                  setProduitSelect(item);
                  setForm(true);
                } else {
                  //else return content and params
                  onSelect(item);
                }
              }}
            >
              {typeof item === 'object' ? (
                <Button
                  type="link"
                  onClick={() => {
                    console.log('i:', i);
                    setRang(i);
                  }}
                >
                  {item.titre}
                </Button>
              ) : (
                item
              )}
            </List.Item>
          )}
        />
      )}
    </>
  );
};

const SelectOp = ({ option, ...props }) => {
  console.log('Selectop', option);
  return (
    <Select {...props} defaultValue={0}>
      {option ? (
        option.map((i) => (
          <Option value={i.value} key={i.value || i}>
            {i.label}
          </Option>
        ))
      ) : (
        <Option value="no_data">No Data</Option>
      )}
    </Select>
  );
};

const fied = (produit, data) => {
  return {
    ...produit,
    description: produit.description
      .split('%s')
      .map((i, k) => (k < data.length ? i + ' ' + data[k] : i))
      .join(' '),
  };
};
