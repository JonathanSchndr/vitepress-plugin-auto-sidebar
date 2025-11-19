![VitePress Plugin: Auto Sidebar](./banner.jpg)

# :zap: VitePress Plugin: Auto Sidebar

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

> Generate the VitePress sidebar through the folder structure.

- [✨ &nbsp;Release Notes](https://github.com/JonathanSchndr/vitepress-plugin-auto-sidebar/releases)

## Features

- 🚀 Automatic sidebar generation from folder structure
- 📁 Support for nested directories
- 🎨 Customizable directory titles
- 📝 Frontmatter title support
- 🔄 Collapsible sidebar sections
- 📦 Small library with zero dependencies (except frontmatter parsing)
- 🔒 Full TypeScript support with type definitions
- ⚡ Fast and efficient file system operations
- 🛡️ Built-in error handling and validation

## Setup

```sh
pnpm add vitepress-plugin-auto-sidebar # pnpm (recommended)
npm i vitepress-plugin-auto-sidebar # npm
yarn add vitepress-plugin-auto-sidebar # yarn
```

## Basic usage

.vitepress/config.js
```javascript
import { getSidebar } from 'vitepress-plugin-auto-sidebar'

export default {
  themeConfig: {
    sidebar: getSidebar({ contentRoot: '/', contentDirs: ['team'], collapsible: true, collapsed: true })
  }
}
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `contentRoot` | `string` | `'/'` | Root directory of your VitePress documentation (relative to project root) |
| `contentDirs` | `(string \| ContentDir)[]` | `['/']` | Array of directories to index within contentRoot. Can be simple strings or objects with `{ path: string, title?: string }` for custom titles |
| `collapsible` | `boolean` | `true` | Whether sidebar groups can be collapsed/expanded |
| `collapsed` | `boolean` | `true` | Whether sidebar groups are initially collapsed on page load |
| `useFrontmatter` | `boolean` | `false` | Whether to use frontmatter titles from markdown files instead of filename-based titles |

### Advanced Usage

#### Custom Directory Titles

```javascript
import { getSidebar } from 'vitepress-plugin-auto-sidebar'

export default {
  themeConfig: {
    sidebar: getSidebar({
      contentRoot: '/docs',
      contentDirs: [
        'getting-started',
        { path: 'api', title: 'API Reference' },
        { path: 'guides', title: '📚 User Guides' }
      ]
    })
  }
}
```

#### Using Frontmatter Titles

Add frontmatter to your markdown files:

```markdown
---
title: My Custom Page Title
---

# My Custom Page Title

Your content here...
```

Then enable frontmatter support:

```javascript
import { getSidebar } from 'vitepress-plugin-auto-sidebar'

export default {
  themeConfig: {
    sidebar: getSidebar({
      contentRoot: '/',
      contentDirs: ['docs'],
      useFrontmatter: true
    })
  }
}
```

### Tips & Best Practices

- **Ignore Files:** Prefix any `.md` file with an underscore (`_example.md`) to exclude it from the sidebar
- **Organize Structure:** Use clear, descriptive folder names - they become sidebar section titles
- **File Naming:** Use kebab-case for files (`my-page.md`) - they're automatically converted to "My Page"
- **Nested Directories:** The plugin recursively scans all subdirectories for a complete sidebar structure
- **Empty Directories:** Directories without any valid `.md` files are automatically excluded from the sidebar


## Development

### Setup

```sh
# Clone the repository
git clone https://github.com/JonathanSchndr/vitepress-plugin-auto-sidebar.git
cd vitepress-plugin-auto-sidebar

# Install dependencies
pnpm install

# Run tests
pnpm test

# Build the package
pnpm run build
```

### Available Scripts

- `pnpm run build` - Build the package for production
- `pnpm run typecheck` - Run TypeScript type checking
- `pnpm run lint` - Lint code with Oxlint
- `pnpm run lint:fix` - Auto-fix linting issues
- `pnpm run format` - Format code with Prettier
- `pnpm run format:check` - Check code formatting
- `pnpm test` - Run tests
- `pnpm run test:watch` - Run tests in watch mode
- `pnpm run test:ui` - Run tests with UI
- `pnpm run test:coverage` - Run tests with coverage

### Contributing

Contributions are welcome! Please feel free to submit a Pull Request. Make sure to:

1. Follow the existing code style (Oxlint + Prettier)
2. Add tests for new features
3. Update documentation as needed
4. Use semantic commit messages (conventional commits)

## License

Copyright (c) 2025 Jonathan Schneider
[MIT License](./LICENSE)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/vitepress-plugin-auto-sidebar/latest.svg
[npm-version-href]: https://npmjs.com/package/vitepress-plugin-auto-sidebar
[npm-downloads-src]: https://img.shields.io/npm/dt/vitepress-plugin-auto-sidebar.svg
[npm-downloads-href]: https://npmjs.com/package/vitepress-plugin-auto-sidebar
[license-src]: https://img.shields.io/npm/l/vitepress-plugin-auto-sidebar.svg
[license-href]: https://npmjs.com/package/vitepress-plugin-auto-sidebar
