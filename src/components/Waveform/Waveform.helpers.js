// @flow
import type { WaveformShape } from '../../types';

export const getPathForWaveformShape = (shape: WaveformShape) => {
  switch (shape) {
    case 'sine':
      return 'M10 80  C 40 10, 65 10, 95 80 S 150 150, 180 80';
    default:
      return 'M0,0 L100,100';
  }
};

export const getPositionAtPointRelativeToAxis = (
  shape: WaveformShape,
  percentage
) => {
  switch (shape) {
    case 'sine': {
      // We know that the sine waveform starts at 0, and includes 1 whole cycle.
      // 1 cycle is 2Pi, and so the total distance is 3.14159 * 2 ~= 6.28319.
      // So, the first thing to do is convert our percentage from 0-99, to rads
      // from 0-6.28319.

      const totalLength = Math.PI * 2;

      // prettier-ignore
      const positionInRads = (percentage * totalLength) / 99;

      // Now we can simply take the sin of the rad position to get a value,
      // from -1 to 1
      return Math.sin(positionInRads);
    }
  }
};

/**
 * getTracePosition
 * A helper that figures out where to put the "Current position" indicator.
 * Returns X/Y coordinates relative to the SVG's viewbox
 */
export const getTracePosition = (
  shape: WaveformShape,
  width: number,
  height: number,
  percentage: number
) => {
  // `percentage` is a number between 0 and 99, representing where within
  // the path a circle should be drawn.
  // The X coordinate is easy; it's just proportional to the width of the SVG.

  // prettier-ignore
  const tracePositionX = (percentage * width) / 99;

  // The Y coordinate is trickier, and will take some steps.
  // First, let's get the point relative to the axis (so, between -1 and 1):
  const relativePositionY = getPositionAtPointRelativeToAxis(shape, percentage);

  // Then, we need to convert relative Y position to absolute.
  // To do the cross-multiplication, we need to increment the range so that it's
  // positive: from -1-1 to 0-2
  const positiveRelativePositionY = relativePositionY + 1;
  const maxPositiveRelativePositionY = 2;
  // Next, cross-multiply, to get its value from 0-VIEWBOX_HEIGHT

  // prettier-ignore
  const tracePositionY = (
    positiveRelativePositionY * height / maxPositiveRelativePositionY
  );

  return { x: tracePositionX, y: tracePositionY };
};
