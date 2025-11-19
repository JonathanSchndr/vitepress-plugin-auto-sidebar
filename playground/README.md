# Playground

This is a playground for testing and demonstrating the `vitepress-plugin-auto-sidebar` plugin.

## Setup

```bash
# From the root of the repository
pnpm install

# The playground will automatically use the local version of the plugin
```

## Development

```bash
# Start the dev server
pnpm --filter playground dev

# Or from the playground directory
cd playground
pnpm dev
```

The dev server will start at `http://localhost:5173`

## Build

```bash
# Build the playground
pnpm --filter playground build

# Preview the build
pnpm --filter playground preview
```

## Structure

```
playground/
├── docs/
│   ├── .vitepress/
│   │   └── config.ts        # VitePress config with auto-sidebar
│   ├── index.md             # Home page
│   ├── example.md           # Example page
│   ├── team/                # Example directory
│   │   ├── home.md
│   │   ├── _ignore.md       # Ignored file (underscore prefix)
│   │   └── meetings/
│   │       └── overview.md
│   └── project/             # Example directory with custom title
│       └── index.md
└── package.json
```

## Features Demonstrated

- ✅ Automatic sidebar generation from folder structure
- ✅ Nested directories support
- ✅ Custom directory titles
- ✅ Frontmatter title support
- ✅ Ignored files (underscore prefix)
- ✅ Collapsible sections
