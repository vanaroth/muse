/**
 *
 * @param {object} description contient une string avec des %s à remplacer par les valeurs dans data
 * @param {object} data contient les ids des valeurs à récup
 * @param {array} server_data contient les valeurs à récup ( marque, model, acermi ...)
 * @return {string} retourne le texte formaté
 */
const customDescriptionSoufflage = (description, data, server_data) => {
  let { r } = data;
  let idModel = data.model;
  let formated_description = description.description.split('%s');

  const model_resitance = server_data.fourniture_resistance;

  const myModel = model_resitance.filter(
    (e) => e.idModelFourniture === idModel && e.r === r
  )[0];

  const { produit, model, marque, lambda, acermi, nf, ep_avant } = myModel;
  //$poids_total = model_resitance.taux_remplissage_min *  $devis_combles["surface"];
  //$nb_sacs = ceil($poids_total / $fourniture_resistance['poids_sac']);

  const infos = [produit, model, marque, lambda, r, acermi, nf, ep_avant];

  formated_description = formated_description.map((e, k) =>
    infos[k] ? e + infos[k] : e
  );
  const text = formated_description.join('');

  return text;
};
/**
 *
 * @param {number} cible contient une nombre qui représente sa place dans server_data.description
 * @param {object} data contient les ids des valeurs à récup
 * @param {array} server_data contient les valeurs à récup ( marque, model, acermi ...)
 * @return {string} retourne le texte formaté
 */
export const getDescriptionSoufflage = (cible, data, server_data) => {
  const description = Object.assign({}, server_data.description[cible]);

  if (description.format === 'formated' && data !== undefined) {
    console.log(`formated desc auto`);
    // Si on a reçu des données, on complète la description
    console.log(
      'Comparaison: ' +
        Object.is(description, this.props.server_data.description[cible])
    );
    description.description = customDescriptionSoufflage(
      description,
      data,
      this.props.server_data
    );
  }

  return description;
};
const calculPrimeSoufflage = (origine, prime) => {
  return prime.idPrime === 1 ? (origine.idOrigine === 11 ? 10 : 10) : 20;
};
/**
 * La fonction doit Vérifier que toute les données nécéssaire avant de générer un devis
 * génerer un devis en fonction
 * @param {string} typeDevis (soufflage, pb, vmc, induit, ...)
 * @return {object} retourn un objet pouvant être switché avec le state de devis
 */
export const createDevisAuto = (typeDevis, server_data) => {
  console.log(`createDevisAuto: ${typeDevis}`, server_data);
  const ligneBase = {
    description: '',
    quantite: 1,
    idUnite: 11,
    pu: 0,
    tva: 20,
    prime: 0,
    data: 'undefined',
  };

  if (typeDevis === 'soufflage') {
    // TODO Test de présence des données
    const { contact, prime } = server_data.groupeDeclarant[0];
    const { origine } = contact;
    // Start génération du devis

    //Génération de la ligne relative à la laine
    var lignesDevisRaw = [];

    var laine = Object.assign({}, ligneBase);
    laine.data = { model: 1, r: 7 };
    laine.quantite = server_data.combles.surface;
    laine.idUnite = 2;
    laine.tva = 5.5;
    laine.prime = calculPrimeSoufflage(origine, prime);
    laine.pu = comparePuToPrime(laine.pu, laine.tva, laine.prime);

    lignesDevisRaw.push(laine);

    //Ligne Réhausse
    if (server_data.acces_trappe > 0) {
      lignesDevisRaw.push(Object.assign({}, ligneBase));
      lignesDevisRaw[lignesDevisRaw.length - 1].data = 2;

      lignesDevisRaw[lignesDevisRaw.length - 1].quantite =
        server_data.acces_trappe + server_data.nbr_conduit_cheminee;
    }

    //Ligne Localisation conduit
    if (
      server_data.nbr_conduit_cheminee > 0 ||
      server_data.habitation.mode_combustible === '1'
    ) {
      lignesDevisRaw.push(Object.assign({}, ligneBase));
      lignesDevisRaw[lignesDevisRaw.length - 1].data = 3;
      lignesDevisRaw[lignesDevisRaw.length - 1].quantite =
        server_data.nbr_conduit_cheminee > 0
          ? server_data.nbr_conduit_cheminee
          : 1;
    }

    //Maintenant que l'on a paramettré les lignes on va rechercher les descriptifs
    //?TODO Je me demande si je ne devrai pas uniquement transmettre le num de case description vu que je tramsmet server_data
    const lignesDevis = lignesDevisRaw.map((ligne) => {
      if (ligne.data.model !== undefined) {
        ligne.description = customDescriptionSoufflage(
          server_data.description[0],
          ligne.data,
          server_data
        );
      } else {
        ligne.description = server_data.description[ligne.data].description;
      }

      return ligne;
    });

    // On paramètre le top_com
    let top_com = '';
    top_com +=
      server_data.habitation.mode_electrique === '1'
        ? 'Mode de chauffage électrique'
        : 'Mode de chauffage combustible';
    top_com += '\nRéférence: Isolation des combles perdus';

    if (server_data.habitation.plus2ans) {
      top_com += ' -- Habitation de plus de 2 ans';
    }

    //on check le mid com
    const model_resitance = server_data.fourniture_resistance;
    const { taux_remplissage_min, poids_sac } = model_resitance.filter(
      (e) => e.idModelFourniture === laine.data.model && e.r === laine.data.r
    )[0];

    const poids = Math.floor(taux_remplissage_min * laine.quantite);
    const nbr_sac = Math.floor(poids / poids_sac);

    const mid_com = `Le poids de l'isolant mise en œuvre est de ${poids} kg pour ${nbr_sac} sacs de ${poids_sac} kg`;
    return { top_com, lignesDevis, mid_com };
  }
};

