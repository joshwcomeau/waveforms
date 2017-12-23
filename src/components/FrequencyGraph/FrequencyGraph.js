// @flow
import React from 'react';
import styled from 'styled-components';

import { DEFAULT_WAVEFORM_SHAPE, COLORS } from '../../constants';
import { range, roundTo } from '../../utils';
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
  shape = DEFAULT_WAVEFORM_SHAPE,
  baseFrequency = 1,
  baseAmplitude = 1,
}: Props) => {
  const harmonics = [
    { frequency: baseFrequency, amplitude: baseAmplitude },
    ...getHarmonicsForWave({
      shape,
      baseFrequency,
      baseAmplitude,
      maxNumberToGenerate: 20,
    }),
  ];

  const NUMBER_OF_X_AXIS_POINTS = 20;
  const STEP = 1;

  const MAX_FREQUENCY = baseFrequency * NUMBER_OF_X_AXIS_POINTS * STEP;

  // Filter out any harmonics that are too high-frequency to draw.
  const drawableHarmonics = harmonics.filter(
    harmonic => harmonic.frequency < MAX_FREQUENCY
  );

  const xAxisValues = range(1, NUMBER_OF_X_AXIS_POINTS * STEP - 1, STEP).map(
    index => ({
      label: index % 2 !== 0 ? roundTo(baseFrequency * index, 1) + 'Hz' : '',
      position: VIEWBOX_WIDTH * (index / NUMBER_OF_X_AXIS_POINTS / STEP),
    })
  );

  const yAxisValues = range(0, 0.9, 0.1).map(index => ({
    label: index % 0.5 === 0 ? index : '',
    position: VIEWBOX_HEIGHT * (index / 1),
  }));

  const amplitudeLines = range(0, 10).map(i => (
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
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
    >
      {amplitudeLines}

      {drawableHarmonics.map(({ frequency, amplitude }, index) => {
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
      <Axis
        x1={0}
        y1={VIEWBOX_HEIGHT}
        x2={VIEWBOX_WIDTH + 3}
        y2={VIEWBOX_HEIGHT}
      />
      {/* Y Axis */}
      <Axis x1={0} y1={-3} x2={0} y2={VIEWBOX_HEIGHT} />

      {xAxisValues.map(({ label, position }, index) => (
        <Aux key={index}>
          <AxisNub
            x1={position}
            y1={VIEWBOX_HEIGHT}
            x2={position}
            y2={VIEWBOX_HEIGHT + (label ? 2 : 1)}
          />
          <AxisLabel x={position} y={VIEWBOX_HEIGHT + 5} dx={-2}>
            {label}
          </AxisLabel>
        </Aux>
      ))}

      {yAxisValues.map(({ label, position }, index) => (
        <Aux key={index}>
          <AxisNub x1={label ? -2 : -1} y1={position} x2={0} y2={position} />
          <AxisLabel x={-5} y={position} dx={-0.5} dy={0.85}>
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

const AxisNub = styled.line`
  stroke: ${COLORS.gray[700]};
  stroke-width: 0.25;
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
