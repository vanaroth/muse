import React, { useState } from 'react';

import { Form, Input, Divider, message, AutoComplete, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { STDForm } from '../../components/STDForm';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const usersAuth = [
  { idUser: 1, login: 'wpeilhon', nom: 'PEILHON', prenom: 'Wyves' },
  { idUser: 1, login: 'scarles', nom: 'CARLES', prenom: 'Stéphanie' },
  { idUser: 1, login: 'cpaux', nom: 'PAUX', prenom: 'Christophe' },
  { idUser: 1, login: 'gdamour', nom: 'DAMOUR', prenom: 'Gaëtan' },
];
const autoUser = usersAuth.map((u) => ({ value: `${u.prenom} ${u.nom}` }));

const fournisseur = [
  {
    idFournisseur: 1,
    nom: 'Samse',
    agences: [
      { idAgence: 1, value: 'St Quentin-Fallavier', default: false },
      { idAgence: 2, value: 'St Savin', default: true },
    ],
  },
  {
    idFournisseur: 1,
    nom: 'Chausson',
    agences: [
      { idAgence: 3, value: 'St Quentin-Fallavier', default: true },
      { idAgence: 4, value: 'St Savin', default: false },
    ],
  },
  {
    idFournisseur: 1,
    nom: 'Rexel',
    agences: [{ idAgence: 5, value: 'Bourgoin', default: true }],
  },
];
const autoForunisseur = fournisseur.map((f) => ({
  idFournisseur: f.idFournisseur,
  value: ` ${f.nom}`,
}));

export const BDCForm = () => {
  const history = useHistory();
  const [form, setForm] = useState();
  const [ville, setVille] = useState([]);
  const nextParams = false;
  const getUrl = '/api/bdc';
  const postUrl = getUrl;
  const passerEtape = { isShow: false };
  const title = 'BDC';
  //blinder le cas ou l'on a pas d'id pour dataResponse.id
  const onSuccess = (response, next) => {
    console.log('onSuccess', response);
    const { dataResponse } = response.data;
    if (dataResponse.ajout) {
      history.push(`/bdc/${dataResponse.id ? dataResponse.id : ''}`);
    } else {
      message.warning("Les données n'ont pas été ajouté !");
    }
  };

  const onFailure = () => {
    console.log(`Une Erreur est survenue au moment de l'envoie des données`);
  };
  const getForm = (formData) => {
    setForm(formData);
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
        getForm,
      }}
    >
      <Form.Item noStyle>
        <Input.Group compact>
          <Form.Item
            name="createur"
            label="Fait par"
            rules={[{ required: true }]}
            style={{ minWidth: 200 }}
          >
            <AutoComplete
              placeholder="Fait par"
              autoComplete="off"
              options={autoUser}
              onSearch={filterOption}
            />
          </Form.Item>
          <Form.Item
            name="recuperateur"
            label="Recuperé par"
            rules={[{ required: true }]}
            style={{ minWidth: 200 }}
          >
            <AutoComplete
              placeholder="Recuperé par"
              autoComplete="off"
              options={autoUser}
              onSearch={filterAgence}
            />
          </Form.Item>
        </Input.Group>
      </Form.Item>
      <Divider>Fournisseur</Divider>
      <Form.Item noStyle>
        <Input.Group compact>
          <Form.Item
            name="fournisseur"
            label="Fournisseur"
            rules={[{ required: true }]}
            style={{ minWidth: 200 }}
          >
            <AutoComplete
              placeholder="Fournisseur"
              autoComplete="off"
              options={autoForunisseur}
              filterOption={filterOption}
              onChange={(value) => {
                const f = fournisseur
                  ? fournisseur.find((i) => value.indexOf(i.nom) > 0)
                  : false;
                const v = (f && f.agences.find((a) => a.default)) || '';

                form.setFieldsValue({
                  fournisseur: value,
                  ville: v.value || '',
                });
              }}
            />
          </Form.Item>
          <Form.Item
            name="ville"
            label="Ville"
            rules={[{ required: true }]}
            style={{ minWidth: 200 }}
          >
            <AutoComplete
              placeholder="Ville"
              autoComplete="off"
              options={ville}
              onSearch={(searchText) =>
                setVille(
                  form
                    ? fournisseur.find((i) => {
                        const f = form.getFieldsValue();
                        return f.fournisseur.indexOf(i.nom) >= 0;
                      }).agences
                    : fournisseur[0].agences
                )
              }
            />
          </Form.Item>
        </Input.Group>
      </Form.Item>
      <Divider>Ligne du BDC</Divider>
      <Form.List name="lignes_produit">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item required={false} key={field.key}>
                <Form.Item {...field} noStyle>
                  <Input.Group compact>
                    <Form.Item {...field} noStyle name="ref">
                      <Input
                        placeholder="ref"
                        style={{ width: 'calc(1/5*100%)' }}
                      />
                    </Form.Item>
                    <Form.Item {...field} noStyle name="nom">
                      <Input
                        placeholder="Nom"
                        style={{ width: 'calc(1/3*100%)' }}
                      />
                    </Form.Item>

                    <Form.Item {...field} noStyle>
                      <Input
                        placeholder="quantite"
                        style={{ width: 'calc(1/7*100%)' }}
                      />
                    </Form.Item>
                    <Form.Item {...field} noStyle>
                      <Input
                        placeholder="puht"
                        style={{ width: 'calc(1/7*100%)' }}
                      />
                    </Form.Item>
                    <Form.Item {...field} noStyle>
                      <Input
                        placeholder="unite"
                        style={{ width: 'calc(1/15*100%)' }}
                      />
                    </Form.Item>
                    <Form.Item noStyle>
                      <MinusCircleOutlined
                        style={{ marginTop: 10, width: 'calc(1/10*100%)' }}
                        onClick={() => remove(field.name)}
                      />
                    </Form.Item>
                  </Input.Group>
                </Form.Item>
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: '60%' }}
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </STDForm>
  );
};

const filterOption = (inputValue, option) =>
  option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;

const filterAgence = (form) =>
  form
    ? fournisseur.find((i) => {
        const f = form.getFieldsValue();
        return f.fournisseur.indexOf(i.nom) >= 0;
      }).agences
    : fournisseur[2].agences;
