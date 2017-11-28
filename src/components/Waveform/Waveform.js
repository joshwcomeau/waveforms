// @flow
import React from 'react';

import { WAVEFORM_ASPECT_RATIO } from '../../constants';
import {
  getPathForWaveformShape,
  getTracePosition,
} from '../../helpers/waveform.helpers';

import type { WaveformShape } from '../../types';

const VIEWBOX_WIDTH = 200;
const VIEWBOX_HEIGHT = VIEWBOX_WIDTH * WAVEFORM_ASPECT_RATIO;

export type Props = {
  shape: WaveformShape,
  // 'size' will be used for the width, and the height will be derived, using
  // the ASPECT_RATIO constant.
  size?: number,
  // Line color for the waveform line.
  // TODO: Find a way to support other line features (width, endcap) in a nice
  // way?
  color?: string,
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
  size = VIEWBOX_WIDTH,
  color = 'black',
  frequency = 1,
  amplitude = 1,
  offset,
}: Props) => {
  const width = size;
  const height = Math.round(size * WAVEFORM_ASPECT_RATIO);

  const svgPath = getPathForWaveformShape(
    shape,
    width,
    height,
    frequency,
    amplitude,
    offset,
  );

  console.log(svgPath);

  let tracePosition;
  if (typeof offset === 'number') {
    // tracePosition = getTracePosition(
    //   shape,
    //   VIEWBOX_WIDTH,
    //   VIEWBOX_HEIGHT,
    //   offset,
    // );
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      style={{ overflow: 'visible' }}
    >
      <path stroke="black" fill="none" d={svgPath} />

      {tracePosition && (
        <circle cx={tracePosition.x} cy={tracePosition.y} r={5} fill="red" />
      )}
    </svg>
  );
};

export default Waveform;
