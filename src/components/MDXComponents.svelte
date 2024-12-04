<script lang="ts">
  export let type: 'info' | 'warning' | 'error' = 'info'
</script>

<!-- Callout component -->
{#if type === 'info'}
  <div class="my-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r-lg">
    <slot />
  </div>
{:else if type === 'warning'}
  <div class="my-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-r-lg">
    <slot />
  </div>
{:else if type === 'error'}
  <div class="my-6 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-lg">
    <slot />
  </div>
{/if}

<style>
  div :global(p:last-child) {
    @apply mb-0;
  }
</style>