<button on:click>
  <slot />
</button>

<style lang="postcss">
  button {
    @apply mx-1.5 my-1 rounded-md;
    @apply px-6 py-2;
    @apply overflow-hidden;
    @apply border-red-500;
    @apply bg-red-500;
    @apply outline-none ring-0 ring-red-500/50;
    @apply text-2xl text-white font-semibold;
    @apply transition-all motion-reduce:transition-none;

    touch-action: manipulation;

    &:focus {
      @apply ring-4;
    }

    &:hover {
      @apply bg-red-400;
    }

    &:active {
      @apply bg-red-600;
    }

    &:disabled {
      @apply border-night-600;
      @apply bg-night-600;
      @apply cursor-not-allowed;
    }
  }
</style>
