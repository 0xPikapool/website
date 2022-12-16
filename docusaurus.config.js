// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Pikapool',
  tagline: "yo so it's like a, the nft mempool",
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/pikapool-sm.png',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'pikapool', // Usually your GitHub org/user name.
  projectName: 'pikapool-website', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'Pikapool',
        logo: {
          alt: 'Pikapool',
          src: 'img/pikapool.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'get_started',
            position: 'left',
            label: 'Get Started ❓',
          },
          {
            type: 'doc',
            docId: 'pichu',
            position: 'left',
            label: 'Pichu ✨',
          },
          {
            type: 'doc',
            docId: 'pikachu',
            position: 'left',
            label: 'Pikachu ⚡',
          },
          {
            type: 'doc',
            docId: 'raichu',
            position: 'left',
            label: 'Raichu 💥',
          },
          { to: '/blog', label: 'Blog 🖍️', position: 'left' },
          {
            href: 'https://github.com/pikapool-eth',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Get Started',
                to: '/docs/get_started',
              },
              {
                label: 'Pichu',
                to: '/docs/pichu',
              },
              {
                label: 'Pikachu',
                to: '/docs/pikachu',
              },
              {
                label: 'Raichu',
                to: '/docs/raichu',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.com/',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/0xpikapool',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/pikapool-eth',
              },
            ],
          },
        ],
        copyright: `Made with ❤️ by the Pikapool team`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