export const addMembraneDescription = (server_data, devis) => {
  //if(server_data.combles.membrane >)
  const prix = server_data.prix_descriptif_produit.filter(
    (i) => i.idPrixDescriptifProduit === 22
  )[0];
  console.log('prix', prix);
  const ligneBase = {
    description: server_data.description[1].description,
    quantite: server_data.combles.membrane,
    idUnite: 2,
    pu: prix.prix_ht * (1 + prix.taux_tva / 100),
    tva: prix.taux_tva,
    prime: 0,
    data: 'undefined',
  };
  return { ...devis, lignesDevis: [...devis.lignesDevis, ligneBase] };
};

export const addEnlevementDescription = (server_data, devis) => {
  //if(server_data.combles.elevement !== 'non')
  const { surface } = server_data.combles;

  const prix = server_data.prix_descriptif_produit.filter((i) => {
    if (surface <= 50) {
      return i.idPrixDescriptifProduit === 12;
    } else if (surface > 50 && surface <= 100) {
      return i.idPrixDescriptifProduit === 13;
    }
    return i.idPrixDescriptifProduit === 14;
  })[0];

  console.log('prix', prix);
  const { format_ancien_isolant } = server_data.combles;
  const { description } = server_data;

  const enlevement =
    format_ancien_isolant === 'rouleaux' ? description[4] : description[15];

  const ligneBase = {
    description: enlevement.description,
    quantite: server_data.combles.surface,
    idUnite: 2,
    pu: prix.prix_ht * (1 + prix.taux_tva / 100),
    tva: prix.taux_tva,
    prime: 0,
    data: false,
  };
  return { ...devis, lignesDevis: [...devis.lignesDevis, ligneBase] };
};

export const spotDescription = (server_data, devis) => {
  //if(server_data.combles.elevement !== 'non')

  const prix = server_data.prix_descriptif_produit.filter((i) => (i) =>
    i.idPrixDescriptifProduit === 15
  )[0];

  console.log('prix', prix);
  const { description } = server_data;

  const ligneBase = {
    description: description[12].description,
    quantite: server_data.combles.nbr_spot,
    idUnite: 11,
    pu: prix.prix_ht * (1 + prix.taux_tva / 100),
    tva: prix.taux_tva,
    prime: 0,
    data: false,
  };
  return { ...devis, lignesDevis: [...devis.lignesDevis, ligneBase] };
};

/**
 * Son rôle est de vérifié que pu > ht(prime, tva) sinon on modifie pu
 * @param {float} pu prix unitaire
 * @param {float} tva taux de tva appliqué
 * @param {float} prime le montant ttc de la prime
 * @return {float} valeur de pu (modifier ou non)
 */
const comparePuToPrime = (pu, tva, prime) => {
  let prime_ht = prime / (1 + tva / 100);
  return pu > prime_ht ? pu : prime_ht;
};
