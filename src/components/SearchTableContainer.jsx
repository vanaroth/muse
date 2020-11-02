import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import Title from 'antd/lib/typography/Title';
import 'antd/dist/antd.css';

import Axios from 'axios';
import { Container } from './Container';
import { Scroll } from './Scroll';
import { SearchTable } from './SearchTable';

export const SearchTableContainer = ({ title, columns, urlLoadData }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      try {
        const result = await Axios.get(urlLoadData);
        if (!ignore) {
          setData(result.data.dataResponse);
        }
      } catch (err) {
        message.error(
          'Une erreur est survenue lors du chargement des données !'
        );
      }
    }
    fetchData();
    return () => {
      ignore = true;
    };
  }, [urlLoadData]);

  return (
    <Container style={{ width: 1000, maxWidth: '90vw' }}>
      <Title level={4} style={{ fontSize: '1.2em' }}>
        {title}
      </Title>
      <Scroll>
        <SearchTable columns={columns} dataSource={data} isScroll />
      </Scroll>
    </Container>
  );
};
