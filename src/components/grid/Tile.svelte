<script lang="ts">
  import type { Tile } from '$types/board';

  export let x: number;
  export let y: number;
  export let data: Tile;

  let hexClass: string;
  if (data.type === 'resource') {
    hexClass = 'resource ' + data.resource;
  } else {
    hexClass = data.type;
  }
</script>

<g transform={`translate(${y * 87 + x * 174}, ${y * 150})`}>
  <polygon points="0,50 87,0 174,50 174,150 87,200 0,150" class={hexClass} />
  {#if data.type === 'resource'}
    <circle cx="87" cy="100" r="36" class="number-tile" />
    <text
      x="87"
      y="98"
      class:common={data.type === 'resource' && (data.number == 6 || data.number == 8)}
      dominant-baseline="middle"
      text-anchor="middle"
    >
      {data.number}
    </text>
    {#if data.number == 2 || data.number == 12}
      <circle cx="87" cy="116" r="3" class="dot" />
    {:else if data.number == 3 || data.number == 11}
      <circle cx="83" cy="116" r="3" class="dot" />
      <circle cx="91" cy="116" r="3" class="dot" />
    {:else if data.number == 4 || data.number == 10}
      <circle cx="79" cy="116" r="3" class="dot" />
      <circle cx="87" cy="116" r="3" class="dot" />
      <circle cx="95" cy="116" r="3" class="dot" />
    {:else if data.number == 5 || data.number == 9}
      <circle cx="75" cy="116" r="3" class="dot" />
      <circle cx="83" cy="116" r="3" class="dot" />
      <circle cx="91" cy="116" r="3" class="dot" />
      <circle cx="99" cy="116" r="3" class="dot" />
    {:else if data.number == 6 || data.number == 8}
      <circle cx="71" cy="116" r="3" class="dot common" />
      <circle cx="79" cy="116" r="3" class="dot common" />
      <circle cx="87" cy="116" r="3" class="dot common" />
      <circle cx="95" cy="116" r="3" class="dot common" />
      <circle cx="103" cy="116" r="3" class="dot common" />
    {/if}
  {:else if data.type === 'port'}
    {#if data.direction === 'left'}
      <polygon
        points="0,13 22,0 44,13 44,39 22,52 0,39"
        transform="translate(16, 74)"
        class={data.resource}
      />
    {:else if data.direction === 'upLeft'}
      <polygon
        points="0,13 22,0 44,13 44,39 22,52 0,39"
        transform="translate(41, 30)"
        class={data.resource}
      />
    {:else if data.direction === 'upRight'}
      <polygon
        points="0,13 22,0 44,13 44,39 22,52 0,39"
        transform="translate(93, 30)"
        class={data.resource}
      />
    {:else if data.direction === 'right'}
      <polygon
        points="0,13 22,0 44,13 44,39 22,52 0,39"
        transform="translate(118, 74)"
        class={data.resource}
      />
    {:else if data.direction === 'downRight'}
      <polygon
        points="0,13 22,0 44,13 44,39 22,52 0,39"
        transform="translate(93, 118)"
        class={data.resource}
      />
    {:else if data.direction === 'downLeft'}
      <polygon
        points="0,13 22,0 44,13 44,39 22,52 0,39"
        transform="translate(41, 118)"
        class={data.resource}
      />
    {/if}
  {/if}
</g>

<style lang="postcss">
  polygon {
    &.resource {
      @apply stroke-board-land stroke-2;
    }

    &.brick {
      @apply fill-board-resource-brick;
    }

    &.lumber {
      @apply fill-board-resource-lumber;
    }

    &.ore {
      @apply fill-board-resource-ore;
    }

    &.grain {
      @apply fill-board-resource-grain;
    }

    &.wool {
      @apply fill-board-resource-wool;
    }

    &.three-to-one {
      @apply fill-board-three-to-one;
    }

    &.desert {
      @apply fill-board-desert stroke-board-land stroke-2;
    }

    &.sea,
    &.port {
      @apply fill-board-sea stroke-board-sea stroke-3;
    }
  }

  .number-tile {
    @apply fill-board-number;
  }

  text {
    @apply text-4xl font-semibold text-black fill-current;

    &.common {
      @apply text-red-500;
    }
  }

  circle.dot {
    @apply text-black fill-current;

    &.common {
      @apply text-red-500;
    }
  }
</style>
