export type WaveformShape = 'sine' | 'triangle' | 'square' | 'sawtooth';
export type WaveformPoint = { x: number, y: number };

export type IntroStep =
  | '1-introduction'
  | '2-intro-with-labels'
  | '3-y-axis-amplitude'
  | '4-x-axis-time';
