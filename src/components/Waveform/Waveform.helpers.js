// @flow
import { convertPercentageToSinePosition } from '../../helpers/sine.helpers';
import { range } from '../../utils';

import type { WaveformShape } from '../../types';

export const getPathForWaveformShape = (
  shape: WaveformShape,
  width: number,
  height: number,
  cycles: number,
  startPercentage: number = 0
) => {
  const offset = startPercentage * width / 100;

  switch (shape) {
    case 'sine': {
      const startPosition = getTracePosition(
        shape,
        width,
        height,
        startPercentage,
        offset
      );

      let path = `M ${startPosition.x},${startPosition.y} `;

      return range(
        startPercentage,
        startPercentage + 100
      ).reduce((acc, index) => {
        const { x, y } = getTracePosition(shape, width, height, index, offset);

        return `${acc} L ${x},${y} `;
      }, path);
    }
    default:
      return 'M0,0 L100,100';
  }
};

/**
 * Given an X percentage between 0 and 99, figure out the Y position, relative
 * to the X axis (from 1 to -1)
 */
export const getPositionAtPointRelativeToAxis = (
  shape: WaveformShape,
  index: number
) => {
  switch (shape) {
    case 'sine': {
      // We know that the sine waveform starts at 0, and includes 1 whole cycle.
      // 1 cycle is 2Pi, and so the total distance is 3.14159 * 2 ~= 6.28319.
      // So, the first thing to do is convert our index from 0-99, to rads
      // from 0-6.28319.

      const totalLength = Math.PI * 2;

      // prettier-ignore
      const positionInRads = (index * totalLength) / 99;

      // Now we can simply take the sin of the rad position to get a value,
      // from -1 to 1
      return Math.sin(positionInRads);
    }
  }
};

const getViewboxValueForPoint = (x, y, width, height) => {
  // x: from 0 to 1
  // y: from -1 to 1
  const viewboxValueX = x * width;

  // Convert y t
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
  index: number,
  offset: number
) => {
  // `index` is a number between 0 and 99, representing where within
  // the path a circle should be drawn.
  // The X coordinate is easy; it's just proportional to the width of the SVG.

  // prettier-ignore
  const tracePositionX = (index * width) / 99 - offset;

  // The Y coordinate is trickier, and will take some steps.
  // First, let's get the point relative to the axis (so, between -1 and 1):
  const relativePositionY = getPositionAtPointRelativeToAxis(shape, index);

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
