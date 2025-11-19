import { defineConfig } from 'vitepress';
import { getSidebar } from 'vitepress-plugin-auto-sidebar';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  lang: 'en-US',
  title: 'VitePress Plugin Auto Sidebar',
  description: 'Playground for testing vitepress-plugin-auto-sidebar',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Example', link: '/example' },
    ],
    sidebar: getSidebar({
      contentRoot: resolve(__dirname, '../'),
      contentDirs: [
        'team',
        {
          path: 'project',
          title: 'About Project',
        },
      ],
      collapsible: true,
      collapsed: false,
      useFrontmatter: true,
    }),
  },
});
