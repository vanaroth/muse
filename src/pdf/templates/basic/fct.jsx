import React from 'react';
import { Text } from '@react-pdf/renderer';

export const userShow = (contact) => {
  return (
    <Text>
      {contact.nom} {contact.prenom}
    </Text>
  );
};
export const userAdresse = (adresse) => {
  return (
    <Text>
      {adresse.rue} {adresse.complement_adresse} {adresse.code_postal}{' '}
      {adresse.ville}
    </Text>
  );
};
