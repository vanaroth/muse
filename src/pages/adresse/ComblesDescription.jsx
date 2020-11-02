import React from 'react';

import { STDDescription } from '../../components/STDDescription';

export const ComblesDescription = ({ listeItems, ancestorID }) => {
  const { idCombles, idMaison, descriptif, ...restItems } = listeItems;
  console.log('ComblesDescription', listeItems, restItems);

  return (
    <STDDescription
      listeItems={restItems}
      {...{ ancestorID }}
      typeAncestor="adresse"
      title="Combles"
      baseURL="combles"
      ID={idCombles}
    />
  );
};
