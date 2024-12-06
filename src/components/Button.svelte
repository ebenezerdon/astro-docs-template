<script lang="ts">
  export let variant: 'primary' | 'secondary' | 'tertiary' = 'primary'
  export let disabled = false
  export let type = 'button'
  export let className = ''

  const variantClasses = {
    primary: 'bg-black text-white hover:bg-gray-900 active:bg-gray-800',
    secondary: 'bg-white text-black border border-[#EDEDF0] hover:bg-gray-50 active:bg-gray-100',
    tertiary: 'bg-transparent text-black hover:bg-gray-50 active:bg-gray-100'
  }

  $: classes = `
    ${variantClasses[variant]}
    ${className}
    h-[26px]
    py-5 px-6
    rounded-lg
    text-[15px]
    leading-none
    font-medium
    flex items-center justify-center
    transition-colors
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black
    disabled:opacity-50 disabled:cursor-not-allowed
    disabled:hover:bg-black disabled:active:bg-black
  `
</script>

<button
  {type}
  {disabled}
  class={classes}
  on:click
>
  <slot />
</button>

<style>
  :global(.hover) {
    @apply bg-gray-900;
  }
  :global(.pressed) {
    @apply bg-gray-800;
  }
  :global(.focus) {
    @apply ring-2 ring-offset-2 ring-black;
  }
</style>