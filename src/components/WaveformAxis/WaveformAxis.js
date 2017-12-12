// @flow
import React from 'react';
import styled from 'styled-components';

import {
  COLORS,
  DEFAULT_WAVEFORM_SIZE,
  WAVEFORM_ASPECT_RATIO,
} from '../../constants/index';
import { range } from '../../utils';

import Aux from '../Aux';

import type { Linecap } from '../../types';

const TOP_AXIS_SPACING = 15;
const SIDE_AXIS_SPACING = 10;

type Props = {
  y: boolean,
  x: boolean,
  waveformSize?: number,
  color: string,
  strokeWidth: number,
  strokeLinecap: Linecap,
  numOfCycles: number,
  progress: number,
  showLabels: boolean,
};

const WaveformAxis = ({
  y = false,
  x = false,
  waveformSize = DEFAULT_WAVEFORM_SIZE,
  color = COLORS.gray[700],
  strokeWidth = 2,
  strokeLinecap,
  numOfCycles,
  progress,
  showLabels,
}: Props) => {
  // This represents a single axis. Only one of x/y may be passed.
  // I may create a thin wrapper that supplies both, but I like being able to
  // control their line styles individually. It gets messy otherwise.
  if (x && y) {
    throw new Error(
      'You provided both `x` and `y`, but these are mutually exclusive. Please supply a single axis to render to WaveformAxis'
    );
  }

  if (!x && !y) {
    throw new Error(
      'You need to specify either `x` or `y` for WaveformAxis. Which axis do you wish to show?'
    );
  }

  // We want our axes to have some "breathing room" around the waveform.
  // It would be inconvenient to need to position the waveform explicitly,
  // though.
  //
  // Happily, a semi-hacky workaround has presented itself.
  //
  // These axes will be positioned absolutely, and they will overflow their
  // parent. If they're placed in a 200x200 container, they'll actually take
  // up 220x230px space, spilling out over all 4 sides.
  //
  // This works because this project doesn't need the axes to be specifically
  // positioned; they'll be floating around in their own area. This trick
  // wouldn't work in most situations, but it does here.

  // prettier-ignore
  const width = waveformSize + (SIDE_AXIS_SPACING * 2);
  // prettier-ignore
  const height =
    (waveformSize * WAVEFORM_ASPECT_RATIO) + (TOP_AXIS_SPACING * 2);

  const halfHeight = Math.round(height / 2);

  return (
    <WaveformAxisSvg width={width} height={height}>
      {x &&
        showLabels &&
        range(0, numOfCycles, 0.5).map(i => {
          const constrainedXCoordinate =
            SIDE_AXIS_SPACING +
            width * i * (width - SIDE_AXIS_SPACING * 2) / width;

          return (
            <g>
              <line
                x1={constrainedXCoordinate}
                y1={0}
                x2={constrainedXCoordinate}
                y2={height}
                stroke={COLORS.gray[500]}
                strokeDasharray={5}
              />
              <text x={constrainedXCoordinate + 3} y={height / 2 + 20}>
                {i}s
              </text>
            </g>
          );
        })}
      {x ? (
        <line
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap={strokeLinecap}
          x1={0}
          y1={halfHeight}
          x2={width}
          y2={halfHeight}
        />
      ) : (
        <line
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap={strokeLinecap}
          x1={SIDE_AXIS_SPACING}
          y1={0}
          x2={SIDE_AXIS_SPACING}
          y2={height}
        />
      )}
    </WaveformAxisSvg>
  );
};

const WaveformAxisSvg = styled.svg`
  position: absolute;
  width: ${props => props.width + 'px'};
  height: ${props => props.height + 'px'};
  top: ${`-${TOP_AXIS_SPACING}px`};
  left: ${`-${SIDE_AXIS_SPACING}px`};
  overflow: visible;
`;

export default WaveformAxis;
