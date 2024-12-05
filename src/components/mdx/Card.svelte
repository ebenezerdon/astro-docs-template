<script lang="ts">
  import { Download, Palette, PuzzleIcon, Book } from 'lucide-svelte'

  export let title: string = ''
  export let icon: 'download' | 'palette' | 'puzzle' | 'book' = 'download'

  const icons = {
    download: Download,
    palette: Palette,
    puzzle: PuzzleIcon,
    book: Book,
  }

  const Icon = icons[icon]
</script>

<div class="card">
  <h3 class="title">
    <span class="icon">
      <svelte:component this={Icon} size={24} strokeWidth={2} />
    </span>
    {title}
  </h3>
  <div class="content">
    <slot />
  </div>
</div>

<style lang="postcss">
  .card {
    @apply border border-[#DCDCE4] dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900;
  }

  .title {
    @apply flex items-center gap-3 text-[18px] leading-[23.4px] tracking-[-0.0045em] font-medium text-[#19191C] dark:text-white mb-3;
  }

  .icon {
    @apply text-[#19191C] dark:text-white inline-flex items-center;
  }

  .content {
    @apply text-[15px] leading-[19.6px] tracking-[-0.0045em] text-[#666687] dark:text-gray-400;
  }

  .content :global(p) {
    @apply m-0;
  }
</style>