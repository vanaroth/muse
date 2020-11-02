import { Text } from '@react-pdf/renderer';
import React from 'react';
import { Ligne } from '../basic/Ligne';

export const Item = ({ children, textSyle, ...props }) => {
  return (
    <Ligne {...props}>
      <Text style={textSyle}>• {children}</Text>
    </Ligne>
  );
};
