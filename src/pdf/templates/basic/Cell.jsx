import React from 'react';
import { Text, View } from '@react-pdf/renderer';

export const Cell = ({ children, ...props }) => {
  const myStyle = { position: 'absolute', top: 0, left: 0 };
  props.style = { ...myStyle, ...props.style };
  return (
    <View {...props}>
      <Text>{children}</Text>
    </View>
  );
};
