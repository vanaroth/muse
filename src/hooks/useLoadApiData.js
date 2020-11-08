import React, { useState, useEffect } from 'react';
import { Alert, Spin, Empty } from 'antd';
import 'antd/dist/antd.css';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

export const useLoadApiData = (url, setData) => {
  const [dataIsDownload, setDataIsDownload] = useState(null);
  const history = useHistory();

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      try {
        const result = await Axios.get(url);
        const { dataResponse, isLogin } = result.data;
        if (isLogin === false) history.push('/signout');

        console.log('dataResponse', dataResponse);
        setDataIsDownload(true);

        if (!ignore) setData(dataResponse);
      } catch (err) {
        console.log('err', url + '=>  ' + err);
        setDataIsDownload(false);
      }
    }
    fetchData();

    return () => {
      ignore = true;
    };
  }, [url, setData]);

  return dataIsDownload;
};
