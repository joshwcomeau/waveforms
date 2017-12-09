// @flow
import { convertPercentageToSinePosition } from './sine.helpers';
import { range } from '../utils';

import type { WaveformShape, WaveformPoints } from '../types';

/**
 * This method gets an array of axis-relative points that can be used for
 * further calculations.
 * Given a waveform shape, and some information about its frequency/offset/size,
 * this method returns an array of X/Y values that describes the waveform.
 * This is NOT plot-ready, since the Y values range from -1 to 1.
 * Further processing is required to get something drawable.
 */
export const getPointsForWaveform = (
  shape: WaveformShape,
  frequency: number,
  width: number,
  offset: number = 0,
): Array<WaveformPoints> => {
  // Get an array of `x` values.
  // For now, we're drawing lines at every second point, for performance.
  // After experimentation, this may change.
  const ratioBetweenPointsAndPixels = 2;
  const xValues = range(0, width + 1, ratioBetweenPointsAndPixels);

  // Convert each X value to a proper coordinate system, relative to the axis
  // (so, Y values will be from -1 to 1)
  return xValues.map(x => {
    const progress = x / width * 100 + offset;

    return {
      x,
      y: getPositionAtPointRelativeToAxis(shape, frequency, progress),
    };
  });
};

export const createPathFromWaveformPoints = (
  points: Array<WaveformPoints>,
  height: number,
) => {
  // The points provided to this method will range in y-value from -1 to 1.
  // This is mathematically pure, but it's not something our SVG can understand.
  // Convert this -1:1 range to a 0:height range.
  const drawablePoints = points.map(({ x, y }) => ({
    x,
    y: translateAxisRelativeYValue(y, height),
  }));

  // Finally, let's create the `path` string that the SVG can use.
  return drawablePoints.reduce((acc, { x, y }, index) => {
    // For the very first point, we have to Move to that area
    if (index === 0) {
      return `M ${x},${y} `;
    }

    // For all subsequent points, we can just draw a line to it.
    return `${acc} L ${x},${y}`;
  }, '');
};

/**
 * Given progress between 0 and 100, figure out the Y position, relative
 * to the X axis (from 1 to -1)
 */
export const getPositionAtPointRelativeToAxis = (
  shape: WaveformShape,
  frequency: number,
  progress: number,
) => {
  switch (shape) {
    case 'sine': {
      // Each sine cycle is 2Pi long, in trigonometry terms.
      // The frequency determines how many cycles are in the available space.
      const cycleLength = Math.PI * 2;
      const totalLength = cycleLength * frequency;

      // Right now, `progress` ranges from 0 to 100.
      // Normalize this value to fit between 0 and `totalLength`
      // (just cross-multiplying to get the normalized value).
      // prettier-ignore
      const positionInRads = (progress * totalLength) / 100;

      // Now we can simply take the sin of the rad position to get a value,
      // from -1 to 1
      return Math.sin(positionInRads);
    }

    default:
      throw new Error('Unrecognized waveform shape supplied: ' + shape);
  }
};

const translateAxisRelativeYValue = (
  // a value from -1 to 1 (relative to the axis)
  yValue: number,
  // The height in pixels of our waveform drawing
  height: number,
) => {
  // Invert the y value. This is so that negative values are below the line,
  // while positive ones are above it.
  yValue *= -1;

  // Start by changing the range of the yValue:
  // -1...1 -> 0...2
  const incrementedYValue = yValue + 1;

  // Now we can just cross-multiply!
  //     Y              X
  //  ------    =    ------
  //     2           height
  //
  // prettier-ignore
  return (incrementedYValue * height) / 2;
};

export const getInterceptPosition = (
  shape: WaveformShape,
  height: number,
  frequency: number,
  progress: number,
) => {
  const relativePosition = getPositionAtPointRelativeToAxis(
    shape,
    frequency,
    progress,
  );

  return translateAxisRelativeYValue(relativePosition, height);
};
