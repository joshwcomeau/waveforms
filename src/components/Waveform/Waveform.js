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
  // How many cycles of the waveform should be drawn in the available space?
  // Another way to think of this is frequency.
  // Let's say that the graph's X axis is 1 second of time.
  // If that's the case, then a single cycle represents 1 Hz (since if you were
  // to loop playing it, you'd get 1 cycle per second). By specifying another
  // value (eg. `5 cycles`), your waveform would repeat 5 times in 1 second,
  // and have a frequency value of 5 Hz.
  // NOTE: There is no actual unit for the X axis, "1 second" is just an example
  cycles?: number,
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
  cycles = 1,
  offset,
}: Props) => {
  const width = size;
  const height = Math.round(size * WAVEFORM_ASPECT_RATIO);

  const svgPath = getPathForWaveformShape(shape, width, height, cycles, offset);

  let tracePosition;
  if (typeof offset === 'number') {
    tracePosition = getTracePosition(
      shape,
      VIEWBOX_WIDTH,
      VIEWBOX_HEIGHT,
      offset,
    );
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
