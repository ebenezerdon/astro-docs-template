<script lang="ts">
  export let title: string = ''
  export let icon: string = ''
</script>

<div class="card">
  <div class="header">
    {#if icon}
      <span class="icon">{icon}</span>
    {/if}
    {#if title}
      <h3>{title}</h3>
    {/if}
  </div>
  <div class="content">
    <slot />
  </div>
</div>

<style lang="postcss">
  .card {
    @apply border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900;
  }

  .header {
    @apply flex items-center gap-3 mb-2;
  }

  .icon {
    @apply text-[#4945FF] dark:text-blue-400 text-xl;
  }

  h3 {
    @apply text-lg font-medium text-[#2D2D31] dark:text-white;
  }

  .content {
    @apply text-[#56565C] dark:text-gray-400;
  }

  .content :global(p) {
    @apply m-0;
  }
</style>