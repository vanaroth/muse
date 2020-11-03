import React from 'react';
import { Result } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
import { Switch } from 'react-router-dom';
import { Home } from './pages/home/Home';
import { ContactDetails } from './pages/contact/ContactDetails';
import { ContactTable } from './pages/contact/ContactTable';
import { AdresseTable } from './pages/adresse/AdresseTable';
import { PrivateRoute } from './PrivateRoute';
import { ContactForm } from './pages/contact/ContactForm';
import { DevisLogic } from './pages/devis/DevisForm';
import { Recherche } from './pages/recherche/Recherche';
import { FiscaliteForm } from './pages/fiscalite/FiscaliteForm';
import { OpportuniteTable } from './pages/opportunite/OpportuniteTable';
import { OpportuniteForm } from './pages/opportunite/OpportuniteForm';
import { PDFLoader } from './pdf/PDFLoader';
import { AdresseDetails } from './pages/adresse/AdresseDetails';
import { AdresseForm } from './pages/adresse/AdresseForm';
import { HabitationFrom } from './pages/habitation/HabitationForm';
import { PlancherBasForm } from './pages/plancherBas/PlancherBasForm';
import { MursForm } from './pages/murs/MursForm';
import { SousrampantsForm } from './pages/sousrampants/SousrampantsForm';
import { CheminDeVieForm } from './pages/cheminDeVie/CheminDeVieForm';
import { VMCForm } from './pages/vmc/VMCForm';
import { AuditForm } from './pages/audit/AuditForm';
import { ComblesForm } from './pages/combles/ComblesForm';
import { SimpleForm } from './pages/SimpleForm';
import { GenererDevis } from './pages/devis/GenererDevis';
import { BDCForm } from './pages/bdc/BDCForm';
import { Stock } from './pages/stock/Stock';
import { Chantier } from './pages/chantier/Chantier';

export const SwitchPrincipal = ({ authorisation }) => (
  <Switch>
    <PrivateRoute
      exact
      path="/"
      children={<Home />}
      authorisation={authorisation}
    />
    <PrivateRoute
      exact
      path="/simple/form/:id?"
      children={<SimpleForm />}
      authorisation={authorisation}
    />
    <PrivateRoute
      exact
      path="/contact/"
      children={<ContactTable />}
      authorisation={authorisation}
    />
    <PrivateRoute
      exact
      path="/contact/form/:id?"
      children={<ContactForm />}
      authorisation={authorisation}
    />
    <PrivateRoute
      exact
      path="/contact/:id"
      children={<ContactDetails />}
      authorisation={authorisation}
    />

    <PrivateRoute
      exact
      path="/fiscalite/form/:id?"
      children={<FiscaliteForm />}
      authorisation={authorisation}
    />

    <PrivateRoute
      exact
      path="/adresse/"
      children={<AdresseTable />}
      authorisation={authorisation}
    />
    <PrivateRoute
      path="/adresse/form/:id?"
      children={<AdresseForm />}
      authorisation={authorisation}
    />
    <PrivateRoute
      path="/adresse/:id"
      children={<AdresseDetails />}
      authorisation={authorisation}
    />
    <PrivateRoute
      exact
      path="/opportunite/"
      children={<OpportuniteTable />}
      authorisation={authorisation}
    />
    <PrivateRoute
      path="/opportunite/form/:id?"
      children={<OpportuniteForm />}
      authorisation={authorisation}
    />
    <PrivateRoute
      path="/habitation/form/:id?"
      children={<HabitationFrom />}
      authorisation={authorisation}
    />
    <PrivateRoute
      exact
      path="/plancherbas/form/:id?"
      children={<PlancherBasForm />}
      authorisation={authorisation}
    />
    <PrivateRoute
      exact
      path="/murs/form/:id?"
      children={<MursForm />}
      authorisation={authorisation}
    />
    <PrivateRoute
      exact
      path="/sousrampants/form/:id?"
      children={<SousrampantsForm />}
      authorisation={authorisation}
    />
    <PrivateRoute
      exact
      path="/chemindevieForm/form/:id?"
      children={<CheminDeVieForm />}
      authorisation={authorisation}
    />
    <PrivateRoute
      exact
      path="/vmc/form/:id?"
      children={<VMCForm />}
      authorisation={authorisation}
    />
    <PrivateRoute
      exact
      path="/audit/form/:id?"
      children={<AuditForm />}
      authorisation={authorisation}
    />
    <PrivateRoute
      exact
      path="/combles/form/:id?"
      children={<ComblesForm />}
      authorisation={authorisation}
    />
    <PrivateRoute
      exact
      path="/devis/form/:id?"
      children={<DevisLogic />}
      authorisation={authorisation}
    />
    <PrivateRoute
      exact
      path="/devis/generer/:id?"
      children={<GenererDevis />}
      authorisation={authorisation}
    />
    <PrivateRoute
      path="/recherche/"
      children={<Recherche />}
      authorisation={authorisation}
    />
    <PrivateRoute
      path="/bdc/form"
      children={<BDCForm />}
      authorisation={authorisation}
    />
    <PrivateRoute
      path="/pdf/:pdf"
      children={<PDFLoader />}
      authorisation={authorisation}
    />
    <PrivateRoute
      path="/stock/:mode?"
      children={<Stock />}
      authorisation={authorisation}
    />
    <PrivateRoute
      path="/chantiers/:id"
      children={<Chantier />}
      authorisation={authorisation}
    />
    <PrivateRoute
      path="*"
      children={<Result status="404" />}
      authorisation={authorisation}
    />
  </Switch>
);
