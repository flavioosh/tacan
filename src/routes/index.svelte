<script context="module" lang="ts">
  import { BIG_BOARD, DEFAULT_BOARD } from '$lib/data';
  import { Board } from '$lib/board';
  import type { LoadInput, LoadOutput } from '@sveltejs/kit';
  import { generate as generateRandom } from '$lib/generators/random';
  import { randomSeed } from '$lib/seed';

  export function load({ page }: LoadInput): LoadOutput {
    const { query } = page;

    if (!query.has('size') || !query.has('seed')) {
      const size = query.get('size') || 'regular';
      const seed = query.get('seed') || randomSeed();

      const newQuery = new URLSearchParams();
      newQuery.append('size', size);
      newQuery.append('seed', seed);

      return {
        redirect: `/?${newQuery.toString()}`,
        status: 302,
      };
    }

    const size = query.get('size');
    const seed = query.get('seed');

    const boardData = size === 'regular' ? DEFAULT_BOARD : BIG_BOARD;
    const board = new Board(boardData);
    const gridItems = generateRandom(board, { seed });

    return {
      props: {
        size,
        seed,
        board,
        gridItems,
      },
    };
  }
</script>

<script lang="ts">
  import Button from '$components/Button.svelte';
  import HexagonGrid from '$components/grid/Grid.svelte';
  import RadioButton from '$components/RadioInput.svelte';
  import RadioButtonGroup from '$components/RadioInputGroup.svelte';
  import TextInput from '$components/TextInput.svelte';
  import type { Tile } from '$types/board';
  import { goto } from '$app/navigation';

  export let seed: string;
  export let size: 'regular' | 'large';

  export let board: Board;
  export let gridItems: Tile[][];

  function generate(): void {
    const query = new URLSearchParams();
    query.append('size', size);
    query.append('seed', seed);

    goto(`/?${query.toString()}`, { replaceState: true, keepfocus: true });
  }

  function randomize(): void {
    seed = randomSeed();
    generate();
  }
</script>

<main>
  {#key gridItems}
    <HexagonGrid {board} {gridItems} />
  {/key}
  <form action="/" method="GET" on:submit|preventDefault>
    <RadioButtonGroup>
      <RadioButton name="size" value="regular" bind:group={size} on:change={() => generate()}>
        3-4 Players
      </RadioButton>
      <RadioButton name="size" value="large" bind:group={size} on:change={() => generate()}>
        5-6 Players
      </RadioButton>
    </RadioButtonGroup>
    <Button on:click={() => randomize()}>Generate</Button>
    <TextInput name="seed" placeholder="Seed" bind:value={seed} on:input={() => generate()} />
  </form>
</main>

<style lang="postcss">
  main {
    @apply h-full px-4 py-6 md:px-6;
    @apply flex flex-col items-center justify-center;

    form {
      @apply mt-4;
      @apply flex flex-col items-stretch flex-shrink-0;
    }
  }
</style>
