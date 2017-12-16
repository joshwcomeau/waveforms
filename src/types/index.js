export type Linecap = 'square' | 'round' | 'butt';

export type WaveformShape = 'sine' | 'triangle' | 'square' | 'sawtooth';
export type WaveformPoint = { x: number, y: number };

export type IntroStep =
  | '0-title'
  | '1-about-this-thing'
  | '2-intro-with-labels'
  | '3-x-axis-time'
  | '4-y-axis-amplitude'
  | '5-y-axis-amplitude-with-control'
  | '6-cycle-introduction';
