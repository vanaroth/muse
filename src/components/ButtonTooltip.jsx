import React from 'react';
import { Button, Tooltip } from 'antd';
import 'antd/dist/antd.css';
import '../App.css';

export const ButtonTooltip = ({ title, children, ...props }) => {
  return (
    <Tooltip title={title}>
      <Button {...props}>{children}</Button>
    </Tooltip>
  );
};
