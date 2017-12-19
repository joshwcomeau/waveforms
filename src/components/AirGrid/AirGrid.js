// @flow
import React, { PureComponent } from 'react';

import {
  COLORS,
  DEFAULT_WAVEFORM_SIZE,
  DEFAULT_WAVEFORM_NUM_OF_CYCLES,
  DEFAULT_WAVEFORM_AMPLITUDE,
  WAVEFORM_ASPECT_RATIO,
} from '../../constants';
import { range } from '../../utils';
import { getPositionAtPointRelativeToAxis } from '../../helpers/waveform.helpers';

import Canvas from '../Canvas';

import { getDimensions } from './AirGrid.helpers';

import type { WaveformShape } from '../../types';

const DEFAULT_COLS = 8;
const DEFAULT_ROWS = DEFAULT_COLS * WAVEFORM_ASPECT_RATIO;

type Props = {
  width: number,
  height: number,
  numOfRows: number,
  numOfCols: number,
  waveformShape: WaveformShape,
  waveformFrequency: number,
  waveformAmplitude: number,
  waveformProgress: number,
};

class AirGrid extends PureComponent<Props> {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  static defaultProps = {
    width: DEFAULT_WAVEFORM_SIZE,
    height: DEFAULT_WAVEFORM_SIZE * WAVEFORM_ASPECT_RATIO,
    numOfRows: DEFAULT_ROWS,
    numOfCols: DEFAULT_COLS,
    waveformShape: 'sine',
    waveformFrequency: DEFAULT_WAVEFORM_NUM_OF_CYCLES,
    waveformAmplitude: DEFAULT_WAVEFORM_AMPLITUDE,
  };

  componentDidUpdate() {
    const {
      width,
      height,
      numOfRows,
      numOfCols,
      waveformFrequency,
      waveformShape,
      waveformAmplitude,
      waveformProgress,
    } = this.props;

    const cycle = (waveformProgress * 100) % 100;

    const { colWidth, rowHeight } = getDimensions(
      width,
      height,
      numOfRows,
      numOfCols
    );

    const particleRadius = Math.min(colWidth, rowHeight) * 0.3;

    // Canvases won't allow us to overflow. and our molecules can move outside
    // the standard canvas dimensions.
    // To maintain consistency with how I use SVG in this project (which is,
    // the width/height isn't guaranteed to contain the SVG entirely).
    // To solve this, we'll make it 2 rows/columns larger, and then offset that
    // using margin so that it's "centered" with where it needs to be.
    const sidePadding = colWidth;
    const topBottomPadding = rowHeight;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    range(0, numOfCols - 1).map(y => {
      // Each cell will vibrate left/right depending on its current offset.
      // The cells in a given column all move the same way, and so we'll do the
      // calculation up here to avoid repeating work.
      const wavePosition = getPositionAtPointRelativeToAxis(
        waveformShape,
        waveformFrequency,
        waveformAmplitude,
        cycle + waveformAmplitude * (100 - y * waveformFrequency)
      );

      return range(0, numOfRows - 1).map(x => {
        const yInPixels = x * rowHeight + rowHeight / 2 + topBottomPadding;

        // `xBaselineInPixels` gives us the center position for each molecule,
        // before the current oscillation is applied.
        const xBaselineInPixels = y * colWidth + colWidth / 2 + sidePadding;

        // Each molecule can move +/- by the column width (less, if the
        // amplitude is less than 1).
        const xInPixels = xBaselineInPixels + wavePosition * colWidth;

        this.ctx.beginPath();
        this.ctx.arc(xInPixels, yInPixels, particleRadius, 0, 2 * Math.PI);
        this.ctx.fill();
      });
    });
  }

  captureRefs = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    this.canvas = canvas;
    this.ctx = ctx;
  };

  render() {
    const {
      width,
      height,
      numOfRows,
      numOfCols,
      waveformFrequency,
      waveformShape,
      waveformAmplitude,
      waveformProgress,
    } = this.props;

    const {
      colWidth,
      rowHeight,
      widthWithPadding,
      heightWithPadding,
    } = getDimensions(width, height, numOfRows, numOfCols);

    // We want to allow our canvas to show a bit of overflow (if the molecules
    // bounce out of the available space). So the width/height will be a bit
    // larger. We want to "inset" it so that the primary content area is still
    // where you'd expect (we're essentially just adding a 1 row/column buffer
    // around each edge, and then moving it back to center it)
    const topBottomPadding = rowHeight;
    const sidePadding = colWidth;

    return (
      <Canvas
        style={{ marginTop: -topBottomPadding, marginLeft: -sidePadding }}
        width={widthWithPadding}
        height={heightWithPadding}
        innerRef={this.captureRefs}
      />
    );
  }
}

export default AirGrid;
