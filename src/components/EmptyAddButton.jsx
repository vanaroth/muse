import React from 'react';
import { Empty, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

export const EmptyAddButton = ({ pathname, ancestorID, typeAncestor }) => {
  const history = useHistory();
  return (
    <>
      <Empty />
      <div style={{ textAlign: 'center' }}>
        <Button
          type="primary"
          onClick={() =>
            history.push({
              pathname,
              data: { ancestor: { type: typeAncestor, id: ancestorID } },
            })
          }
          icon={<PlusOutlined />}
        ></Button>
      </div>
    </>
  );
};
