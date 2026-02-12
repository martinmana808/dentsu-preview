export type AdFormat = {
  width: number;
  height: number;
  label: string;
};

export type PanelMode = 'global' | 'specific' | 'element';

export type SelectedElement = 'headline' | 'description' | 'coverImage' | 'photoCredits' | 'logoBottomLeft' | 'logoBottomRight' | null;

export type PropertyTab = 'global' | 'ranges' | 'sizes';

export interface RangeInfo {
  id: string;
  label: string;
  start: number;
  end: number;
  overrides: string[];
}

export interface SizeInfo extends AdFormat {
  id: string;
  rangeIds: string[];
  overrides: string[];
}
