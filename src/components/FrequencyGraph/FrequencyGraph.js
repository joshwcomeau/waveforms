// @flow
import React, { Fragment, PureComponent } from 'react';
import styled from 'styled-components';

import { DEFAULT_WAVEFORM_SHAPE, COLORS } from '../../constants';
import { range, roundTo } from '../../utils';
import { getWaveforms } from '../../helpers/waveform.helpers';

import FadeTransition from '../FadeTransition';

import type { WaveformShape, WaveformType } from '../../types';

type Props = {
  shape: WaveformShape,
  type: WaveformType,
  baseFrequency: number,
  baseAmplitude: number,
  xMin: number,
  xMax: number,
  step: number,
};

type State = {
  hovering: ?number,
};

const ASPECT_RATIO = 0.6;

const VIEWBOX_WIDTH = 100;
const VIEWBOX_HEIGHT = VIEWBOX_WIDTH * ASPECT_RATIO;

class FrequencyGraph extends PureComponent<Props, State> {
  static defaultProps = {
    shape: DEFAULT_WAVEFORM_SHAPE,
    type: 'harmonics',
    baseFrequency: 1,
    baseAmplitude: 1,
    xMin: 0,
    xMax: 20,
    step: 1,
  };

  state = {
    hovering: null,
  };

  toggleHover = (index: ?number) => {
    this.setState({ hovering: index });
  };

  getXAxisValues = () => {
    const { xMin, xMax, step } = this.props;

    const xAxisValuesStart = xMin + step;
    const xAxisValuesEnd = xMax * step;

    const xAxisValues = range(xAxisValuesStart, xAxisValuesEnd, step).map(
      index => ({
        label: index % 2 !== 0 ? index + 'Hz' : '',
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
    const { baseFrequency, baseAmplitude, shape, type, xMax } = this.props;
    const harmonics = getWaveforms({
      harmonicsForShape: shape,
      type,
      baseFrequency,
      baseAmplitude,
      numOfHarmonics: shape === 'sawtooth' ? xMax * 2 : xMax,
    });

    // Filter out any harmonics that are too high-frequency to draw.
    const drawableHarmonics = harmonics.filter(
      harmonic => harmonic.frequency <= xMax
    );

    return drawableHarmonics.map(({ frequency, amplitude }, index) => {
      // We need to figure out where in our scale this frequency falls.
      // If we have a frequency of 5hz when the range is 0-10hz, it should
      // be drawn halfway through the viewBOx width
      const progress = frequency / xMax;
      const xCoordinate = VIEWBOX_WIDTH * progress;

      const yCoordinate = VIEWBOX_HEIGHT - VIEWBOX_HEIGHT * Math.abs(amplitude);

      const isHovered = this.state.hovering === index;

      return (
        <Fragment key={index}>
          <Bar
            x1={xCoordinate}
            y1={VIEWBOX_HEIGHT}
            x2={xCoordinate}
            y2={yCoordinate}
            onMouseEnter={() => this.toggleHover(index)}
            onMouseLeave={() => this.toggleHover(null)}
          />

          <FadeTransition typeName="g" duration={200} isVisible={isHovered}>
            <HoverText textAnchor="end" x={VIEWBOX_WIDTH} y={0} dy={5}>
              {roundTo(frequency, 2)}Hz at {roundTo(Math.abs(amplitude), 2)}dB
            </HoverText>
          </FadeTransition>
        </Fragment>
      );
    });
  }

  render() {
    // Build the soft grey horizontal lines that run across the background
    const backgroundLines = range(0, 10).map(i => (
      <BackgroundLine
        key={i}
        x1={0}
        y1={VIEWBOX_HEIGHT * (i / 10)}
        x2={VIEWBOX_WIDTH}
        y2={VIEWBOX_HEIGHT * (i / 10)}
      />
    ));

    const { xAxisValues, yAxisValues } = this.getXAxisValues();

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
          <Fragment key={index}>
            <AxisNub
              x1={position}
              y1={VIEWBOX_HEIGHT}
              x2={position}
              y2={VIEWBOX_HEIGHT + (label ? 2 : 1)}
            />
            <AxisNubLabel x={position} y={VIEWBOX_HEIGHT + 5} dx={-2}>
              {label}
            </AxisNubLabel>
          </Fragment>
        ))}

        {yAxisValues.map(({ label, position }, index) => (
          <Fragment key={index}>
            <AxisNub x1={label ? -2 : -1} y1={position} x2={0} y2={position} />
            <AxisNubLabel
              textAnchor="end"
              x={-3.5}
              y={position}
              dx={-0.5}
              dy={0.85}
            >
              {label}
            </AxisNubLabel>
          </Fragment>
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

  @media (orientation: portrait) {
    width: 86%;
    margin-left: 7%;
  }
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

  &:hover {
    stroke: ${COLORS.primary[700]};
  }
`;

const HoverText = styled.text`
  font-size: 4px;
  font-weight: bold;
  fill: ${COLORS.primary[500]};
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
