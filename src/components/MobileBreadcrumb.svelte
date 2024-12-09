<script lang="ts">
  import { onMount } from 'svelte'
  import { layoutStore } from '../stores/layout'

  export let group: string | undefined
  export let title: string

  // Get the current path
  let currentPath = ''
  if (typeof window !== 'undefined') {
    currentPath = window.location.pathname
  }

  // If we're on the index page (root path), always show "Home"
  $: displayTitle = currentPath === '/' ? 'Home' : title

  onMount(() => {
    const sidebarToggle = document.getElementById('sidebar-toggle')
    const leftSidebar = document.getElementById('left-sidebar')

    sidebarToggle?.addEventListener('click', () => {
      leftSidebar?.classList.toggle('-translate-x-full')
      layoutStore.toggleLeftSidebar()
    })
  })
</script>

<div class="lg:hidden fixed top-14 left-0 right-0 z-30 bg-white dark:bg-gray-900 border-b border-[#EDEDF0] dark:border-gray-800">
  <div class="flex items-center gap-2 px-4 h-12">
    <button
      id="sidebar-toggle"
      class="p-2 -ml-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label="Toggle navigation menu"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
    <div class="text-[15px] leading-[19.6px] tracking-[-0.0045em] font-normal text-[#666687]">
      {#if group}
        <span>{group} / </span>
      {/if}
      <span class="text-[#2D2D31] dark:text-white">{displayTitle}</span>
    </div>
  </div>
</div>

<!-- Spacer for mobile layout -->
<div class="h-12 lg:hidden" aria-hidden="true"></div>