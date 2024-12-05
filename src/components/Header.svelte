<script lang="ts">
  import { onMount } from 'svelte'
  import Search from './Search.svelte'
  import { layoutStore } from '../stores/layout'

  let isDark = false

  onMount(() => {
    // Initialize isDark state
    isDark = document.documentElement.classList.contains('dark')

    // Create mutation observer to keep isDark in sync
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          isDark = document.documentElement.classList.contains('dark')
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  })

  const toggleTheme = () => {
    const theme = localStorage.getItem('theme') ?? 'system'
    const newTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'
    localStorage.setItem('theme', newTheme)

    const isDark = newTheme === 'dark' ||
      (newTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

    document.documentElement.classList.toggle('dark', isDark)
  }

  const toggleRightSidebar = () => {
    const sidebar = document.getElementById('right-sidebar')
    if (sidebar) {
      sidebar.classList.toggle('translate-x-full')
      layoutStore.toggleRightSidebar()
    }
  }
</script>

<header class="fixed top-0 left-0 right-0 z-50 h-14 border-b border-[#EDEDF0] bg-white dark:bg-gray-900 dark:border-gray-800">
  <div class="h-full px-4 flex items-center justify-between">
    <a href="/" class="flex items-center gap-2">
      <img src="/src/assets/logo.svg" alt="Logo" class="h-8 w-8" />
      <div class="flex items-center gap-2">
        <span class="text-[#19191C] dark:text-white font-medium">Acme Inc.</span>
        <span class="text-gray-400 hidden sm:inline">Documentation</span>
      </div>
    </a>

    <div class="flex items-center gap-2 sm:gap-4">
      <div class="hidden sm:block">
        <Search />
      </div>

      <button
        on:click={toggleTheme}
        class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-label="Toggle theme"
      >
        {#if isDark}
          <!-- Sun icon -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        {:else}
          <!-- Moon icon -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        {/if}
      </button>

      <button
        on:click={toggleRightSidebar}
        class="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-label="Toggle table of contents"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </button>
    </div>
  </div>
</header>