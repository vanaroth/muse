import React from 'react';
import Title from 'antd/lib/typography/Title';

export const Container = ({ title, children, ...props }) => (
  <div className="container" {...props}>
    <Title level={4} style={{ fontSize: '1.2em' }}>
      {title}
    </Title>
    {children}
  </div>
);
