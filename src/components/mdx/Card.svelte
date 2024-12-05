<script lang="ts">
  import { Download, Palette, PuzzlePiece, Book } from 'lucide-svelte'

  export let title: string = ''
  export let icon: string = ''

  const iconMap = {
    download: Download,
    palette: Palette,
    puzzle: PuzzlePiece,
    book: Book
  }

  const IconComponent = iconMap[icon as keyof typeof iconMap]
</script>

<div class="card">
  <h3 class="title">
    {#if IconComponent}
      <span class="icon" aria-hidden="true">
        <svelte:component this={IconComponent} size={24} strokeWidth={2} />
      </span>
    {/if}
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