import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import svelte from '@astrojs/svelte'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Acme Inc.',
      logo: {
        src: './src/assets/logo.svg',
      },
      components: {
        Header: './src/components/starlight/Header.astro',
        Sidebar: './src/components/starlight/Sidebar.astro',
      },
      social: {
        github: 'https://github.com/yourusername/your-repo',
      },
      sidebar: [
        {
          label: 'Home',
          link: '/',
        },
        {
          label: 'Getting Started',
          link: '/getting-started',
        },
        {
          label: 'Design Tokens',
          link: '/design-tokens',
        },
        {
          label: 'FOUNDATIONS',
          items: [
            { label: 'Colors', link: '/foundations/colors' },
            { label: 'Typography', link: '/foundations/typography' },
            { label: 'Border Radius', link: '/foundations/border-radius' },
            { label: 'Elevation', link: '/foundations/elevation' },
            { label: 'Spacing', link: '/foundations/spacing' },
            { label: 'Icons', link: '/foundations/icons' },
            { label: 'Grids', link: '/foundations/grids' },
          ],
        },
        {
          label: 'COMPONENTS',
          items: [
            { label: 'Accordion', link: '/components/accordion' },
            { label: 'Action List', link: '/components/action-list' },
            { label: 'Action Menu', link: '/components/action-menu' },
            { label: 'Alert', link: '/components/alert' },
            { label: 'Avatar', link: '/components/avatar' },
            { label: 'Badge', link: '/components/badge' },
            { label: 'Breadcrumbs', link: '/components/breadcrumbs' },
            { label: 'Button', link: '/components/button' },
          ],
        },
      ],
      customCss: ['./src/styles/custom.css'],
    }),
    svelte(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
})
