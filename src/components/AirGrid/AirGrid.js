// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';

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

import type { WaveformShape } from '../../types';

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
  static defaultProps = {
    width: DEFAULT_WAVEFORM_SIZE,
    height: DEFAULT_WAVEFORM_SIZE * WAVEFORM_ASPECT_RATIO,
    numOfRows: 4,
    numOfCols: 4,
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

    const colWidth = width / numOfCols;
    const rowHeight = height / numOfRows;
    const particleRadius = Math.min(colWidth, rowHeight) * 0.3;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    range(0, numOfCols - 1).map(y =>
      range(0, numOfRows - 1).map(x => {
        const xInPixels = y * colWidth + colWidth / 2;
        const yInPixels = x * rowHeight + rowHeight / 2;

        this.ctx.beginPath();
        this.ctx.arc(xInPixels, yInPixels, particleRadius, 0, 2 * Math.PI);
        this.ctx.fill();
      })
    );
  }

  captureRefs = (canvas, ctx) => {
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

    return <Canvas width={width} height={height} innerRef={this.captureRefs} />;

    // return (
    //   <Grid width={width}>
    //     {range(0, numOfCols - 1).map(y => (
    //       <Column key={y}>
    //         {range(0, numOfRows - 1).map(x => (
    //           <CellWrapper key={x} cellSize={width / numOfCols}>
    //             <Cell
    //               position={getPositionAtPointRelativeToAxis(
    //                 waveformShape,
    //                 waveformFrequency,
    //                 waveformAmplitude,
    //                 cycle + waveformAmplitude * (100 - y * waveformFrequency)
    //               )}
    //             />
    //           </CellWrapper>
    //         ))}
    //       </Column>
    //     ))}
    //   </Grid>
    // );
  }
}

const Grid = styled.div`
  display: flex;
  width: ${props => props.width + 'px'};
  margin: auto;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const CellWrapper = styled.div`
  position: relative;
  width: ${({ cellSize }) => cellSize + 'px'};
  height: ${({ cellSize }) => cellSize + 'px'};

  & > div {
    background: ${COLORS.gray[500]};
  }

  &:hover > div {
    background: ${COLORS.blue[500]};
  }
`;

const Cell = styled.div.attrs({
  style: ({ position }) => ({
    transform: `translateX(${position * 100 + '%'}`,
  }),
})`
  position: absolute;
  top: 25%;
  left: 25%;
  width: 50%;
  height: 50%;
  border-radius: 50%;
`;

export default AirGrid;
