import React from 'react';
import 'antd/dist/antd.css';
import './SiderMenu.css';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import Title from 'antd/lib/typography/Title';
import {
  CheckOutlined,
  DashboardOutlined,
  CalendarOutlined,
  CodeSandboxOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  ContactsOutlined,
  EuroCircleOutlined,
} from '@ant-design/icons';

export const SiderMenu = () => {
  return (
    <div>
      <Title level={3} style={{ color: 'white', padding: '.5em 0' }}>
        IRA
      </Title>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['0']}
        style={{
          overflow: 'auto',
          height: '100vh',
        }}
      >
        <Menu.Item key="0" icon={<DashboardOutlined />}>
          <Link to="/">Tableau de Bord</Link>
        </Menu.Item>
        <Menu.SubMenu
          title="Commerciale"
          key="sub-commerciale"
          icon={<PhoneOutlined />}
        >
          <Menu.Item key="1" icon={<ContactsOutlined />}>
            <Link to="/contact/form">+ Contact</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<ContactsOutlined />}>
            <Link to="/contact">Liste Contacts</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<EnvironmentOutlined />}>
            <Link to="/adresse">Liste Adresses</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<EnvironmentOutlined />}>
            <Link to="/opportunite">Liste Opportunitées</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<EnvironmentOutlined />}>
            <Link to="/devis">Liste Devis</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<EnvironmentOutlined />}>
            <Link to="/facture">Liste Factures</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          title="Planification"
          key="sub-planification"
          icon={<CalendarOutlined />}
        >
          <Menu.Item key="7">
            <Link to="/chantier/form">+ Chantier</Link>
          </Menu.Item>
          <Menu.Item key="8">
            <Link to="/tournee/form">+ Tournée</Link>
          </Menu.Item>
          <Menu.Item key="9">
            <Link to="/chantier">Liste Chantiers</Link>
          </Menu.Item>
          <Menu.Item key="10">
            <Link to="/tournee">Liste Tournées</Link>
          </Menu.Item>
          <Menu.Item key="11">
            <Link to="/litigeartisan">Liste Litiges Artisans</Link>
          </Menu.Item>
          <Menu.Item key="12" icon={<CalendarOutlined />}>
            <Link to="/replanfication">Replanfication</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          title="Stock"
          key="sub-stock"
          icon={<CodeSandboxOutlined />}
        >
          <Menu.Item key="13" icon={<CodeSandboxOutlined />}>
            <Link to="/stock">Stock</Link>
          </Menu.Item>
          <Menu.Item key="14">
            <Link to="/reservation/form">+ Résa</Link>
          </Menu.Item>
          <Menu.Item key="15">
            <Link to="/produit/form">+ Produit</Link>
          </Menu.Item>
          <Menu.Item key="16">
            <Link to="/mouvement/form">+ Mouvement</Link>
          </Menu.Item>
          <Menu.Item key="17">
            <Link to="/reservation">Liste Résa</Link>
          </Menu.Item>
          <Menu.Item key="18">
            <Link to="/mouvement">Liste Mouvements</Link>
          </Menu.Item>
          <Menu.Item key="19">
            <Link to="/produit">Liste Produits</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          title="Commande"
          key="sub-commande"
          icon={<EuroCircleOutlined />}
        >
          <Menu.Item key="20">
            <Link to="/acommander">Liste des produits à Commander</Link>
          </Menu.Item>
          <Menu.Item key="21">
            <Link to="/bdc/form">+ BDC</Link>
          </Menu.Item>
          <Menu.Item key="22">
            <Link to="/bdc">Liste BDC</Link>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="23">
            <Link to="/fournisseur/form">+ Fournisseur</Link>
          </Menu.Item>
          <Menu.Item key="24">
            <Link to="/fournisseur">Liste des Fournisseurs</Link>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="25">
            <Link to="/prix/form">+ Prix</Link>
          </Menu.Item>
          <Menu.Item key="26">
            <Link to="/prix">Liste des Prix</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Divider />
        <Menu.Item key="27" icon={<CheckOutlined />}>
          <Link to="/tache/form">+ Tâche</Link>
        </Menu.Item>
        <Menu.Item key="28" icon={<CheckOutlined />}>
          <Link to="/tache/">Liste des Tâches</Link>
        </Menu.Item>
        <Menu.Item key="29" icon={<CalendarOutlined />}>
          <Link to="/message/form">Mon Calendrier</Link>
        </Menu.Item>
        <Menu.Item
          key="30"
          style={{
            backgroundColor: 'transparent',
            textAlign: 'center',
          }}
        >
          {' '}
          Version 0.03.3
        </Menu.Item>
      </Menu>
    </div>
  );
};
