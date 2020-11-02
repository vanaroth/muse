import React from 'react';
import { View } from '@react-pdf/renderer';

export const Zone = ({ style, children }) => {
  const zoneBaseStyle = {
    position: 'absolute',
    left: 0,
    top: 0,

    fontSize: 9,
    width: 200,
    height: 90,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
  };
  return <View style={{ ...zoneBaseStyle, ...style }}>{children}</View>;
};
