// @flow
type fadeWithContextArgs = {
  oscillator: OscillatorNode,
  direction: 'in' | 'out',
  output: GainNode,
  maxAmplitude?: number,
  duration?: number,
};

export const fadeWithContext = (context: AudioContext) => ({
  oscillator,
  direction,
  output,
  maxAmplitude = 1,
  duration = 0.015,
}: fadeWithContextArgs) => {
  const now = context.currentTime;
  const end = now + duration;
  output.gain.cancelScheduledValues(now);

  if (direction === 'in') {
    output.gain.setValueAtTime(0, now);
    output.gain.linearRampToValueAtTime(maxAmplitude, end);
    oscillator.start(now);
  } else if (direction === 'out') {
    output.gain.setValueAtTime(output.gain.value, now);
    output.gain.linearRampToValueAtTime(0, end);
    oscillator.stop(end);
  }
};
