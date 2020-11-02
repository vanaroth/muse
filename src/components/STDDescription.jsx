import React from 'react';

import { Descriptions } from 'antd';
import { EmptyAddButton } from './EmptyAddButton';
import { Container } from './Container';
import { Scroll } from './Scroll';
import DescriptionsItem from 'antd/lib/descriptions/Item';
import { EditButton } from './EditButton';

export const STDDescription = ({
  listeItems,
  typeAncestor,
  ancestorID,
  title,
  baseURL,
  ID,
}) => {
  console.log(title, listeItems);
  const filterItems = listeItems ? Object.entries(listeItems) : [];
  console.log(title, filterItems);
  return (
    <Container title={title}>
      {filterItems.length > 0 ? (
        <Scroll>
          <Descriptions
            bordered
            size="small"
            extra={<EditButton url={`/${baseURL}/form/${ID}`} />}
          >
            {filterItems.map(([cle, val]) => (
              <DescriptionsItem label={cle.toUpperCase()}>
                {val}
              </DescriptionsItem>
            ))}
          </Descriptions>
        </Scroll>
      ) : (
        <EmptyAddButton
          pathname={`/${baseURL}/form`}
          typeAncestor={typeAncestor}
          ancestorID={ancestorID}
        />
      )}
    </Container>
  );
};
