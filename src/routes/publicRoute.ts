const publicRoute = {
  home: {
    path: '/',
    name: 'Home',
  },
  create: {
    path: '/mint/nft',
    name: 'Create NFT',
  },
  profile: {
    path: '/profile',
    name: 'Profile',
  },
  itemView: {
    path: '/items/[id]',
    url: (id: string) => `/items/${id}`,
    name: 'Item Details',
  },
  discover: {
    path: '/discover',
    name: 'Discover',
  },
};

export default publicRoute;
