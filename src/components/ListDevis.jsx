import React from 'react';
import { List, Empty } from 'antd';
import 'antd/dist/antd.css';
import { PrinterOutlined } from '@ant-design/icons';
import { Container } from './Container';

export const ListeDevis = ({ data }) => {
  return (
    <Container title="Liste des devis">
      {data ? (
        <>
          <List
            dataSource={[data]}
            renderItem={(devis) => (
              <a
                href={
                  'http://ira.nextsetp.ovh/api/devis/print?id=' + devis.idDevis
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <PrinterOutlined />
                Imprimer le devis
              </a>
            )}
          />
        </>
      ) : (
        <Empty />
      )}
    </Container>
  );
};
