import React, { useState, useEffect } from 'react';
import { Alert, Spin, Empty } from 'antd';
import 'antd/dist/antd.css';
import Axios from 'axios';

export const LoaderData = ({ url, children, setData }) => {
  const [dataIsDownload, setDataIsDownload] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      try {
        const result = await Axios.get(url);
        const { dataResponse } = result.data;

        console.log('dataResponse', dataResponse);

        setDataIsDownload(true);
        if (!ignore) setData(dataResponse);
      } catch (err) {
        console.log('err', err);
        setDataIsDownload(false);
      }
    }
    fetchData();

    return () => {
      ignore = true;
    };
  }, [url, setData]);

  if (dataIsDownload === true) {
    return <>{children}</>;
  } else if (dataIsDownload === false) {
    return (
      <>
        <Empty /> <Alert type="error" message=" Problème de téléchargement " />
      </>
    );
  }
  return <Spin />;
};
