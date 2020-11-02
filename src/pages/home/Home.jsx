import React from 'react';
import { Row, Col, Card, Timeline, Tag, Divider, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import '../../App.css';

import { ClockCircleOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

export function Home() {
  const location = useLocation();
  console.log('Home location', location);

  const taches = [
    {
      lable: 'Faire le Logiciel IRA',
      limite: Date.now(),
      tags: [{ categorie: 'contact', data: [{ idContact: 5, nom: 'Test' }] }],
    },
    {
      lable: 'tester le Logiciel IRA',
      limite: new Date('2005-05-01 20:55:48'),
      tags: [{ categorie: 'contact', data: [{ idContact: 5, nom: 'Test' }] }],
    },
    {
      lable: 'Formation Logiciel IRA',
      limite: Date.now(),
      tags: [{ categorie: 'contact', data: [{ idContact: 5, nom: 'Test' }] }],
    },
    {
      lable: 'Corriger le Logiciel IRA',
      limite: Date.now(),
      tags: [{ categorie: 'contact', data: [{ idContact: 5, nom: 'Test' }] }],
    },
  ];
  console.log(taches);
  return (
    <>
      <Divider>Tableau de Bord</Divider>
      <Row gutter={[16, 8]} justify="center">
        <Col>
          <Card
            title="Tâches du jour"
            extra={<span>7 à faire</span>}
            style={{ minWidth: 300 }}
          >
            {taches.map((tache) => (
              <div>
                <Checkbox value={taches.etat} /> {tache.lable}
                <div style={{ paddingLeft: 15, color: 'tomato' }}>
                  <ClockCircleOutlined /> {new Date(tache.limite).getHours()}H
                  {new Date(tache.limite).getMinutes()}
                </div>
              </div>
            ))}
          </Card>
        </Col>
        <Col>
          <Card title="Notifiactions" extra={<span>3 non lu</span>}>
            <Timeline>
              <Timeline.Item color="green">
                Nouvelle résa <Tag>Equipe 2</Tag>
              </Timeline.Item>
              <Timeline.Item>
                Faire liste des urgences de la semaine
              </Timeline.Item>
              <Timeline.Item color="red">
                Erreur Logiciel Signalé par <Tag>Caroline</Tag>
              </Timeline.Item>
              <Timeline.Item color="gray">
                Faire liste des urgences visiuels
              </Timeline.Item>
            </Timeline>
          </Card>
        </Col>
      </Row>
    </>
  );
}
