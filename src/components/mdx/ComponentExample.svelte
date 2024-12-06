<script lang="ts">
  export let type: 'single' | 'variants' | 'states'
</script>

<div class="my-8 rounded-lg bg-white dark:bg-gray-900 border border-[#EDEDF0] dark:border-gray-800">
  <div class="flex items-center justify-center p-8 py-16 gap-2 flex-wrap">
    <slot />
  </div>
</div>

<style>
  /* Ensure consistent spacing in MDX */
  div :global(p) {
    margin: 0;
  }
</style>