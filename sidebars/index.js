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
          id: 'welcome/why-pikapool',
        },
        {
          type: 'doc',
          id: 'welcome/roadmap',
        },
      ],
    },
    {
      type: 'category',
      label: 'NFT Mint Graveyard',
      items: [
        {
          type: 'doc',
          id: 'graveyard/pokedex',
        },
      ],
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
          type: 'doc',
          id: 'builders/typescript-sdk',
        },
        {
          type: 'doc',
          id: 'builders/react-demo',
        },
        {
          type: 'doc',
          id: 'builders/rpc',
        },
      ],
    },
  ],

};
