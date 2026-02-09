import type { AdFormat } from './types';

export const ALL_SECTIONS = [
  'headline', 
  'description', 
  'coverImage', 
  'photoCredits', 
  'logoBottomRight', 
  'logoBottomLeft', 
  'fontColour'
];

const getRandomOverrides = () => {
  const shuffled = [...ALL_SECTIONS].sort(() => 0.5 - Math.random());
  const count = Math.floor(Math.random() * 3); // 0 to 2 overrides
  return shuffled.slice(0, count);
};

export const SIZES: (AdFormat & { overrides: string[] })[] = [
  { width: 300, height: 600, label: '300x600', overrides: getRandomOverrides() },
  { width: 945, height: 315, label: '945x315', overrides: getRandomOverrides() },
  { width: 2160, height: 3840, label: '2160x3840', overrides: getRandomOverrides() },
  { width: 900, height: 200, label: '900x200', overrides: getRandomOverrides() },
  { width: 1024, height: 768, label: '1024x768', overrides: getRandomOverrides() },
  { width: 640, height: 480, label: '640x480', overrides: getRandomOverrides() },
  { width: 640, height: 960, label: '640x960', overrides: getRandomOverrides() }
];

export const RANGES = [
  { label: '<480px', start: 0, end: 479, overrides: getRandomOverrides() },
  { label: '480px - 768px', start: 480, end: 768, overrides: getRandomOverrides() },
  { label: '768px - 1024px', start: 768, end: 1024, overrides: getRandomOverrides() },
  { label: '1024px - 1440px', start: 1024, end: 1440, overrides: getRandomOverrides() },
  { label: '1440px - 2000px', start: 1440, end: 2000, overrides: getRandomOverrides() },
  { label: '>2000px', start: 2000, end: 9999, overrides: getRandomOverrides() }
];
