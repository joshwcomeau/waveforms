// @flow
import React from 'react';

import {
  WAVEFORM_ASPECT_RATIO,
  DEFAULT_WAVEFORM_SIZE,
  DEFAULT_WAVEFORM_FREQUENCY,
  DEFAULT_WAVEFORM_AMPLITUDE,
} from '../../constants';
import {
  getPointsForWaveform,
  createPathFromWaveformPoints,
} from '../../helpers/waveform.helpers';

import type { WaveformShape } from '../../types';

export type Props = {
  // In most cases, the Waveform simply requires an enum waveform shape, like
  // 'sine' or 'square'.
  shape?: WaveformShape,
  // In certain cases (eg. waveform addition), it's more helpful to provide an
  // array of points, instead of a `shape`. The Waveform will simply plot those
  // points, in that case.
  points?: Array<{ x: number, y: number }>,
  // 'size' will be used for the width, and the height will be derived, using
  // the ASPECT_RATIO constant.
  size?: number,
  // Line color for the waveform line.
  // TODO: Find a way to support other line features (width, endcap) in a nice
  // way?
  color?: string,
  strokeWidth?: number,
  // Frequency is the number of cycles to squeeze into this waveform
  // visualization. The default value of `1` means that it plays at 1Hz, and
  // displays a single cycle in the visible space. A value of `5` would
  // render the waveform 5 times in the same amount of space.
  frequency?: number,
  // Amplitude is the strength of the waveform (AKA loudness, volume).
  // it can range from 0 to 1, and affects how 'tall' the waveform is.
  amplitude?: number,
  // At what point in the waveform should the drawing start?
  // By default, it starts at `0`, but any value between 0 and 99 can be
  // used.
  // This is useful for animating the waveform, by simply auto-incrementing
  // the value in a requestAnimationFrame loop!
  offset?: number,
};

const Waveform = ({
  shape,
  points,
  size = DEFAULT_WAVEFORM_SIZE,
  color = 'black',
  strokeWidth = 1,
  frequency = DEFAULT_WAVEFORM_FREQUENCY,
  amplitude = DEFAULT_WAVEFORM_AMPLITUDE,
  offset = 0,
}: Props) => {
  const width = size;
  const height = Math.round(size * WAVEFORM_ASPECT_RATIO);

  if (typeof shape !== 'string' && !Array.isArray(points)) {
    throw new Error(
      'Waveform requires either a `shape` string, or an array ' +
        'of `points`. Please provide one of the two.'
    );
  }

  if (typeof points === 'undefined') {
    points = getPointsForWaveform({
      shape,
      frequency,
      amplitude,
      width,
      offset,
    });
  }

  const svgPath = createPathFromWaveformPoints(points, height);

  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      <path
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
        d={svgPath}
      />
    </svg>
  );
};

export default Waveform;
