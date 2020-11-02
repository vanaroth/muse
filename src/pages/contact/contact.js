const chantierModel = {
  id,
  duree: { nbrJours: 0, listeInterventions: [] },
  statut: '',
  acompte: 0,
};
const factureModel = { id, num, data: {}, statut: '', acompte: 0 };
const devisModel = { ...factureModel, chantier: [], factures: [] };

const fiscaliteModel = {
  bonus: 'classique',
  nbrPersones: 3,
  revenusTotal: 50505,
  declarants: [
    { num: 'dsdgsfdfs', num2: 'dgdfg', avis: 'dgfgfgdfg', revenu: 49000 },
    { num: 'rergerger', num2: '', avis: 'zfze ef zef ', revenu: 1505 },
  ],
};

const opportuniteModel = {
  code: '',
  origine: 'conaissance',
  complement_origine: '#125_paul_denis',
  type: 'combles',
  produits: [{ nom: 'LDR', quantite: '100', unite: 'm2' }],
  statut: 'validé',
  creation: '01/01/2021',
  maj: '12/12/2021',
  data: {
    combles: {
      surfaces: 100,
      ancienneIsolant: 'ldv',
      nouvelleIsolant: 'ldr',
    },
  },
};

const adresseModel = {
  rue: 'numero rue machin ',
  complement: 'un complement',
  ville: 'Ville',
  codePostal: '01100',
  principale: true,
  opportunites: [{ ...opportuniteModel }],
  devis: [{ ...devisModel }],
};

export const contact = {
  genre: 'm',
  nom: 'NOM',
  prenom: 'Prenom',
  tel: '0600000000',
  email: 'email@service.pays',
  links: {
    fiscalite: { ...fiscaliteModel },
    adresses: [{ ...adresseModel }],
  },
};
