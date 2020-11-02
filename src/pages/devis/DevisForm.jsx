import React, { useState, useEffect } from 'react';
import {
  Modal,
  Button,
  Table,
  Input,
  Select,
  Popconfirm,
  Form,
  Cascader,
  InputNumber,
  Row,
  Col,
} from 'antd';
import 'antd/dist/antd.css';
import '../../App.css';
import { Container } from '../../components/Container';
import { SettingFilled, CloseOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import TextArea from 'antd/lib/input/TextArea';
import { Scroll } from '../../components/Scroll';
import { removeLine } from '../../fonctions/removeLine';
import { useForm } from 'antd/lib/form/Form';
import { colSpanCalcul } from './functions/colSpanCalcul';
import { TvaSelect } from './TvaSelect';
import { PlusButton } from '../../components/PlusButton';
import { targetise } from './functions/targetise';
import { tableCalcul } from './functions/tableCalcul';
import { UniteSelect } from './UniteSelect';
import { getFetchData } from '../../fonctions/loaders';
import { SaveButton, DangerButton } from '../../components/ValidationBar';

export const DevisForm = ({ save }) => {
  const [formModal] = useForm();

  const { id } = useParams();
  const [adresseData, setAdresseData] = useState(false);
  const [modalVisibility, setModalVisibility] = useState({
    visible: false,
    index: -1,
  });
  const [table, setTable] = useState([
    {
      descriptif: '',
      quantite: 0,
      unite: 'm2',
      pu: 0,
      tva: 5.5,
      prime: 0,
    },
  ]);
  const [cee, setCee] = useState('geo');
  const [topCom, setTopCom] = useState('');
  const [midCom, setMidCom] = useState('');

  const [showR, setShowR] = useState(false);

  let finalTable = tableCalcul(table);

  const onChange = (e, col, index) => {
    const value = e.target.value;
    console.log('onChange newt value', value);
    setTable((p) => {
      let newt = p;
      let ligne = p[index];
      ligne[col] = value;
      newt[index] = ligne;
      console.log('onChange newt', newt);

      return [...newt];
    });
    finalTable = tableCalcul(table);
    console.log('finalTable', finalTable);
  };

  const turnOffModalVisibility = (e) => {
    setModalVisibility({
      visible: false,
      index: -1,
    });
  };

  const columns = [
    {
      title: '',
      dataIndex: '',
      key: '',
      render: (a, b, index) =>
        index < table.length && (
          <Button
            icon={<SettingFilled />}
            onClick={() => {
              setModalVisibility({ visible: true, index });
            }}
          />
        ),
    },
    {
      title: 'Descriptif',
      dataIndex: 'descriptif',
      key: 'descriptif',
      render: (desc, record, index) =>
        colSpanCalcul(
          <TextArea
            value={desc}
            rows={5}
            style={{ minWidth: 300 }}
            onChange={(e) => onChange(e, 'descriptif', index)}
          />,
          record
        ),
    },
    {
      title: 'Quantié',
      dataIndex: 'quantite',
      key: 'quantite',
      render: (qte, record, index) =>
        colSpanCalcul(
          <Input
            value={qte}
            style={{ width: 70 }}
            onChange={(e) => onChange(e, 'quantite', index)}
          />,
          record
        ),
    },
    {
      title: 'Unité',
      dataIndex: 'unite',
      key: 'unite',
      render: (u, record, index) =>
        colSpanCalcul(
          <UniteSelect
            value={u}
            style={{ width: 50 }}
            onChange={(e) => onChange(e, 'unite', index)}
          />,
          record
        ),
    },
    {
      title: 'PU',
      dataIndex: 'pu',
      key: 'pu',
      render: (u, record, index) =>
        colSpanCalcul(
          <Input
            value={u}
            style={{ width: 70 }}
            onChange={(e) => onChange(e, 'pu', index)}
          />,
          record
        ),
    },
    {
      title: 'TVA',
      dataIndex: 'tva',
      key: 'tva',
      render: (taux, record, index) =>
        colSpanCalcul(
          <TvaSelect
            value={taux}
            onChange={(e) => onChange(e, 'tva', index)}
          />,
          record
        ),
    },
    {
      title: 'Prime',
      dataIndex: 'prime',
      key: 'prime',
      render: (prime, record, index) =>
        colSpanCalcul(
          <Input
            value={prime}
            style={{ width: 50 }}
            onChange={(e) => onChange(e, 'prime', index)}
          />,
          record
        ),
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (data, record) =>
        colSpanCalcul(
          <div style={{ textAlign: 'right' }}>{data} €</div>,
          record,
          7
        ),
    },
    {
      render: (data, record, index) =>
        index < table.length && (
          <Popconfirm
            title="Êtes-vous sur de vouloir supprimer la ligne?"
            okText="Oui"
            cancelText="Non"
            onConfirm={() => setTable((p) => [...removeLine(p, index)])}
          >
            <Button icon={<CloseOutlined />}></Button>
          </Popconfirm>
        ),
    },
  ];

  //charger la liste des descriptifs
  const descriptifs = [
    {
      label: 'Soufflage',
      value: 'soufflage',
      content: `Fourniture et mise en oeuvre par soufflage mécanique de %s, modèle %s, de marque %s, lambda %s W/(m.K), pour une résistance thermique R=%s(m².K/W), selon ACERMI N°%s et la norme NF %s, épaisseur soufflée %s mm avant tassement, soit une épaisseur de %s après tassement. `,
      children: [
        {
          label: 'Laine de verre',
          value: 'ldv',
          children: [
            {
              label: 'Superglass',
              value: 'superglass',
              children: [{ label: 'White Loft', value: 'white loft' }],
            },
            {
              label: 'Knauf',
              value: 'knauf',
              children: [{ label: 'Supafil', value: 'supafil' }],
            },
            {
              label: 'Isover',
              value: 'isover',
              children: [
                { label: 'Isolène 4', value: 'isolene 4' },
                { label: 'Insulsafe 33', value: 'insulsafe 33' },
              ],
            },
          ],
        },
        {
          label: 'Laine de roche',
          value: 'ldr',
          children: [
            {
              label: 'Rockwool',
              value: 'rockwool',
              children: [{ label: 'Jetrock 2', value: 'Jetrock 2' }],
            },
          ],
        },
      ],
    },
    {
      label: 'Sousrampants S12',
      value: 's12',
      content: `Sous rampant Tetris super 12 : Fourniture et mise en oeuvre isolant réflecteur alvéolaire Tetris super 12 de marque ACTIS épaisseur 175 mm testé selon la norme NF EN 16012+A1 pour résistance thermique intrinsèque R=6,00, par fixation mécanique, y compris adhésif pour assurer l'étanchéité. `,
      children: [],
    },
    { label: 'Chemin', value: 'chemin_de_vie', children: [] },
  ];
  const listeCEE = [{ nom: 'geo' }, { nom: 'ebs' }];
  const clearForm = () => {
    formModal.resetFields();
    setShowR(false);
    turnOffModalVisibility();
  };

  useEffect(() => {
    let ignore = false;
    getFetchData('/api/devis/data/?idAdresse=1519', setAdresseData, ignore);
  }, []);
  return (
    <Container
      title={(id ? '' : 'Nouveau') + ' Devis ' + (id ? '#' + id : '')}
      style={{ maxWidth: 1200, width: '80vw' }}
    >
      <Scroll>
        <div
          style={{
            minWidth: 1000,
          }}
        >
          <Form.Item label="CEE">
            <Select value={cee} onChange={(values) => setCee(values)}>
              {listeCEE.map((cee) => (
                <Select.Option value={cee.nom}>{cee.nom}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <TextArea
            rows={5}
            cols={100}
            placeholder="Commentaire d'information sur maison"
            value={topCom}
            onChange={(e) => setTopCom(e.target.value)}
          />

          <Table
            dataSource={finalTable}
            columns={columns}
            style={{ marginTop: 20 }}
          />
          <PlusButton setAdd={setTable} />
          <Form.Item>
            <TextArea
              rows={5}
              cols={100}
              placeholder="Commentaire de précision sur le devis"
              value={midCom}
              onChange={(e) => setMidCom(e.target.value)}
            />
          </Form.Item>
        </div>
      </Scroll>
      <Modal
        title="Liste des descriptifs"
        visible={modalVisibility.visible}
        onOk={() => {
          const value = formModal.getFieldsValue().descriptif[0];
          const find = descriptifs.find((i) => i.value === value);
          onChange(
            targetise(find.content),
            'descriptif',
            modalVisibility.index
          );
          clearForm();
        }}
        onCancel={turnOffModalVisibility}
        okText="Fermer"
        cancelText="Annuler"
      >
        <Form form={formModal}>
          <Form.Item name="descriptif" label="Descriptif">
            <Cascader
              options={descriptifs}
              onChange={(value) =>
                value[0] === 'soufflage' ? setShowR(true) : setShowR(false)
              }
            />
          </Form.Item>
          {showR && (
            <Form.Item name="r" label="Résitance">
              <InputNumber />
            </Form.Item>
          )}
        </Form>
      </Modal>
      <Row style={{ padding: 20 }} justify="center" gutter={32}>
        <Col>
          <DangerButton />
        </Col>
        <Col>
          <SaveButton onClick={() => save({ cee, topCom, table, midCom })} />
        </Col>
      </Row>
    </Container>
  );
};

export const DevisLogic = () => {
  const { id } = useParams();
  const [adresseData, setAdresseData] = useState(false);
  const prix_descriptif_produit = [];
  const save = (data) => console.log('Save Devis', data);
  console.log('Zis is Save', save);
  useEffect(() => {
    let ignore = false;
    getFetchData('/api/adresse/?idAdresse=1519', setAdresseData, ignore);
  }, []);

  return (
    <DevisForm
      adresseData={adresseData}
      prix_descriptif_produit={prix_descriptif_produit}
      save={save}
    />
  );
};
