<script lang="ts">
  import type { Board } from '$lib/board';
  import type { Tile } from '$types/board';
  import TileComponent from '$components/grid/Tile.svelte';

  export let board: Board;
  export let gridItems: Tile[][];

  let viewMinX = (board.data.diagonalTiles - 1) * 87;
  let viewMaxX = (board.columns + 1) * 174;
  let viewMaxY = board.rows * 150 + 50;
</script>

<svg viewBox={`${viewMinX - 1} -1 ${viewMaxX + 2} ${viewMaxY + 2}`}>
  {#each gridItems as row, y}
    {#each row as tile, x}
      {#if tile && (tile.type === 'resource' || tile.type === 'desert')}
        <TileComponent {x} {y} data={tile} />
      {/if}
    {/each}
  {/each}
  {#each gridItems as row, y}
    {#each row as tile, x}
      {#if tile && (tile.type === 'sea' || tile.type === 'port')}
        <TileComponent {x} {y} data={tile} />
      {/if}
    {/each}
  {/each}
</svg>

<style lang="postcss">
  svg {
    @apply w-full h-full;
  }
</style>
