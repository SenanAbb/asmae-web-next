// Slug-based item configuration for leaf pages under /[family]/[subf]/[item]
// Store only keys and static assets; actual strings are resolved using next-intl in the page

export const itemConfigs = {
  // Société
  'droit-des-affaires-et-des-societes/societes/creations-et-rachat-dentreprise': {
    heroNavKey: 'expertises.family1.sub1a.item1',
    image: '/images/placeholder.webp',
    contentKey: 'creations-et-rachat',
    itemsKeys: ['item1', 'item2', 'item3'],
  },
  'droit-des-affaires-et-des-societes/societes/vie-de-lentreprise': {
    heroNavKey: 'expertises.family1.sub1a.item2',
    image: '/images/placeholder.webp',
    contentKey: 'vie-de-lentreprise',
    itemsKeys: ['item1', 'item2', 'item3'],
  },
  'droit-des-affaires-et-des-societes/societes/cession-et-transmission-dentreprise': {
    heroNavKey: 'expertises.family1.sub1a.item3',
    image: '/images/placeholder.webp',
    contentKey: 'cession-et-transmission',
    itemsKeys: ['item1', 'item2', 'item3'],
  },

  // Contrat
  'droit-des-affaires-et-des-societes/contrats/conditions-generales-de-vente': {
    heroNavKey: 'expertises.family1.sub1b.item1',
    image: '/images/placeholder.webp',
    contentKey: 'conditions-generales-de-vente',
    itemsKeys: ['item1', 'item2', 'item3'],
  },
  'droit-des-affaires-et-des-societes/contrats/mandat-de-vente-location': {
    heroNavKey: 'expertises.family1.sub1b.item2',
    image: '/images/placeholder.webp',
    contentKey: 'mandat-de-vente-location',
    itemsKeys: ['item1', 'item2', 'item3'],
  },
  'droit-des-affaires-et-des-societes/contrats/baux-commerciaux': {
    heroNavKey: 'expertises.family1.sub1b.item3',
    image: '/images/placeholder.webp',
    contentKey: 'baux-commerciaux',
    itemsKeys: ['item1', 'item2', 'item3'],
  },

  // Commercial
  'droit-des-affaires-et-des-societes/commercial/relations-clients-fournisseurs': {
    heroNavKey: 'expertises.family1.sub1c.item1',
    image: '/images/placeholder.webp',
    contentKey: 'relations-clients',
    itemsKeys: ['item1', 'item2'],
  },
  'droit-des-affaires-et-des-societes/commercial/relations-avec-les-tiers': {
    heroNavKey: 'expertises.family1.sub1c.item2',
    image: '/images/placeholder.webp',
    contentKey: 'relations-avec-les-tiers',
    itemsKeys: ['item1', 'item2'],
  },
};
