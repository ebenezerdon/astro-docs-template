# Modern Documentation Template

A sleek and modern documentation site template built with Astro, Svelte, and Tailwind CSS. Features a clean design, full-text search, dark mode support, and responsive layout.

## Features

- 🚀 **Built with Astro** - Fast, modern static site generation
- ⚡️ **Svelte Components** - Interactive UI components with great DX
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🔍 **Full-text Search** - Fast client-side search with Fuse.js
- 🌙 **Dark Mode** - Elegant light and dark theme support
- 📱 **Responsive Design** - Mobile-first, adaptive layout
- 🧩 **MDX Support** - Write content in MDX with component support
- 📝 **Clean Typography** - Beautiful content styling with Tailwind Typography

## Quick Start

```bash
# Clone the repository
git clone https://github.com/ebenezerdon/docs-template.git

# Navigate to the project
cd docs-template

# Install dependencies
npm install

# Start development server
npm run dev
```

## Project Structure

```
.
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── content/
│   │   ├── docs/
│   │   └── config.ts
│   ├── layouts/
│   ├── pages/
│   └── styles/
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Adding Content

1. Add your documentation content in MDX format under `src/content/docs/`:

```md
---
title: Getting Started
description: Learn how to use our product
group: Overview
---

# Getting Started

Welcome to our documentation...
```

2. Configure the navigation in `src/components/Sidebar.svelte`:

```ts
const navigation = [
  {
    label: 'Getting Started',
    link: '/getting-started',
  },
  {
    label: 'FOUNDATIONS',
    items: [
      { label: 'Colors', link: '/foundations/colors' },
      { label: 'Typography', link: '/foundations/typography' },
    ],
  },
]
```

The sidebar navigation needs to be configured to match your content structure. This gives you full control over the organization and grouping of your documentation.

## Customization

### Theme

Customize colors, typography, and other design tokens in `tailwind.config.mjs`:

```js
theme: {
  extend: {
    colors: {
      primary: {
        // Your color palette
      }
    }
  }
}
```

### Components

Add or modify components in `src/components/`. The template uses Svelte for interactive components and Astro for page layout.

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## License

MIT License - feel free to use this template for your own documentation needs.
