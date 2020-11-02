import React from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css';

export const DeclarantTable = ({ data }) => {
  const columns = [
    {
      title: 'Num 1',
      dataIndex: 'num1',
      key: 'num1',
    },
    {
      title: 'Num 2',
      dataIndex: 'num2',
      key: 'num2',
    },
    {
      title: 'Référence avis',
      dataIndex: 'ref_avis',
      key: 'ref_avis',
    },
    {
      title: 'Montant',
      dataIndex: 'montant',
      key: 'montant',
      render: (montant) => <>{montant} €</>,
    },
  ];

  return <Table dataSource={data} columns={columns} />;
};
