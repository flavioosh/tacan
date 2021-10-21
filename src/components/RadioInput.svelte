<script lang="ts">
  export let name: string;
  export let group: any;
  export let value: any;
  export let selected = false;
</script>

<label>
  <input type="radio" {name} {value} checked={selected} bind:group on:change />
  <div class="radio" />
  <span>
    <slot />
  </span>
</label>

<style lang="postcss">
  label {
    @apply flex-grow;
    @apply py-1.5;
    @apply flex justify-center items-center;
    @apply font-semibold;
    @apply transition-all motion-reduce:transition-none;
    @apply cursor-pointer;

    &:focus {
      @apply ring-4;
    }

    input {
      @apply absolute;
      @apply w-0 h-0;
      @apply pointer-events-none;

      + .radio {
        @apply relative;
        @apply flex-shrink-0;
        @apply w-6 h-6 rounded-full;
        @apply border-2 border-red-500;
        @apply bg-transparent;
        @apply ring-0 ring-red-500/50;
        @apply transition-all motion-reduce:transition-none;

        &:focus {
          @apply ring-4;
        }
      }

      &:checked + .radio::after {
        content: '';
        @apply absolute left-1 top-1;
        @apply w-3 h-3 rounded-full;
        @apply bg-red-500;
        @apply transition-all motion-reduce:transition-none;
      }

      &:hover + .radio {
        @apply border-red-400;
        @apply bg-white/5;
      }

      &:hover:checked + .radio::after {
        @apply bg-red-400;
      }

      &:focus + .radio {
        @apply ring-4;
      }

      &:active + .radio {
        @apply border-red-600;
        @apply bg-black/10;
      }

      &:active:checked + .radio::after {
        @apply bg-red-600;
      }
    }

    span {
      @apply px-3;
      @apply text-lg text-center;
    }
  }
</style>
