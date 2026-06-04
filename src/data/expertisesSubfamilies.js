// Slug-based subfamily configuration for /[family]/[subf]
// Keys + assets only; strings are resolved with next-intl in the page/layout.
export const subfamilyConfigs = {
  // Droit des affaires et des sociétés
  'droit-des-affaires-et-des-societes/creation-et-structuration-dentreprises': {
    heroNavKey: 'expertises.family1.sub1a.title',
    image: '/images/societe.webp',
    contentKey: 'creation-et-structuration',
    itemsKeys: ['item1', 'item2', 'item3'],
  },
  'droit-des-affaires-et-des-societes/redaction-et-securisation-des-contrats-commerciaux': {
    heroNavKey: 'expertises.family1.sub1b.title',
    image: '/images/droit-commercial.webp',
    contentKey: 'contrats-commerciaux',
    itemsKeys: ['item1', 'item2', 'item3', 'item4'],
  },
  'droit-des-affaires-et-des-societes/relations-commerciales-internationales': {
    heroNavKey: 'expertises.family1.sub1c.title',
    image: '/images/developpement-strategie.webp',
    contentKey: 'relations-commerciales-internationales',
    itemsKeys: ['item1', 'item2', 'item3'],
  },

  // Droit des étrangers et de la nationalité
  'droit-des-etrangers-et-de-la-nationalite/visas-et-refus-de-visa': {
    heroNavKey: 'expertises.family2.sub2a.title',
    image: '/images/visas-refus-visa.webp',
    contentKey: 'visa',
    itemsKeys: ['item1', 'item2'],
  },
  'droit-des-etrangers-et-de-la-nationalite/regroupement-familial': {
    heroNavKey: 'expertises.family2.sub2b.title',
    image: '/images/regroupement-familial.webp',
    contentKey: 'regroupement-familial',
    itemsKeys: ['item1', 'item2', 'item3'],
  },
  'droit-des-etrangers-et-de-la-nationalite/demandes-dasile-et-recours-cnda': {
    heroNavKey: 'expertises.family2.sub2c.title',
    image: '/images/demande-asile-recours-cnda.webp',
    contentKey: 'demandes-dasile-et-recours-cnda',
    itemsKeys: ['item1', 'item2', 'item3'],
  },
  'droit-des-etrangers-et-de-la-nationalite/titres-de-sejour-et-oqtf': {
    heroNavKey: 'expertises.family2.sub2d.title',
    image: '/images/titres-sejour-oqtf.webp',
    contentKey: 'titres-de-sejour-et-oqtf',
    itemsKeys: ['item1', 'item2', 'item3'],
  },

  // Droit de la fonction publique
  'droit-de-la-fonction-publique/procedures-disciplinaires': {
    heroNavKey: 'expertises.family3.sub3a.title',
    image: '/images/procedures-disciplinaires.webp',
    contentKey: 'procedures-disciplinaires',
    itemsKeys: ['item1', 'item2'],
  },
  'droit-de-la-fonction-publique/harcelement-moral': {
    heroNavKey: 'expertises.family3.sub3b.title',
    image: '/images/harcelement-moral.webp',
    contentKey: 'harcelement-moral',
    itemsKeys: ['item1', 'item2', 'item3'],
  },
  'droit-de-la-fonction-publique/maladie-professionnelle-et-accident-de-service': {
    heroNavKey: 'expertises.family3.sub3c.title',
    image: '/images/maladie-professionnelle-accident.webp',
    contentKey: 'maladie-professionnelle',
    itemsKeys: ['item1', 'item2', 'item3', 'item4'],
  },
};
