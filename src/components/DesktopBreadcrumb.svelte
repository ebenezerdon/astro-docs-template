<script lang="ts">
  export let group: string | undefined
  export let title: string
</script>

<div class="hidden lg:block text-[15px] leading-[19.6px] tracking-[-0.0045em] font-normal text-[#666687] mb-8">
  {#if group}
    <span>{group} / </span>
  {/if}
  <span class="text-[#2D2D31] dark:text-white">{title}</span>
</div>