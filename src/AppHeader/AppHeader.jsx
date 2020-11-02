import React, { useState } from 'react';
import { Layout, Input, Row, Col, Dropdown, Badge, Menu, Select } from 'antd';
import 'antd/dist/antd.css';
import { Link, useHistory } from 'react-router-dom';

import {
  NotificationOutlined,
  MessageOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

const { Header } = Layout;
const { Option } = Select;
const notificationsList = [
  {
    text: `Une nouvelle opportunité viens d'être créer c'est parti !`,
    lien: 'opportunite/105',
  },
  { text: `Un truc viens d'être ajouté allez voir ça !`, lien: 'truc/10' },
];
const messagesList = [
  {
    objet: 'Cmd pomme',
    text: `Bonjour Wyves, je voulais savoir si tu avais pus commander zef zef qzef qzef qzef zqef qzef zeqfzqef zqef  wyves erg erge erg erg magasinier zef zef zef`,
    lien: 'message/502',
    editeur: '@valérie',
    destinataire: '@wyves',
    copie: ['@christophe'],
  },
];

export const AppHeader = () => {
  const [categorie, setCategorie] = useState('tous');
  const history = useHistory();
  const badgeNotification = 2;
  const badgeMessage = 5;
  return (
    <Header
      className="header"
      style={{
        overflow: 'auto',
        minWidth: '100px',
        padding: 0,
      }}
    >
      <Row justify="space-around">
        <Col span={14}>
          <Row gutter={8}>
            <Col span={13}>
              <Input.Search
                placeholder="Recherche"
                onSearch={(value) => {
                  const location = {
                    pathname: '/recherche',
                    state: { fromDashboard: true },
                    search: '?q=' + value + '&' + categorie,
                  };
                  history.push(location);
                }}
              />
            </Col>
            <Col span={8}>
              <Select
                defaultValue="tous"
                style={{ minWidth: 80 }}
                onChange={(value) => setCategorie(value)}
              >
                <Option value="tous">Tous</Option>
                <Option value="contact">Contact</Option>
                <Option value="adresse">Adresse</Option>
                <Option value="stock">Stock</Option>
                <Option value="devis">Devis</Option>
                <Option value="chantier">Chantier</Option>
              </Select>
            </Col>
          </Row>
        </Col>
        <Col span={9}>
          <Row justify="end" gutter={16}>
            <Col>
              <Dropdown overlay={menuNotification({ list: notificationsList })}>
                <Badge count={badgeNotification}>
                  <NotificationOutlined style={{ fontSize: '2em' }} />
                </Badge>
              </Dropdown>
            </Col>
            <Col>
              <Dropdown overlay={menuMessage({ list: messagesList })}>
                <Badge count={badgeMessage}>
                  <MessageOutlined style={{ fontSize: '2em' }} />
                </Badge>
              </Dropdown>
            </Col>
            <Col>
              <Dropdown overlay={menuUser}>
                <UserOutlined style={{ fontSize: '2em' }} />
              </Dropdown>
            </Col>
          </Row>
        </Col>
      </Row>
    </Header>
  );
};

const menuNotification = ({ list }) => {
  return (
    <Menu>
      {list.map((item, k) => (
        <Menu.Item key={k}>
          <Link to={item.lien}>{item.text}</Link>
        </Menu.Item>
      ))}
      <Menu.Item key="tous">
        <Link to="/notification">Tous</Link>
      </Menu.Item>
    </Menu>
  );
};

const menuMessage = ({ list }) => {
  return (
    <Menu style={{ maxWidth: 350 }}>
      {list.map((item, k) => (
        <Menu.Item key={k} style={{ overflow: 'auto' }}>
          <Link to={item.lien}>
            <>
              <b>{item.objet}</b>
              <p>
                {item.text.length > 200
                  ? item.text.slice(0, 200) + ' ...'
                  : item.text}
              </p>
              <p>
                <b>De</b> {item.editeur} <b>Pour</b> : {item.destinataire}
              </p>
            </>
          </Link>
        </Menu.Item>
      ))}
      <Menu.Item key="tous">
        <Link to="/message">Tous ({list.length})</Link>
      </Menu.Item>
    </Menu>
  );
};

const menuUser = (
  <Menu>
    <Menu.Item key="1">
      <Link to="/user">Profil</Link>
    </Menu.Item>
    <Menu.Item key="2">
      <Link to="/tache">Tâches</Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item
      key="signout"
      icon={<LogoutOutlined />}
      style={{ backgroundColor: 'tomato' }}
    >
      <Link to="/signout">Signout</Link>
    </Menu.Item>
  </Menu>
);
