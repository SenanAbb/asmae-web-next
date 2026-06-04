// Mother-page (PAGE MÈRE) configuration for /[family]
// contentKey resolves under expertises.meres.<slug>; children drive the sous-page cards.
export const familyConfigs = {
  'droit-des-affaires-et-des-societes': {
    contentKey: 'droit-des-affaires-et-des-societes',
    image: '/images/societe.webp',
    children: [
      'droit-des-affaires-et-des-societes/creation-et-structuration-dentreprises',
      'droit-des-affaires-et-des-societes/redaction-et-securisation-des-contrats-commerciaux',
      'droit-des-affaires-et-des-societes/relations-commerciales-internationales',
    ],
  },
  'droit-des-etrangers-et-de-la-nationalite': {
    contentKey: 'droit-des-etrangers-et-de-la-nationalite',
    image: '/images/etrangers.webp',
    children: [
      'droit-des-etrangers-et-de-la-nationalite/visas-et-refus-de-visa',
      'droit-des-etrangers-et-de-la-nationalite/regroupement-familial',
      'droit-des-etrangers-et-de-la-nationalite/demandes-dasile-et-recours-cnda',
      'droit-des-etrangers-et-de-la-nationalite/titres-de-sejour-et-oqtf',
    ],
  },
  'droit-de-la-fonction-publique': {
    contentKey: 'droit-de-la-fonction-publique',
    image: '/images/publique.webp',
    children: [
      'droit-de-la-fonction-publique/procedures-disciplinaires',
      'droit-de-la-fonction-publique/harcelement-moral',
      'droit-de-la-fonction-publique/maladie-professionnelle-et-accident-de-service',
    ],
  },
};
