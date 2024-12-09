<script lang="ts">
  import { onMount } from 'svelte'
  import Fuse from 'fuse.js'
  import { Search as SearchIcon } from 'lucide-svelte'

  interface SearchResult {
    title: string
    description: string
    group?: string
    category?: string
    slug: string
    headings: string[]
  }

  let searchResults: SearchResult[] = []
  let isSearching = false
  let searchInput: HTMLInputElement
  let fuse: Fuse<SearchResult>
  let selectedIndex = -1

  onMount(() => {
    const initialize = async () => {
      try {
        const response = await fetch('/api/search.json')
        const pages = await response.json()

        // Initialize Fuse.js
        fuse = new Fuse(pages, {
          keys: [
            { name: 'title', weight: 1 },
            { name: 'headings', weight: 0.8 },
            { name: 'description', weight: 0.6 },
            { name: 'group', weight: 0.4 },
            { name: 'category', weight: 0.4 },
          ],
          threshold: 0.3,
          includeMatches: true,
          ignoreLocation: true,
        })
      } catch (error) {
        console.error('Failed to fetch search index:', error)
      }
    }

    // Add global keyboard shortcut listener
    window.addEventListener('keydown', handleGlobalKeyDown)
    initialize()

    // Return cleanup function
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown)
    }
  })

  function handleSearch(event: Event) {
    const query = (event.target as HTMLInputElement).value.trim()
    selectedIndex = -1

    if (!query) {
      searchResults = []
      isSearching = false
      return
    }

    isSearching = true
    const results = fuse.search(query).map(result => result.item)
    searchResults = results.slice(0, 8) // Show more results
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      searchInput.blur()
      searchResults = []
      isSearching = false
      selectedIndex = -1
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      selectedIndex = Math.min(selectedIndex + 1, searchResults.length - 1)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      selectedIndex = Math.max(selectedIndex - 1, -1)
    } else if (event.key === 'Enter' && selectedIndex >= 0) {
      event.preventDefault()
      window.location.href = searchResults[selectedIndex].slug
    }
  }

  function handleGlobalKeyDown(event: KeyboardEvent) {
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault()
      searchInput.focus()
    }
  }

  function handleResultClick(slug: string) {
    searchResults = []
    isSearching = false
    selectedIndex = -1
    searchInput.value = ''
    searchInput.blur()
  }
</script>

<div class="relative w-full sm:w-auto">
  <div class="relative">
    <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
      <SearchIcon class="h-5 w-5 text-gray-400" />
    </div>
    <input
      bind:this={searchInput}
      type="search"
      placeholder="Search"
      class="w-full sm:w-[300px] pl-10 pr-16 py-1.5 rounded-[10px] bg-white dark:bg-gray-800 border border-[#DCDCE4] dark:border-gray-700 focus:border-[#19191C] dark:focus:border-gray-600 outline-none text-[15px] leading-[19.6px] tracking-[-0.0045em]"
      on:input={handleSearch}
      on:keydown={handleKeyDown}
    />
    <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none">
      <kbd class="hidden sm:block px-1.5 py-0.5 text-xs text-gray-400 bg-[#F4F4F7] dark:bg-gray-700 rounded-[4px] border border-[#DCDCE4] dark:border-gray-600">⌘K</kbd>
    </div>
  </div>

  {#if isSearching && searchResults.length > 0}
    <div class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 max-h-[calc(100vh-120px)] overflow-y-auto">
      {#each searchResults as result, index}
        <a
          href={result.slug}
          class="block px-4 py-3 hover:bg-[#f6f6f6] dark:hover:bg-gray-700 {index === selectedIndex ? 'bg-[#f6f6f6] dark:bg-gray-700' : ''}"
          on:click={() => handleResultClick(result.slug)}
        >
          <div class="flex items-center justify-between">
            <div class="text-[15px] font-medium text-[#19191C] dark:text-white">
              {result.title}
            </div>
            {#if result.category || result.group}
              <div class="text-xs text-[#56565C] dark:text-gray-400 px-2 py-0.5 bg-[#f0f0f1] dark:bg-gray-700 rounded">
                {result.category || result.group}
              </div>
            {/if}
          </div>
          <div class="text-sm text-[#56565C] dark:text-gray-400 mt-1 line-clamp-2">
            {result.description}
          </div>
        </a>
      {/each}
    </div>
  {:else if isSearching}
    <div class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 p-4">
      <div class="text-sm text-[#56565C] dark:text-gray-400">
        No results found
      </div>
    </div>
  {/if}
</div>