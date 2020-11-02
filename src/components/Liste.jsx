import React from 'react';
import { List, Empty, Space } from 'antd';
import 'antd/dist/antd.css';
import { Container } from './Container';
import { Link } from 'react-router-dom';

export const Liste = ({ title, data }) => {
  console.log('Liste', data);
  return (
    <Container title={title}>
      {data ? (
        <>
          <List
            dataSource={data}
            renderItem={(chantier) => (
              <Link
                to={'/chantier/' + chantier.idChantier}
                style={{ display: 'block' }}
              >
                <Space>
                  <span>{chantier.activite}</span>
                  <span>{chantier.dateDebut}</span>
                </Space>
              </Link>
            )}
          />
        </>
      ) : (
        <Empty />
      )}
    </Container>
  );
};
