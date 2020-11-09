import React from 'react';
import { Alert, Spin, Empty } from 'antd';
import 'antd/dist/antd.css';
import { useLoadApiData } from '../hooks/useLoadApiData';
import { makeUrl } from '../pages/devis/functions/makeUrl';

export const LoaderData = ({ url, children, setData }) => {
  const dataIsDownload = useLoadApiData(makeUrl(url), setData);
  return dataIsDownload === null ? (
    <Spin />
  ) : dataIsDownload === true ? (
    <>{children}</>
  ) : (
    <>
      <Empty /> <Alert type="error" message=" Problème de téléchargement " />
    </>
  );
};
