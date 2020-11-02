import React from 'react';

import { Descriptions } from 'antd';
import { EmptyAddButton } from '../../components/EmptyAddButton';
import { Container } from '../../components/Container';
import { Scroll } from '../../components/Scroll';
import DescriptionsItem from 'antd/lib/descriptions/Item';
import { EditButton } from '../../components/EditButton';
export const HabitationDescription = ({ listeItems, ancestorID }) => {
  console.log('HabitationDescription listeItems', listeItems);

  const { idHabitation, idMaison, descriptif, ...restItems } = listeItems;
  const filterItems = Object.entries(restItems).filter(
    (f) => f[1] !== '' && f[1] !== 0
  );

  return (
    <Container title="Caractéristique Habitation">
      {filterItems.length > 0 ? (
        <Scroll>
          <Descriptions
            bordered
            size="small"
            extra={<EditButton url={`/habitation/form/${idHabitation}`} />}
          >
            {filterItems.map(([cle, val]) => (
              <DescriptionsItem label={cle.toUpperCase()}>
                {val === 1 ? 'Oui' : val}
              </DescriptionsItem>
            ))}
          </Descriptions>
        </Scroll>
      ) : (
        <EmptyAddButton
          pathname="/habitation/form"
          typeAncestor="adresse"
          ancestorID={ancestorID}
        />
      )}
    </Container>
  );
};
