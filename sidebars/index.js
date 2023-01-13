/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation
 */

module.exports = {
  mySidebar: [
    {
      type: 'category',
      label: 'Welcome',
      items: [
        {
          type: 'doc',
          id: 'index',
        },
        {
          type: 'doc',
          id: 'welcome/on-nft-mev',
        },
        {
          type: 'doc',
          id: 'welcome/why-pikapool',
        },
        {
          type: 'doc',
          id: 'welcome/current-state',
        },
        {
          type: 'doc',
          id: 'welcome/roadmap',
        },
      ],
    },
    {
      type: 'category',
      label: 'Pokedex',
      link: {
        type: 'generated-index',
        title: 'Welcome to the Pokedex!',
        description: 'The Mint Pokedex is an electronic device created and designed to catalog and provide information regarding the various species of NFT mints featured on the Ethereum blockchain.',
      },
      items: [
        {
          type: 'doc',
          id: 'pokedex/kpr',
        }, {
          type: 'doc',
          id: 'pokedex/otherdeed',
        }, {
          type: 'doc',
          id: 'pokedex/vaynersports-pass',
        },
      ]
    },
    {
      type: 'doc',
      label: 'Pikapool Auctions',
      id: 'auctions',
    },
    {
      type: 'category',
      label: 'For artists',
      items: [
        {
          type: 'doc',
          id: 'artists/benefits',
        },
        {
          type: 'doc',
          id: 'artists/requirements',
        },
      ],
    },
    {
      type: 'category',
      label: 'For minters',
      items: [
        {
          type: 'doc',
          id: 'minters/benefits',
        },
      ],
    },
    {
      type: 'category',
      label: 'For builders',
      items: [
        {
          type: 'doc',
          id: 'builders/overview',
        },
        {
          type: 'doc',
          id: 'builders/grant-minter-role',
        },
        {
          type: 'link',
          label: 'TypeScript SDK',
          href: 'https://github.com/0xPikapool/typescript-sdk',
        },
      ],
    },
  ],

};
