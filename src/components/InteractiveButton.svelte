<script>
  let count = 0
  const increment = () => count += 1
</script>

<button
  class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
  on:click={increment}
>
  Clicked {count} {count === 1 ? 'time' : 'times'}
</button>

<style>
  button {
    font-family: system-ui, sans-serif;
  }
</style>