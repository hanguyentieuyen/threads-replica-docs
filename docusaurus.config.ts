import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Threads Replica Docs',
  tagline: 'Public technical documentation for a private full-stack social platform',
  favicon: 'img/threads-app-icon.png',

  url: 'https://hanguyentieuyen.github.io',
  baseUrl: '/threads-replica-docs/',

  organizationName: 'hanguyentieuyen',
  projectName: 'threads-replica-docs',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Threads Replica',
      logo: {
        alt: 'Threads Replica logo',
        src: 'img/threads-app-icon.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/hanguyentieuyen/threads-replica-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Start Here',
          items: [
            {label: 'Introduction', to: '/'},
            {label: 'Overview', to: '/overview'},
            {label: 'Architecture', to: '/architecture'},
          ],
        },
        {
          title: 'Review Areas',
          items: [
            {label: 'API Contract', to: '/api-contract'},
            {label: 'Auth & Security', to: '/auth-security'},
            {label: 'Trade-offs & Future Work', to: '/tradeoffs-future'},
          ],
        },
        {
          title: 'Project',
          items: [
            {
              label: 'Docs Repository',
              href: 'https://github.com/hanguyentieuyen/threads-replica-docs',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} hanguyentieuyen. Public docs built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
