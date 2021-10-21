module.exports = {
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        board: {
          resource: {
            brick: '#b5522e',
            lumber: '#006a2b',
            ore: '#555d5b',
            grain: '#ddc53d',
            wool: '#51cc40',
          },
          desert: '#ddd79f',
          sea: '#2781d0',
          road: '#44351d',
          'three-to-one': '#183291',
        },
        red: {
          50: '#f8e4e5',
          100: '#f0c9ca',
          200: '#e4a0a2',
          300: '#d87779',
          400: '#cc4e51',
          500: '#c02428',
          600: '#9c1e21',
          700: '#781719',
          800: '#541012',
          900: '#30090a',
        },
        night: {
          50: '#f3f2f2',
          100: '#e6e6e5',
          200: '#cdcccb',
          300: '#b4b3b1',
          400: '#9b9997',
          500: '#82807d',
          600: '#686664',
          700: '#4e4d4b',
          800: '#343332',
          900: '#1a1a19',
        },
      },
      fill: (theme) => ({
        board: {
          resource: {
            brick: theme('colors.board.resource.brick'),
            lumber: theme('colors.board.resource.lumber'),
            ore: theme('colors.board.resource.ore'),
            grain: theme('colors.board.resource.grain'),
            wool: theme('colors.board.resource.wool'),
          },
          desert: theme('colors.board.desert'),
          sea: theme('colors.board.sea'),
          'three-to-one': theme('colors.board.three-to-one'),
          number: theme('colors.board.desert'),
        },
      }),
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'sans-serif', 'system-ui'],
      },
      stroke: (theme) => ({
        board: {
          land: theme('colors.board.road'),
          sea: theme('colors.board.sea'),
        },
      }),
      strokeWidth: {
        3: 3,
      },
    },
  },
};
