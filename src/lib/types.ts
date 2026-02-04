export type AdFormat = {
  width: number;
  height: number;
  label: string;
};

export type PanelMode = 'global' | 'specific' | 'element';

export type SelectedElement = 'headline' | 'description' | 'coverImage' | 'photoCredits' | 'logoBottomLeft' | 'logoBottomRight' | null;

export type PropertyTab = 'global' | 'ranges' | 'sizes';
