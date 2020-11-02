import React from 'react';
import { Descriptions, Space, Button } from 'antd';
import { EditOutlined, EnvironmentOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../../App.css';
import { Container } from '../../components/Container';
import { ButtonTooltip } from '../../components/ButtonTooltip';
import { useHistory } from 'react-router-dom';

export const AdresseDescriptions = ({
  id,
  rue,
  complement,
  ville,
  code_postal,
  geolocation = '?',
}) => {
  const history = useHistory();
  return (
    <Container>
      <Descriptions
        className="description"
        title="Adresse"
        extra={
          <Space>
            <ButtonTooltip title="Google Maps" type="link">
              <Button
                type="link"
                target="_blank"
                href={`https://www.google.fr/maps/place/+${rue}+${code_postal}+${ville}`}
              >
                <EnvironmentOutlined />
              </Button>
            </ButtonTooltip>
            <ButtonTooltip title="Modifier" type="link">
              <Button
                type="link"
                onClick={() => history.push('/adresse/form/' + id)}
              >
                <EditOutlined />
              </Button>
            </ButtonTooltip>
          </Space>
        }
        column={3}
      >
        <Descriptions.Item label="Rue" span={complement ? 1 : 3}>
          {rue}
        </Descriptions.Item>
        {complement && (
          <Descriptions.Item label="Complément" span={2}>
            {complement}
          </Descriptions.Item>
        )}
        <Descriptions.Item label="Ville">{ville}</Descriptions.Item>
        <Descriptions.Item label="Code Postal" span={2}>
          {code_postal}
        </Descriptions.Item>
        <Descriptions.Item label="Géolocalisation">
          {geolocation}
        </Descriptions.Item>
      </Descriptions>
    </Container>
  );
};
