<script>
  export let variant = 'primary'
  export let disabled = false
  export let type = 'button'
  export let size = 'default'

  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600',
    tertiary: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-800'
  }

  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    default: 'px-4 py-2',
    large: 'px-6 py-3 text-lg'
  }

  $: classes = `
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    inline-flex items-center justify-center
    rounded-md font-medium
    focus:outline-none focus:ring-2 focus:ring-offset-2
    transition-colors
    disabled:opacity-50 disabled:cursor-not-allowed
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