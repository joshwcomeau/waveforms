// @flow
import React, { Component } from 'react';

import {
  WAVEFORM_ASPECT_RATIO,
  DEFAULT_WAVEFORM_SIZE,
  DEFAULT_WAVEFORM_SHAPE,
  DEFAULT_WAVEFORM_NUM_OF_CYCLES,
  DEFAULT_WAVEFORM_AMPLITUDE,
} from '../../constants';
import {
  getPointsForWaveform,
  createSVGPathFromWaveformPoints,
  translateAxisRelativeYValue,
} from '../../helpers/waveform.helpers';

import Canvas from '../Canvas';

import type { Linecap, WaveformShape, WaveformPoint } from '../../types';

export type Props = {
  // In most cases, the Waveform simply requires an enum waveform shape, like
  // 'sine' or 'square'.
  shape: WaveformShape,
  // In certain cases (eg. waveform addition), it's more helpful to provide an
  // array of points, instead of a `shape`. The Waveform will simply plot those
  // points, in that case.
  points?: Array<WaveformPoint>,
  // 'size' will be used for the width, and the height will be derived, using
  // the ASPECT_RATIO constant.
  size: number,
  // Line color for the waveform line.
  // TODO: Find a way to support other line features (width, endcap) in a nice
  // way?
  color: string,
  strokeWidth: number,
  strokeLinecap: Linecap,
  opacity: number,
  // frequency is the number of cycles to squeeze into this waveform
  // visualization. The default value of `1` means that a single iteration of
  // the waveform is drawn. `2` means that the cycle is rendered twice, etc
  // This can be thought of as `frequency`, if the X-axis is thought to range
  // between 0s and 1s. I've avoided naming it `frequency` to avoid ambiguity
  // with WaveformPlayer, which controls how fast the waveform actually moves.
  frequency: number,
  // Amplitude is the strength of the waveform (AKA loudness, volume).
  // it can range from 0 to 1, and affects how 'tall' the waveform is.
  amplitude: number,
  // At what point in the waveform should the drawing start?
  // By default, it starts at `0`, but any value between 0 and 99 can be
  // used.
  // This is useful for animating the waveform, by simply auto-incrementing
  // the value in a requestAnimationFrame loop!
  offset: number,

  renderTo: 'svg' | 'canvas',
};

class Waveform extends Component<Props> {
  static defaultProps = {
    size: DEFAULT_WAVEFORM_SIZE,
    shape: DEFAULT_WAVEFORM_SHAPE,
    color: 'black',
    strokeWidth: 1,
    strokeLinecap: 'square',
    opacity: 1,
    frequency: DEFAULT_WAVEFORM_NUM_OF_CYCLES,
    amplitude: DEFAULT_WAVEFORM_AMPLITUDE,
    offset: 0,
    renderTo: 'svg',
  };

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  componentDidMount() {
    if (this.props.renderTo === 'canvas') {
      this.drawCanvas();
    }
  }

  componentDidUpdate() {
    if (this.props.renderTo === 'canvas') {
      this.drawCanvas();
    }
  }

  captureCanvasRef = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) => {
    this.canvas = canvas;
    this.ctx = ctx;
  };

  getPoints() {
    const { size, shape, frequency, amplitude, offset } = this.props;
    let { points } = this.props;

    const height = Math.round(size * WAVEFORM_ASPECT_RATIO);

    if (typeof points === 'undefined') {
      points = getPointsForWaveform({
        shape,
        frequency,
        amplitude,
        width: size,
        offset,
      });
    }

    // `points` will be mathy values: y-values ranging from -1 to 1.
    // We want to convert that to values understandable by our waveform
    // drawing surfaces: values from 0 to the height of the canvas/svg.
    const drawablePoints = points.map(({ x, y }) => ({
      x,
      y: translateAxisRelativeYValue(y, height),
    }));

    return drawablePoints;
  }

  drawCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.beginPath();

    const [firstPoint, ...otherPoints] = this.getPoints();

    this.ctx.moveTo(firstPoint.x, firstPoint.y);

    otherPoints.forEach(({ x, y }) => this.ctx.lineTo(x, y));

    this.ctx.stroke();
  }

  renderCanvas(width: number, height: number) {
    return (
      <Canvas width={width} height={height} innerRef={this.captureCanvasRef} />
    );
  }

  renderSVG(width: number, height: number) {
    const { color, strokeWidth, strokeLinecap, opacity } = this.props;

    const points = this.getPoints();

    const svgPath = createSVGPathFromWaveformPoints(points, height);

    return (
      <svg width={width} height={height} style={{ overflow: 'visible' }}>
        <path
          d={svgPath}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap={strokeLinecap}
          fill="none"
          style={{ opacity, transition: 'opacity 500ms' }}
        />
      </svg>
    );
  }

  render() {
    const {
      shape,
      size,
      frequency,
      amplitude,
      offset,
      renderTo,
      points,
    } = this.props;

    const width = size;
    const height = Math.round(size * WAVEFORM_ASPECT_RATIO);

    if (typeof shape !== 'string' && !Array.isArray(points)) {
      throw new Error(
        'Waveform requires either a `shape` string, or an array ' +
          'of `points`. Please provide one of the two.'
      );
    }

    return renderTo === 'svg'
      ? this.renderSVG(width, height)
      : this.renderCanvas(width, height);
  }
}

export default Waveform;
