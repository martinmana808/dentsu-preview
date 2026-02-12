import type { RangeInfo, SizeInfo } from './types';

export const ALL_SECTIONS = [
  'headline', 
  'description', 
  'coverImage', 
  'photoCredits', 
  'logoBottomRight', 
  'logoBottomLeft', 
  'fontColour'
];

export const RANGES: RangeInfo[] = [
  { id: 'small', label: '<480px', start: 0, end: 479, overrides: ['headline', 'fontColour'] },
  { id: 'medium', label: '480px - 768px', start: 480, end: 768, overrides: ['description'] },
  { id: 'large', label: '768px - 1024px', start: 768, end: 1024, overrides: ['coverImage'] },
  { id: 'xlarge', label: '1024px - 1440px', start: 1024, end: 1440, overrides: ['logoBottomRight'] },
  { id: 'huge', label: '1440px - 2000px', start: 1440, end: 2000, overrides: ['photoCredits'] },
  { id: 'ultra', label: '>2000px', start: 2000, end: 9999, overrides: ['logoBottomLeft'] }
];

export const SIZES: SizeInfo[] = [
  { 
    id: '300x600', width: 300, height: 600, label: '300x600', 
    rangeIds: ['small'], 
    overrides: ['description'] 
  },
  { 
    id: '945x315', width: 945, height: 315, label: '945x315', 
    rangeIds: ['large'], 
    overrides: ['headline', 'coverImage'] 
  },
  { 
    id: '2160x3840', width: 2160, height: 3840, label: '2160x3840', 
    rangeIds: ['ultra'], 
    overrides: ['fontColour', 'logoBottomRight'] 
  },
  { 
    id: '900x200', width: 900, height: 200, label: '900x200', 
    rangeIds: ['large', 'medium'], 
    overrides: ['photoCredits'] 
  },
  { 
    id: '1024x768', width: 1024, height: 768, label: '1024x768', 
    rangeIds: ['xlarge'], 
    overrides: ['description', 'logoBottomLeft'] 
  },
  { 
    id: '640x480', width: 640, height: 480, label: '640x480', 
    rangeIds: ['medium'], 
    overrides: [] 
  },
  { 
    id: '640x960', width: 640, height: 960, label: '640x960', 
    rangeIds: ['medium'], 
    overrides: ['headline'] 
  }
];
