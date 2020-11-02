import React from 'react';
import { Descriptions } from 'antd';
import 'antd/dist/antd.css';
import '../../App.css';
import { Container } from '../../components/Container';
import { EditOutlined } from '@ant-design/icons';
import { ButtonTooltip } from '../../components/ButtonTooltip';

export const ContactDescription = ({ data, id, history }) => {
  return (
    <Container>
      <Descriptions
        className="description"
        title="Contact"
        extra={
          <ButtonTooltip
            title="Modifier"
            type="link"
            onClick={() => history.push('/contact/form/' + id)}
          >
            <EditOutlined />
          </ButtonTooltip>
        }
        column={3}
      >
        <Descriptions.Item label="Genre">{data.genre}</Descriptions.Item>
        <Descriptions.Item label="Nom">{data.nom}</Descriptions.Item>
        <Descriptions.Item label="Prénom">{data.prenom}</Descriptions.Item>
        <Descriptions.Item label="Tel" span={3}>
          {data.tel}
        </Descriptions.Item>
        <Descriptions.Item label="Email">{data.email}</Descriptions.Item>
      </Descriptions>
    </Container>
  );
};
