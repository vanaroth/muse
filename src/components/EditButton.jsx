import React from 'react';
import { useHistory } from 'react-router-dom';
import { ButtonTooltip } from './ButtonTooltip';
import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export const EditButton = ({ url }) => {
  const history = useHistory();
  return (
    <ButtonTooltip title="Modifier" type="link">
      <Button type="link" onClick={() => history.push(url)}>
        <EditOutlined />
      </Button>
    </ButtonTooltip>
  );
};
