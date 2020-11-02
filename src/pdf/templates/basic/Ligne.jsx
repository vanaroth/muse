import React from 'react';
import { View } from '@react-pdf/renderer';

export const Ligne = ({ style, children }) => {
  const myStyle = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: '5pt',
  };
  return <View style={{ ...myStyle, ...style }}>{children}</View>;
};
