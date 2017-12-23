// @flow
import React from 'react';
import styled from 'styled-components';

import { DEFAULT_WAVEFORM_SHAPE, COLORS } from '../../constants';
import { range } from '../../utils';
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
      maxNumberToGenerate: 9,
    }),
  ];

  const NUMBER_OF_X_AXIS_POINTS = 20;
  const STEP = 1;

  const MAX_FREQUENCY = baseFrequency * NUMBER_OF_X_AXIS_POINTS * STEP;

  const xAxisValues = range(1, NUMBER_OF_X_AXIS_POINTS * STEP - 1, STEP).map(
    index => ({
      label: index % 2 !== 0 ? baseFrequency * index + 'Hz' : '',
      position: VIEWBOX_WIDTH * (index / NUMBER_OF_X_AXIS_POINTS / STEP),
    })
  );

  const amplitudeLines = range(1, 10).map(i => (
    <AmplitudeLine
      key={i}
      x1={0}
      y1={VIEWBOX_HEIGHT * (i / 10)}
      x2={VIEWBOX_WIDTH}
      y2={VIEWBOX_HEIGHT * (i / 10)}
    />
  ));

  return (
    <svg
      style={{ overflow: 'visible' }}
      width={width}
      height={height}
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
    >
      {amplitudeLines}

      {harmonics.map(({ frequency, amplitude }, index) => {
        // We need to figure out where in our scale this frequency falls.
        // If we have a frequency of 5hz when the range is 0-10hz, it should
        // be drawn halfway through the viewBOx width
        const progress = frequency / MAX_FREQUENCY;
        const xCoordinate = VIEWBOX_WIDTH * progress;

        const yCoordinate =
          VIEWBOX_HEIGHT - VIEWBOX_HEIGHT * Math.abs(amplitude);

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

      {/* X Axis */}
      <Axis x1={0} y1={VIEWBOX_HEIGHT} x2={VIEWBOX_WIDTH} y2={VIEWBOX_HEIGHT} />
      {/* Y Axis */}
      <Axis x1={0} y1={0} x2={0} y2={VIEWBOX_HEIGHT} />

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
    </svg>
  );
};

const Axis = styled.line`
  stroke: ${COLORS.gray[700]};
  stroke-width: 0.5;
  stroke-linecap: round;
`;

const AmplitudeLine = styled.line`
  stroke: ${COLORS.gray[300]};
  stroke-width: 0.1;
`;

const Bar = styled.line`
  stroke: ${COLORS.primary[500]};
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
`;

export default FrequencyGraph;
