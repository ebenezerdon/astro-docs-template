<script lang="ts">
  import { onMount } from 'svelte'
  import Fuse from 'fuse.js'

  interface SearchResult {
    title: string
    description: string
    group?: string
    slug: string
  }

  let searchResults: SearchResult[] = []
  let isSearching = false
  let searchInput: HTMLInputElement
  let fuse: Fuse<SearchResult>

  onMount(async () => {
    // Fetch all pages data for search
    const response = await fetch('/search-index.json')
    const pages = await response.json()

    // Initialize Fuse.js
    fuse = new Fuse(pages, {
      keys: ['title', 'description', 'group'],
      threshold: 0.3,
      includeMatches: true,
    })
  })

  function handleSearch(event: Event) {
    const query = (event.target as HTMLInputElement).value.trim()

    if (!query) {
      searchResults = []
      isSearching = false
      return
    }

    isSearching = true
    const results = fuse.search(query).map(result => result.item)
    searchResults = results.slice(0, 5)
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      searchInput.blur()
      searchResults = []
      isSearching = false
    }
  }
</script>

<div class="relative">
  <input
    bind:this={searchInput}
    type="search"
    placeholder="Search documentation..."
    class="w-64 px-4 py-1.5 rounded-md bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-[#4945FF] dark:focus:border-[#4945FF] outline-none"
    on:input={handleSearch}
    on:keydown={handleKeyDown}
  />

  {#if isSearching && searchResults.length > 0}
    <div class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto">
      {#each searchResults as result}
        <a
          href={result.slug}
          class="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <div class="text-sm font-medium text-gray-900 dark:text-white">
            {result.title}
          </div>
          {#if result.group}
            <div class="text-xs text-[#4945FF] dark:text-blue-400 mt-0.5">
              {result.group}
            </div>
          {/if}
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {result.description}
          </div>
        </a>
      {/each}
    </div>
  {:else if isSearching}
    <div class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 p-4">
      <div class="text-sm text-gray-500 dark:text-gray-400">
        No results found
      </div>
    </div>
  {/if}
</div>