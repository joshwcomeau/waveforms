// @flow
import { convertPercentageToSinePosition } from './sine.helpers';
import { range } from '../utils';

import type { WaveformShape } from '../types';

export const getPathForWaveformShape = (
  shape: WaveformShape,
  width: number,
  height: number,
  // Frequency refers to the waveform frequency (in Hz), although it's used
  // here to control the "density" of the waveform.
  // 1Hz = 1 cycle, 5Hz = 5 cycles
  frequency?: number = 1,
  // Amplitude refers to the waveform amplitude. Ranges from 0 to 1.
  amplitude?: number = 1,
  // Offset is a number between 0 and 1, and represents the progress through
  // the current 'cycle' of the waveform. For example, 0.5 means that the
  // drawing should start halfway through the waveform and loop from there.
  offset?: number = 0,
) => {
  // We're gonna be lazy and just draw straight lines between near points. If
  // we do this densely enough, it should look just fine.

  // If our width is 300, we want 150 `x` values.
  const totalPoints = width / 2;
  // Get an array of `x` values. Because we're doing every second one, it ought
  // to look like `[0, 2, 4, 6, ..., 150]
  const xValues = range(0, totalPoints + 1, 2);

  // Convert each X value to a proper coordinate system, relative to the axis
  // (so, Y values will be from -1 to 1)
  const relativeAxisPoints = xValues.map(x => {
    const progress = x / totalPoints * 100;

    return {
      x,
      y: getPositionAtPointRelativeToAxis(shape, progress, frequency),
    };
  });

  // Next, we need to convert our axis-relative values into something we can
  // use to draw the line. While in math terms, the Y-values ranges from
  // -1 to 1, we instead need them to range from 0 to `height`.
  const drawablePoints = relativeAxisPoints.map(({ x, y }) => ({
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

  // const startPercentage = offset * width / 100;

  // // const totalPoints = offset + 100 * frequency;

  // switch (shape) {
  //   case 'sine': {
  //     const startPosition = getTracePosition(
  //       shape,
  //       width,
  //       height,
  //       offset,
  //       startPercentage,
  //     );

  //     let path = `M ${startPosition.x},${startPosition.y} `;

  //     return range(offset, totalPoints).reduce((acc, index) => {
  //       const { x, y } = getTracePosition(shape, width, height, index, offset);

  //       return `${acc} L ${x},${y} `;
  //     }, path);
  //   }
  //   default:
  //     return 'M0,0 L100,100';
  // }
};

/**
 * Given progress between 0 and 100, figure out the Y position, relative
 * to the X axis (from 1 to -1)
 */
export const getPositionAtPointRelativeToAxis = (
  shape: WaveformShape,
  progress: number,
  frequency: number,
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
  }
};

const translateAxisRelativeYValue = (
  // a value from -1 to 1 (relative to the axis)
  yValue: number,
  // The height in pixels of our waveform drawing
  height: number,
) => {
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
  offset: number,
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
