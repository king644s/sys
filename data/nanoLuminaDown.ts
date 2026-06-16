import { ProductFinish } from '../types';

const nanoBlackOut = '/assets/NanoLuminaDown/black - 2 out.png';
const nanoBlack1 = '/assets/NanoLuminaDown/black - 1.png';
const nanoBlack3 = '/assets/NanoLuminaDown/balck - 3.png';
const nanoGold = '/assets/NanoLuminaDown/gold.png';
const nanoCyan = '/assets/NanoLuminaDown/cyan.png';
const nanoWhite = '/assets/NanoLuminaDown/white.png';

export const NANO_LUMINA_LISTING_IMAGE = nanoBlackOut;

export const NANO_LUMINA_FINISHES: ProductFinish[] = [
  {
    id: 'black',
    label: 'Matte Black',
    swatch: '#1C1C1F',
    images: [nanoBlackOut, nanoBlack1, nanoBlack3],
  },
  {
    id: 'gold',
    label: 'Sand Gold',
    swatch: '#C9A96E',
    images: [nanoGold],
  },
  {
    id: 'cyan',
    label: 'Architectural Cyan',
    swatch: '#22D3EE',
    images: [nanoCyan],
  },
  {
    id: 'white',
    label: 'Pure White',
    swatch: '#F5F5F7',
    images: [nanoWhite],
  },
];

export const NANO_LUMINA_IMAGES = NANO_LUMINA_FINISHES[0].images;
