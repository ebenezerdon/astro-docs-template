<script lang="ts">
  interface NavItem {
    label: string
    link?: string
    items?: NavItem[]
  }

  const navigation: NavItem[] = [
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
  ]

  let currentPath = ''

  // Update current path on client side
  if (typeof window !== 'undefined') {
    currentPath = window.location.pathname
  }

  function isCurrentPage(path: string): boolean {
    return currentPath === path || currentPath === path + '/'
  }
</script>

<nav class="h-full py-4">
  {#each navigation as item}
    {#if item.items}
      <!-- Section with sub-items -->
      <div class="mb-6">
        <div class="px-4 py-2 text-xs font-medium text-[#2D2D31] uppercase tracking-wider">
          {item.label}
        </div>
        <div class="space-y-0.5">
          {#each item.items as subItem}
            <a
              href={subItem.link}
              class="block py-2 px-4 text-[15px] text-[#56565C] hover:text-[#2D2D31] no-underline transition-colors"
              class:active={isCurrentPage(subItem.link)}
              aria-current={isCurrentPage(subItem.link) ? 'page' : undefined}
            >
              {subItem.label}
            </a>
          {/each}
        </div>
      </div>
    {:else}
      <!-- Single item -->
      <a
        href={item.link}
        class="block py-2 px-4 text-[15px] text-[#56565C] hover:text-[#2D2D31] no-underline transition-colors"
        class:active={isCurrentPage(item.link)}
        aria-current={isCurrentPage(item.link) ? 'page' : undefined}
      >
        {item.label}
      </a>
    {/if}
  {/each}
</nav>

<style lang="postcss">
  .active {
    @apply bg-[#F4F4F7] text-[#2D2D31] font-normal;
  }

  :global(.dark) .active {
    @apply bg-gray-800 text-white;
  }

  :global(.dark) a {
    @apply text-gray-400 hover:text-white;
  }

  :global(.dark) :global(.text-\\[\\#2D2D31\\]) {
    @apply text-gray-500;
  }
</style>