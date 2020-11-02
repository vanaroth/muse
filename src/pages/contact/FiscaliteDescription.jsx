import React from 'react';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import '../../App.css';
import { Container } from '../../components/Container';
import { EditOutlined } from '@ant-design/icons';
import { ButtonTooltip } from '../../components/ButtonTooltip';
import { EmptyAddButton } from '../../components/EmptyAddButton';
import { DeclarantTable } from './DeclarantTable';

export const FiscaliteDescription = ({ data, history, ancestorID }) => {
  return (
    <Container title="Fiscalité">
      {data ? (
        <>
          <Row justify="space-between" align="center">
            <Col>
              <b>Bonus:</b> {data.bonus}
            </Col>

            <Col>
              <b>Nombre d'habitant:</b> {data.nbrHabitant}
            </Col>
            <Col>
              <ButtonTooltip
                title="Modifier"
                type="link"
                onClick={() =>
                  history.push('/fiscalite/form/' + data.fiscaliteID)
                }
              >
                <EditOutlined />
              </ButtonTooltip>
            </Col>
          </Row>
          {data.declarants && <DeclarantTable data={data.declarants} />}
        </>
      ) : (
        <EmptyAddButton
          pathname="/fiscalite/form"
          typeAncestor="contact"
          ancestorID={ancestorID}
        />
      )}
    </Container>
  );
};
