import React from 'react';
import { Descriptions, Space, List, Row, Col } from 'antd';
import { EditOutlined, EnvironmentOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../App.css';
import { Container } from '../../components/Container';
import { ButtonTooltip } from './ButtonTooltip';
import { Link } from 'react-router-dom';

export const AdresseListe = ({ dataSource }) => {
  return (
    <Container>
      <Descriptions className="description" title="Adresses"></Descriptions>

      <ul
        style={{
          listStyle: 'none',
          marginTop: '0em',
          padding: 0,
        }}
      >
        {dataSource.map(
          ({ rue, complement, ville, codePostal, geolocation = '?' }, k) => (
            <li
              style={{
                listStyle: 'none',
                marginTop: '.4em',
                padding: '0.3em',
                borderBottom: '1px solid #eee',
              }}
            >
              <Row gutter={32}>
                {' '}
                <Col span={{ md: 8, lg: 24 }} style={{ padding: '.4em' }}>
                  <Link to={`/adresse/10`}>
                    {rue} {complement && complement} {ville} ({codePostal})
                    {geolocation ? geolocation : 'Géolocalisation ?'}
                  </Link>
                </Col>
                <Col span={8}>
                  <Space>
                    <ButtonTooltip title="Google Maps">
                      <EnvironmentOutlined />
                    </ButtonTooltip>
                    <ButtonTooltip title="Modifier">
                      <EditOutlined />
                    </ButtonTooltip>
                  </Space>
                </Col>
              </Row>
            </li>
          )
        )}
      </ul>
    </Container>
  );
};
