import React from 'react';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

export const PlusButton = ({ setAdd }) => {
  return (
    <div style={{ paddingBottom: 20, textAlign: 'center' }}>
      <Button
        icon={<PlusCircleOutlined />}
        onClick={() =>
          setAdd((p) => [
            ...p,
            {
              descriptif: '',
              quantite: 0,
              unite: '',
              pu: 0,
              tva: 20,
              prime: 0,
            },
          ])
        }
      >
        {' '}
        Ligne
      </Button>
    </div>
  );
};
