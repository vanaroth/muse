import React from 'react';
import { Card, Row, Col, Table, Descriptions } from 'antd';

export const UContainer = ({ data }) => {
  return (
    <Row gutter={[16, 8]} style={{ padding: '.8em' }}>
      {data.map((item, k) => (
        <Col>
          <Card title={item.titre || ''}>
            {item.headers !== undefined ? (
              <UTable data={item.list} headers={item.headers} />
            ) : item.list !== undefined ? (
              <>
                {item.list.map((y, ke) => (
                  <UDescriptions data={y} key={ke} />
                ))}
              </>
            ) : (
              '0'
            )}
          </Card>
        </Col>
      ))}
    </Row>
  );
};

const UTable = ({ data, headers }) => {
  const formatedData = data.map((el, k) => ({ ...el, key: k }));
  return <Table dataSource={formatedData} columns={headers} />;
};

const UDescriptions = ({ data }) => {
  return (
    <Descriptions>
      {Object.entries(data).map(([cle, valeur], k) => (
        <Descriptions.Item label={cle}>{valeur}</Descriptions.Item>
      ))}
    </Descriptions>
  );
};
