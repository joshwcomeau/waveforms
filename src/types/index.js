export type Linecap = 'square' | 'round' | 'butt';

export type WaveformShape = 'sine' | 'triangle' | 'square' | 'sawtooth';
export type WaveformPoint = { x: number, y: number };

export type IntroStep =
  | '0-title'
  | '1-about-this-thing'
  | '2-intro-with-labels'
  | '3-y-axis-amplitude'
  | '4-x-axis-time';
