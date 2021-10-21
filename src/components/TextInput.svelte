<script lang="ts">
  export let name: string = null;
  export let placeholder: string = null;
  export let value: string;
</script>

<input
  {name}
  {placeholder}
  bind:value
  on:input
/>

<style lang="postcss">
  input {
    @apply mx-1.5 my-1 rounded-md;
    @apply h-10 px-2;
    @apply border-2 border-red-500;
    @apply bg-transparent;
    @apply outline-none ring-red-500/50;
    @apply text-white text-xl font-semibold;
    @apply placeholder-white/50;
    @apply transition-all motion-reduce:transition-none;

    &:hover {
      @apply bg-white/5;
    }

    &:focus {
      @apply ring-4;

      &:hover {
        @apply bg-black/10;
      }
    }
  }
</style>
