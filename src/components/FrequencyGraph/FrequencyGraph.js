// @flow
import React from 'react';
import styled from 'styled-components';

import { DEFAULT_WAVEFORM_SHAPE } from '../../constants/index';
import { getHarmonicsForWave } from '../../helpers/waveform.helpers';

import Aux from '../Aux';

import type { WaveformShape } from '../../types';

type Props = {
  width?: number,
  shape?: WaveformShape,
  baseFrequency?: number,
  baseAmplitude?: number,
};

const ASPECT_RATIO = 0.6;

const VIEWBOX_WIDTH = 100;
const VIEWBOX_HEIGHT = VIEWBOX_WIDTH * ASPECT_RATIO;

const FrequencyGraph = ({
  width = 500,
  shape = DEFAULT_WAVEFORM_SHAPE,
  baseFrequency = 1,
  baseAmplitude = 1,
}: Props) => {
  const height = width * ASPECT_RATIO;

  const harmonics = [
    { frequency: baseFrequency, amplitude: baseAmplitude },
    ...getHarmonicsForWave({
      shape,
      baseFrequency,
      baseAmplitude,
      maxNumberToGenerate: 8,
    }),
  ];

  console.log(harmonics);

  const xAxisValues = [
    { label: baseFrequency * 1 + 'Hz', position: VIEWBOX_WIDTH * 0.1 },
    { label: baseFrequency * 2 + 'Hz', position: VIEWBOX_WIDTH * 0.2 },
    { label: baseFrequency * 3 + 'Hz', position: VIEWBOX_WIDTH * 0.3 },
    { label: baseFrequency * 4 + 'Hz', position: VIEWBOX_WIDTH * 0.4 },
    { label: baseFrequency * 5 + 'Hz', position: VIEWBOX_WIDTH * 0.5 },
    { label: baseFrequency * 6 + 'Hz', position: VIEWBOX_WIDTH * 0.6 },
    { label: baseFrequency * 7 + 'Hz', position: VIEWBOX_WIDTH * 0.7 },
    { label: baseFrequency * 8 + 'Hz', position: VIEWBOX_WIDTH * 0.8 },
    { label: baseFrequency * 9 + 'Hz', position: VIEWBOX_WIDTH * 0.9 },
  ];

  return (
    <svg
      style={{ overflow: 'visible' }}
      width={width}
      height={height}
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
    >
      <XAxis
        x1={0}
        y1={VIEWBOX_HEIGHT}
        x2={VIEWBOX_WIDTH}
        y2={VIEWBOX_HEIGHT}
      />
      {xAxisValues.map(({ label, position }, index) => (
        <Aux key={index}>
          <line
            x1={position}
            y1={VIEWBOX_HEIGHT}
            x2={position}
            y2={VIEWBOX_HEIGHT + 2}
            stroke="black"
            strokeWidth={0.25}
          />
          <AxisLabel x={position} y={VIEWBOX_HEIGHT + 5} dx={-2}>
            {label}
          </AxisLabel>
        </Aux>
      ))}
      {harmonics.map(({ frequency, amplitude }, index) => {
        // We need to figure out where in our scale this frequency falls.
        // If we have a frequency of 5hz when the range is 0-10hz, it should
        // be drawn halfway through the viewBOx width
        const progress = frequency / (baseFrequency * 10);
        const xCoordinate = VIEWBOX_WIDTH * progress;

        const yCoordinate = VIEWBOX_HEIGHT - VIEWBOX_HEIGHT * amplitude;

        return (
          <Aux key={index}>
            <Bar
              x1={xCoordinate}
              y1={VIEWBOX_HEIGHT}
              x2={xCoordinate}
              y2={yCoordinate}
            />
          </Aux>
        );
      })}
    </svg>
  );
};

const XAxis = styled.line`
  stroke: black;
  stroke-width: 0.5;
`;

const Bar = styled.line`
  stroke: red;
  stroke-width: 2;
`;

const AxisLabel = styled.text`
  /*
    Because we're using viewBox, font sizes are scaled. This very-tiny number
    ought to become larger when used in my imagined usecase.
    TODO: this should really be an absolute value - pass the ratio between
    width and viewBox width so that it can be calculated dynamically?
  */
  font-size: 2.5px;
  font-family: ;
`;

export default FrequencyGraph;
