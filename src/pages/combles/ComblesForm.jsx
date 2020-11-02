import React from 'react';
import { Form, Input, Radio, InputNumber, Checkbox, Divider } from 'antd';
import 'antd/dist/antd.css';
import { CoreForm } from '../../components/CoreForm';
import TextArea from 'antd/lib/input/TextArea';
import { formatToObj } from '../../fonctions/formatToObj';

export const ComblesForm = () => {
  // à charger pour plus de flexibilité
  const isolants = formatToObj(['LDV', 'LDR', 'ouate', 'coton', 'ne sait pas']);
  const formatIsolant = formatToObj(['rouleau', 'soufflé', 'ne sait pas']);
  const ouiNon = formatToObj(['oui', 'non', 'ne sait pas']);
  const basPente = formatToObj(['IBR', 'PVC', 'aucun']);
  const typePiece = formatToObj(['humide', 'sèche', 'ne sait pas']);
  const typeSpot = formatToObj(['led', 'halogène', 'ne sait pas']);
  // à charger pour plus de flexibilité
  const typeCharpentes = [
    { label: 'Fermette', value: 'fermette' },
    { label: 'Traditionnel', value: 'traditionnel' },
    { label: 'Plancher bois', value: 'plancher bois' },
    { label: 'Plancher béton', value: 'plancher béton' },
  ];

  const props = {
    sendUrl: '/api/combles',
    saveUrl: '/combles',
    nextUrl: false,
  };
  return (
    <CoreForm
      title="Combles"
      style={{ width: 800, maxWidth: '85vw' }}
      {...props}
    >
      <Divider>Combles</Divider>
      <Form.Item name="combles_perdu" label="Avez-vous des Combles Perdu ?">
        <Radio.Group options={ouiNon} />
      </Form.Item>
      <Form.Item
        name="combles_amenage"
        label="Avez-vous des Combles Amenageable ?"
      >
        <Radio.Group options={ouiNon} />
      </Form.Item>
      <Form.Item
        name="velux_combles"
        label="Avez-vous des Velux dans les combles ?"
      >
        <Radio.Group options={ouiNon} />
      </Form.Item>
      <Form.Item name="combles_vides" label="Les combles sont-ils vides ?">
        <Radio.Group options={ouiNon} />
      </Form.Item>
      <Form.Item name="surface" label="Surface des combles ?">
        <Input addonAfter="M²" />
      </Form.Item>

      <Divider>Ancien Isolant</Divider>

      <Form.Item name="ancien_isolant" label="Quel est votre ancien isolant ?">
        <Radio.Group options={isolants} />
      </Form.Item>
      <Form.Item
        name="format_ancien_isolant"
        label="Quel est le format de l'ancien isolant ?"
      >
        <Radio.Group options={formatIsolant} />
      </Form.Item>
      <Form.Item name="enlevement" label="Doit-on faire un enlèvement ?">
        <Radio.Group options={ouiNon} />
      </Form.Item>
      <Form.Item name="type_charpente" label="Quel est le type de charpente ?">
        <Radio.Group options={typeCharpentes} />
      </Form.Item>

      <Divider>Nouvel Isolant</Divider>

      <Form.Item
        name="nouvel_isolant"
        label="Quel isolant pourrait vous intérésser ?"
      >
        <Checkbox.Group options={isolants} />
      </Form.Item>
      <Form.Item
        name="format_nouvel_isolant"
        label="Que souhaitez-vous comme format pour le nouvel isolant ?"
      >
        <Radio.Group options={formatIsolant} />
      </Form.Item>

      <Divider>Combien d'Accès</Divider>
      <Form.Item>
        <Input.Group compact>
          <Form.Item name="acces_toit" label="par toit">
            <InputNumber />
          </Form.Item>
          <Form.Item name="acces_trappe" label="par trappe">
            <InputNumber />
          </Form.Item>
          <Form.Item name="acces_porte" label="par porte">
            <InputNumber />
          </Form.Item>
          <Form.Item name="acces_escalier" label="par escalier">
            <InputNumber />
          </Form.Item>
        </Input.Group>
      </Form.Item>
      <Form.Item>
        <Input.Group compact>
          <Form.Item name="complement_acces" label="Complément Accès">
            <TextArea
              placeholder="Complément"
              style={{ width: 480, maxWidth: '75vw' }}
            />
          </Form.Item>
        </Input.Group>
      </Form.Item>
      <Divider>Toit</Divider>
      <Form.Item name="volige" label="Y a-t-il de la Volige ?">
        <Radio.Group options={ouiNon} />
      </Form.Item>
      <Form.Item
        name="nbr_conduit_cheminee"
        label="Combien de conduit de cheminéee ?"
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="bas_pente"
        label="Quel produit faut-il poser dans les bas de pentes ?"
      >
        <Radio.Group options={basPente} defaultValue="aucun" />
      </Form.Item>
      <Form.Item
        name="longueur_bas_pente"
        label="Longueur  Bas de Pente (0 si non) ?"
      >
        <InputNumber defaultValue={0} />
      </Form.Item>
      <Form.Item name="nbr_réhausse" label="Nombre de réhausse ?">
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="ecran_sous_toiture"
        label="Y a-t-il un écran sous toiture ?"
      >
        <Radio.Group options={ouiNon} />
      </Form.Item>
      <Divider>Nombre VMC</Divider>
      <Form.Item>
        <Input.Group compact>
          <Form.Item name="vmc_suspendu" label="Supendu">
            <InputNumber />
          </Form.Item>
          <Form.Item name="vmc_posee" label="Posée">
            <InputNumber />
          </Form.Item>
        </Input.Group>
      </Form.Item>
      <Divider>Spot</Divider>
      <Form.Item name="nbr_spot" label="Nombre de Spot">
        <InputNumber />
      </Form.Item>
      <Form.Item name="type_piece" label="Type de pièce">
        <Checkbox.Group options={typePiece} />
      </Form.Item>
      <Form.Item name="proteger_spot" label="Doit-on protéger les spots ?">
        <Radio.Group options={ouiNon} />
      </Form.Item>
      <Form.Item name="type_spot" label="Type de spot">
        <Checkbox.Group options={typeSpot} />
      </Form.Item>
      <Form.Item>
        <Input.Group compact>
          <Form.Item name="complement_spot" label="Complément Spot">
            <TextArea
              placeholder="Complément"
              style={{ width: 480, maxWidth: '75vw' }}
            />
          </Form.Item>
        </Input.Group>
      </Form.Item>
      <Divider />

      <Form.Item>
        <Input.Group compact>
          <Form.Item name="complement" label="Complément Générale">
            <TextArea
              rows={10}
              placeholder="Complément"
              style={{ width: 480, maxWidth: '75vw' }}
            />
          </Form.Item>
        </Input.Group>
      </Form.Item>
    </CoreForm>
  );
};
