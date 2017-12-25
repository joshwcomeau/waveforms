// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { DEFAULT_WAVEFORM_SHAPE, COLORS } from '../../constants';
import { range, roundTo } from '../../utils';
import { getHarmonicsForWave } from '../../helpers/waveform.helpers';

import Aux from '../Aux';

import type { WaveformShape } from '../../types';

type Props = {
  width?: number,
  shape: WaveformShape,
  baseFrequency: number,
  baseAmplitude: number,
  xMin: number,
  xMax: number,
  step: number,
};

type State = {
  hovering: ?string,
};

const ASPECT_RATIO = 0.6;

const VIEWBOX_WIDTH = 100;
const VIEWBOX_HEIGHT = VIEWBOX_WIDTH * ASPECT_RATIO;

class FrequencyGraph extends PureComponent<Props, State> {
  static defaultProps = {
    shape: DEFAULT_WAVEFORM_SHAPE,
    baseFrequency: 1,
    baseAmplitude: 1,
    xMin: 0,
    xMax: 20,
    step: 1,
  };

  getXAxisValues = () => {
    const { xMin, xMax, step } = this.props;

    const xAxisValuesStart = xMin + step;
    const xAxisValuesEnd = xMax * step;

    const xAxisValues = range(xAxisValuesStart, xAxisValuesEnd, step).map(
      index => ({
        label: index % 2 === 0 ? index + 'Hz' : '',
        position: VIEWBOX_WIDTH * (index / xMax / step),
      })
    );

    const yAxisValues = range(0, 0.9, 0.1).map(index => ({
      label: index % 0.5 === 0 ? 1 - index : '',
      position: VIEWBOX_HEIGHT * (index / 1),
    }));

    return { xAxisValues, yAxisValues };
  };

  renderBars() {
    const { baseFrequency, baseAmplitude, shape, xMax } = this.props;
    const harmonics = [
      { frequency: baseFrequency, amplitude: baseAmplitude },
      ...getHarmonicsForWave({
        shape,
        baseFrequency,
        baseAmplitude,
        maxNumberToGenerate: xMax,
      }),
    ];

    // Filter out any harmonics that are too high-frequency to draw.
    const drawableHarmonics = harmonics.filter(
      harmonic => harmonic.frequency < xMax
    );

    return drawableHarmonics.map(({ frequency, amplitude }, index) => {
      // We need to figure out where in our scale this frequency falls.
      // If we have a frequency of 5hz when the range is 0-10hz, it should
      // be drawn halfway through the viewBOx width
      const progress = frequency / xMax;
      const xCoordinate = VIEWBOX_WIDTH * progress;

      const yCoordinate = VIEWBOX_HEIGHT - VIEWBOX_HEIGHT * Math.abs(amplitude);

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
    });
  }

  render() {
    // const {
    //   shape,
    //   baseFrequency,
    //   baseAmplitude,
    //   xMin,
    //   xMax,
    //   step,
    // } = this.props;

    // For our X axis values, we'll add as many points as are specified by our
    // props.
    const { xAxisValues, yAxisValues } = this.getXAxisValues();

    const backgroundLines = range(0, 10).map(i => (
      <BackgroundLine
        key={i}
        x1={0}
        y1={VIEWBOX_HEIGHT * (i / 10)}
        x2={VIEWBOX_WIDTH}
        y2={VIEWBOX_HEIGHT * (i / 10)}
      />
    ));

    return (
      <FrequencyGraphSvg viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}>
        {backgroundLines}

        {this.renderBars()}

        {/* X Axis */}
        <Axis
          x1={0}
          y1={VIEWBOX_HEIGHT}
          x2={VIEWBOX_WIDTH + 3}
          y2={VIEWBOX_HEIGHT}
        />
        <AxisLabel x={VIEWBOX_WIDTH} y={VIEWBOX_HEIGHT} dx={-13} dy={10}>
          Frequency
        </AxisLabel>

        {/* Y Axis */}
        <Axis x1={0} y1={-3} x2={0} y2={VIEWBOX_HEIGHT} />
        <AxisLabel x={0} y={0} dx={-10} dy={0} transform="rotate(270,23,27)">
          Amplitude
        </AxisLabel>

        {xAxisValues.map(({ label, position }, index) => (
          <Aux key={index}>
            <AxisNub
              x1={position}
              y1={VIEWBOX_HEIGHT}
              x2={position}
              y2={VIEWBOX_HEIGHT + (label ? 2 : 1)}
            />
            <AxisNubLabel x={position} y={VIEWBOX_HEIGHT + 5} dx={-2}>
              {label}
            </AxisNubLabel>
          </Aux>
        ))}

        {yAxisValues.map(({ label, position }, index) => (
          <Aux key={index}>
            <AxisNub x1={label ? -2 : -1} y1={position} x2={0} y2={position} />
            <AxisNubLabel x={-5} y={position} dx={-0.5} dy={0.85}>
              {label}
            </AxisNubLabel>
          </Aux>
        ))}
      </FrequencyGraphSvg>
    );
  }
}

const FrequencyGraphSvg = styled.svg`
  overflow: visible;
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 5rem;
`;

const Axis = styled.line`
  stroke: ${COLORS.gray[700]};
  stroke-width: 0.5;
  stroke-linecap: round;
`;

const AxisLabel = styled.text`
  font-size: 3px;
  font-weight: bold;
`;

const AxisNub = styled.line`
  stroke: ${COLORS.gray[700]};
  stroke-width: 0.25;
`;

const BackgroundLine = styled.line`
  stroke: ${COLORS.gray[300]};
  stroke-width: 0.1;
`;

const Bar = styled.line`
  stroke: ${COLORS.primary[500]};
  stroke-width: 2;
`;

const AxisNubLabel = styled.text`
  /*
    Because we're using viewBox, font sizes are scaled. This very-tiny number
    ought to become larger when used in my imagined usecase.
    TODO: this should really be an absolute value - pass the ratio between
    width and viewBox width so that it can be calculated dynamically?
  */
  font-size: 2.5px;
`;

export default FrequencyGraph;
