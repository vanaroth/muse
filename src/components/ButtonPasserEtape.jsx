import React from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

export const ButtonPasserEtape = ({ isShow, url }) => {
  const history = useHistory();

  return isShow ? (
    <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1em' }}>
      <Button onClick={() => history.push(url)}>Passer Etape {'>'}</Button>
    </div>
  ) : null;
};
