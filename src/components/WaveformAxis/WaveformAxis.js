// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import {
  COLORS,
  DEFAULT_WAVEFORM_SIZE,
  WAVEFORM_ASPECT_RATIO,
} from '../../constants/index';
import { range } from '../../utils';

import Aux from '../Aux';
import FadeTransition from '../FadeTransition';

import type { Linecap } from '../../types';

const SIDE_AXIS_SPACING = 10;
const TOP_AXIS_SPACING = 10;
const STROKE_DASHARRAY = 3;

type Props = {
  y: boolean,
  x: boolean,
  waveformSize: number,
  color: string,
  strokeWidth: number,
  strokeLinecap: Linecap,
  opacity: number,
  showLabels: boolean,
};

class WaveformAxis extends PureComponent<Props> {
  static defaultProps = {
    y: false,
    x: false,
    waveformSize: DEFAULT_WAVEFORM_SIZE,
    color: COLORS.gray[900],
    strokeWidth: 2,
    strokeLinecap: 'square',
    opacity: 1,
    showLabels: false,
  };

  render() {
    const {
      y,
      x,
      waveformSize,
      color,
      strokeWidth,
      strokeLinecap,
      opacity,
      showLabels,
    } = this.props;

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

    const width = waveformSize;
    const height = waveformSize * WAVEFORM_ASPECT_RATIO;

    const axisWidth = width + SIDE_AXIS_SPACING * 2;
    const axisHeight = height + TOP_AXIS_SPACING * 2;

    const halfHeight = Math.round(height / 2);

    const showXLabels = x && showLabels;
    const showYLabels = y && showLabels;

    const coordinates = x
      ? {
          x1: -SIDE_AXIS_SPACING,
          y1: halfHeight,
          x2: width + SIDE_AXIS_SPACING,
          y2: halfHeight,
        }
      : {
          x1: 0,
          y1: -TOP_AXIS_SPACING,
          x2: 0,
          y2: height + TOP_AXIS_SPACING,
        };

    const labelLineStyles = {
      stroke: 'rgba(0, 0, 0, 0.5)',
      strokeDasharray: STROKE_DASHARRAY,
    };

    return (
      <WaveformAxisSvg width={width} height={height}>
        <FadeTransition isVisible={showXLabels} typeName="g">
          {range(0, 1, 0.25).map(i => {
            return (
              <Aux key={i}>
                {i > 0 && (
                  <line
                    x1={width * i}
                    y1={-TOP_AXIS_SPACING}
                    x2={width * i}
                    y2={height + TOP_AXIS_SPACING}
                    {...labelLineStyles}
                  />
                )}

                <text
                  x={width * i + 4}
                  y={height / 2 + 16}
                  style={{ fontSize: 14 }}
                >
                  {i}s
                </text>
              </Aux>
            );
          })}
        </FadeTransition>
        <FadeTransition isVisible={showYLabels} typeName="g">
          <Aux>
            <line
              x1={-SIDE_AXIS_SPACING}
              y1={0}
              x2={width + SIDE_AXIS_SPACING}
              y2={0}
              {...labelLineStyles}
            />
            <text x={axisWidth} y={0} dx={2} dy={4} style={{ fontSize: 14 }}>
              +1
            </text>

            <text
              x={axisWidth}
              y={axisHeight / 2}
              dx={8}
              dy={-6}
              style={{ fontSize: 14 }}
            >
              0
            </text>

            <line
              x1={-SIDE_AXIS_SPACING}
              y1={height}
              x2={width + SIDE_AXIS_SPACING}
              y2={height}
              {...labelLineStyles}
            />
            <text
              x={axisWidth + 4}
              dx={0}
              y={axisHeight}
              dy={-16}
              style={{ fontSize: 14 }}
            >
              -1
            </text>
          </Aux>
        </FadeTransition>
        <line
          {...coordinates}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap={strokeLinecap}
          style={{ opacity, transition: `opacity ${500}ms` }}
        />
        )}
      </WaveformAxisSvg>
    );
  }
}

const WaveformAxisSvg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => props.width + 'px'};
  height: ${props => props.height + 'px'};
  overflow: visible;
`;

export default WaveformAxis;
