<script lang="ts">
  import { onMount } from 'svelte'
  import { Sun, Moon, Menu } from 'lucide-svelte'
  import Search from './Search.svelte'
  import { layoutStore } from '../stores/layout'

  let isDark = false

  onMount(() => {
    // Initialize isDark state from current class
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
    const newTheme = isDark ? 'light' : 'dark'
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
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
  <div class="h-full px-4 lg:pl-7 flex items-center justify-between">
    <a href="/" class="flex items-center gap-2">
      <img src="/logo.svg" alt="Logo" class="h-8 w-8" />
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
          <Sun class="h-5 w-5 text-gray-600 dark:text-gray-400" />
        {:else}
          <Moon class="h-5 w-5 text-gray-600" />
        {/if}
      </button>

      <button
        on:click={toggleRightSidebar}
        class="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-label="Toggle table of contents"
      >
        <Menu class="h-5 w-5 text-gray-600 dark:text-gray-400" />
      </button>
    </div>
  </div>
</header>