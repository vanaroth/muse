import React, { useState, useEffect } from 'react';
import { Alert, Spin, Empty } from 'antd';
import 'antd/dist/antd.css';
import Axios from 'axios';
import { useLoadApiData } from '../hooks/useLoadApiData';

export const LoaderData = ({ url, children, setData }) => {
  const dataIsDownload = useLoadApiData(url, setData);
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
