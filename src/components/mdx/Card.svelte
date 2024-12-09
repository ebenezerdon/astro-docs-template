<script lang="ts">
  import { Download, Brush, Blocks, Lightbulb, Sparkles } from 'lucide-svelte'

  export let title: string = ''
  export let icon: 'download' | 'brush' | 'blocks' | 'lightbulb' | 'sparkles' = 'download'
  export let gradient: 'blue' | 'purple' | 'orange' | 'green' = 'blue'

  const icons = {
    download: Download,
    brush: Brush,
    blocks: Blocks,
    lightbulb: Lightbulb,
    sparkles: Sparkles
  }

  const gradients = {
    blue: 'from-blue-500/10 to-cyan-500/10 hover:from-blue-500/20 hover:to-cyan-500/20',
    purple: 'from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20',
    orange: 'from-orange-500/10 to-red-500/10 hover:from-orange-500/20 hover:to-red-500/20',
    green: 'from-emerald-500/10 to-lime-500/10 hover:from-emerald-500/20 hover:to-lime-500/20'
  }

  const Icon = icons[icon]
</script>

<div class="card bg-gradient-to-br {gradients[gradient]}">
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
    @apply border border-[#DCDCE4] dark:border-gray-800 rounded-lg p-6 transition-all duration-300 ease-in-out hover:scale-[1.02] dark:bg-gray-900/50;
  }

  .title {
    @apply flex items-center gap-3 text-[18px] leading-[23.4px] tracking-[-0.0045em] font-medium text-[#19191C] dark:text-white mb-3;
  }

  .icon {
    @apply text-[#19191C] dark:text-white inline-flex items-center bg-white/50 dark:bg-gray-800/50 p-2 rounded-lg;
  }

  .content {
    @apply text-[15px] leading-[19.6px] tracking-[-0.0045em] text-[#666687] dark:text-gray-400;
  }

  .content :global(p) {
    @apply m-0;
  }
</style>