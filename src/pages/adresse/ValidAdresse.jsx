import React, { useState, useEffect } from 'react';
import { AutoComplete } from 'antd';

export const ValidAdresse = () => {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);
  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      try {
        const result = await Axios({
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
          method: 'get',
          url: 'https://api-adresse.data.gouv.fr/search/?q=' + value,
        });
        if (!ignore) setOptions(result.data.dataResponse.adresse_details);
      } catch (err) {
        message.error('Problème de connexion au server');
      }
    }
    fetchData();
    return () => {
      ignore = true;
    };
  }, [value]);
  return (
    <AutoComplete
      options={options}
      style={{
        width: 200,
      }}
      onSearch={(value) => console.log('search', value)}
      placeholder="Rue"
    />
  );
};
