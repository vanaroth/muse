import React from 'react';

import { Form, Input, Select, Divider, message, Button, Row, Col } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useHistory } from 'react-router-dom';
import { BaseContactForm } from './BaseContactForm';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { STDForm } from '../../components/STDForm';

export const ContactForm = () => {
  const history = useHistory();

  //Params pour STDForm
  const nextParams = { url: '/fiscalite/form', state: false };
  const getUrl = '/api/contact';
  const postUrl = getUrl;
  const passerEtape = { isShow: false };

  const title = 'Contact';

  //blinder le cas ou l'on a pas d'id pour dataResponse.id
  const onSuccess = (response, next) => {
    console.log('onSuccess', response);
    const { dataResponse } = response.data;
    if (dataResponse.ajout) {
      next && next.state
        ? history.push({
            pathname: next.url,
            data: { ancestor: { type: 'contact', id: dataResponse.id } },
          })
        : history.push(`/contact/${dataResponse.id ? dataResponse.id : ''}`);
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
      }}
    >
      <ContactFormUI />
    </STDForm>
  );
};

export const ContactFormUI = () => {
  return (
    <>
      <BaseContactForm />
      <Divider>Contact Associés</Divider>
      <Form.List name="contactsAssocies">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <Row style={{ padding: 20 }} gutter={16}>
                <Col>
                  <Form.Item name={[field.name, 'lien']} label="Nature du lien">
                    <Select>
                      {['conjoint', 'famille', 'voisin', 'autre'].map(
                        (lien) => (
                          <Select.Option key={lien} value={lien}>
                            {lien}
                          </Select.Option>
                        )
                      )}
                    </Select>
                  </Form.Item>
                  <BaseContactForm field={field} />
                </Col>

                <Col>
                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Col>
              </Row>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Contact
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Divider />
      <Form.Item>
        <Input.Group compact>
          <Form.Item name="commentaire" label="Commentaire">
            <TextArea
              placeholder="Commentaire"
              style={{ width: 480, maxWidth: '75vw' }}
              rows={8}
            />
          </Form.Item>
        </Input.Group>
      </Form.Item>
    </>
  );
};
