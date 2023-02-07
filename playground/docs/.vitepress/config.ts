import fs from "fs";
import path from "path";

import { defineConfig } from 'vitepress';
import { getSidebar } from 'vitepress-plugin-auto-sidebar';

export default defineConfig({
  lang: 'en-US',
  title: 'VitePress',
  description: 'Vite & Vue powered static site generator.',
  themeConfig: {
    nav: [
      { text: 'Example', link: '/example' },
    ],
    sidebar: getSidebar({
      contentRoot: '/docs',
      contentDirs: ['team'],
      collapsible: true,
      collapsed: true,
    }) as any,
  },
});
