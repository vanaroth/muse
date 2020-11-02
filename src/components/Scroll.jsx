import React from 'react';

export const Scroll = ({ children }) => {
  return (
    <div className="scroll" style={{ width: '100%', overflow: 'auto' }}>
      {children}
    </div>
  );
};
