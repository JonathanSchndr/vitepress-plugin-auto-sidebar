# Example Page

This is an example markdown file to demonstrate the auto sidebar functionality.

## Features Demonstrated

This playground demonstrates the following features:

### Automatic Sidebar Generation

The sidebar you see on the left is automatically generated from the folder structure in the `docs` directory.

### Directory Structure

```
docs/
├── example.md (this file)
├── team/
│   ├── home.md
│   ├── _ignore.md (ignored due to underscore prefix)
│   └── meetings/
│       └── overview.md
└── project/
    └── index.md
```

### Custom Titles

The "About Project" entry in the sidebar uses a custom title defined in the config:

```typescript
contentDirs: [
  'team',
  {
    path: 'project',
    title: 'About Project', // Custom title
  },
]
```

### Frontmatter Support

Files can use frontmatter to define custom titles. Check the markdown files in the `team` and `project` directories for examples.

### Ignored Files

Files starting with an underscore (like `_ignore.md`) are automatically excluded from the sidebar.
