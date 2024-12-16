const colors = {
  'ice-blue': '#E8F4F8',
  'coral-red': '#E65858 ',
  'rose-red': '#F27A7A',
  'dark-crimson': '#CC3D3D',
  'ruby-red': '#C63939',
  't-normal': '#494937'
}

const elementsColors = {

  // NORMAL
  'dark-normal': '#8A8A56',
  'normal': '#C7C6A3',
  'light-normal': '#E1E0C9',
  'full-light-normal': '#D1CFB1',

  // FIGHTING
  'dark-fighting': '#9A2E26',
  'fighting': '#B64B45',
  'light-fighting': '#D96C67',
  'full-light-fighting': '#F5A896',

  // FLYING
  'dark-flying': '#6C4E9E',
  'flying': '#9481D1',
  'light-flying': '#B5A3E4',
  'full-light-flying': '#D0C4E8',

  // POISON
  'dark-poison': '#6F1D58',
  'poison': '#90407D',
  'light-poison': '#B060A2',
  'full-light-poison': '#D7A1D4',

  // GROUND
  'dark-ground': '#A57B43',
  'ground': '#C9A56C',
  'light-ground': '#E2C089',
  'full-light-ground': '#F1D1A5',

  // ROCK
  'dark-rock': '#7A641F',
  'rock': '#A89132',
  'light-rock': '#C6AB4A',
  'full-light-rock': '#E1C78A',

  // BUG
  'dark-bug': '#758B13',
  'bug': '#97A717',
  'light-bug': '#B7C735',
  'full-light-bug': '#D0D97A',

  // GHOST
  'dark-ghost': '#3F2D5C',
  'ghost': '#5F507E',
  'light-ghost': '#8271A0',
  'full-light-ghost': '#A6A4B6',

  // STEEL
  'dark-steel': '#8B8B98',
  'steel': '#A1A1B0',
  'light-steel': '#C2C2D1',
  'full-light-steel': '#D9D9E5',

  // FIRE
  'dark-fire': '#A85E1A',
  'fire': '#D4742B',
  'light-fire': '#F3964D',
  'full-light-fire': '#F9B57D',

  // WATER
  'dark-water': '#3F65A2',
  'water': '#517CD1',
  'light-water': '#749BEE',
  'full-light-water': '#A3BFF4',

  // GRASS
  'dark-grass': '#4D7A2D',
  'grass': '#68A741',
  'light-grass': '#87C363',
  'full-light-grass': '#A9D39A',

  // ELECTRIC
  'dark-electric': '#B58A19',
  'electric': '#E0B728',
  'light-electric': '#F7D450',
  'full-light-electric': '#FBE88F',

  // PSYCHIC
  'dark-psychic': '#A12D5F',
  'psychic': '#DC4C75',
  'light-psychic': '#F16B93',
  'full-light-psychic': '#F7A3C2',

  // ICE
  'dark-ice': '#4F8D8A',
  'ice': '#78B7B5',
  'light-ice': '#97D4D2',
  'full-light-ice': '#C1E3E0',

  // DRAGON
  'dark-dragon': '#40239B',
  'dragon': '#5930CE',
  'light-dragon': '#7652E4',
  'full-light-dragon': '#9B84F2',

  // DARK
  'dark-dark': '#4A362A',
  'dark': '#5D4739',
  'light-dark': '#796456',
  'full-light-dark': '#A28A74',

  // FAIRY
  'dark-fairy': '#9B5779',
  'fairy': '#C07D9B',
  'light-fairy': '#DE9CB7',
  'full-light-fairy': '#F3C1D2',

  // UNKNOWN
  'unknown': '#BFBFBF',
  'light-unknown': '#F2F2F2'
};


function struct() {
  const listColor = []
  for(const key in elementsColors) {
    listColor.push(`bg-${key}`);
  }
  return listColor;
}

const listElementsColor = struct();

const allColors = {
  ...colors,
  ...elementsColors
}

import tailwindForms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  safelist: listElementsColor,
  theme: {
    extend: {
      colors: allColors,
      borderRadius: {
        'pattern': '0.625rem',
        '25px': '1.5625rem',
        '20px': '1.25rem'
      },
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fill, minmax(90px, 1fr))',
        'content-info' : '1fr 1fr 1fr 1fr',
      },
      gridTemplateRows: {
        'auto-fit': 'repeat(auto-fill, minmax(90px, 1fr))',
        'content-row': '1.5rem 1fr 1fr'
      }
    },
  },
  plugins: [
    tailwindForms(),
   
  ],
}

