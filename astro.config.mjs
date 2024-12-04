import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import svelte from '@astrojs/svelte'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Design System',
      social: {
        github: 'https://github.com/yourusername/your-repo',
      },
      sidebar: [
        {
          label: 'Getting Started',
          items: [{ label: 'Introduction', slug: 'introduction' }],
        },
        {
          label: 'Foundations',
          items: [
            { label: 'Colors', slug: 'foundations/colors' },
            { label: 'Typography', slug: 'foundations/typography' },
            { label: 'Spacing', slug: 'foundations/spacing' },
          ],
        },
        {
          label: 'Components',
          items: [{ label: 'Button', slug: 'components/button' }],
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
