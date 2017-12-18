// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import {
  COLORS,
  DEFAULT_WAVEFORM_SIZE,
  DEFAULT_WAVEFORM_NUM_OF_CYCLES,
  DEFAULT_WAVEFORM_AMPLITUDE,
} from '../../constants';
import { range } from '../../utils';
import { getPositionAtPointRelativeToAxis } from '../../helpers/waveform.helpers';

import type { WaveformShape } from '../../types';

type Props = {
  size?: number,
  numOfRows?: number,
  numOfCols?: number,
  waveformShape?: WaveformShape,
  waveformFrequency?: number,
  waveformAmplitude?: number,
  waveformProgress: number,
};

class AirGrid extends PureComponent {
  static defaultProps = {
    size: DEFAULT_WAVEFORM_SIZE,
    numOfRows: 4,
    numOfCols: 4,
    waveformShape: 'sine',
    waveformFrequency: DEFAULT_WAVEFORM_NUM_OF_CYCLES,
    waveformAmplitude: DEFAULT_WAVEFORM_AMPLITUDE,
  };

  render() {
    const {
      size,
      numOfRows,
      numOfCols,
      waveformFrequency,
      waveformShape,
      waveformAmplitude,
      waveformProgress,
    } = this.props;

    const width = size * 0.9;

    const cycle = (waveformProgress * 100) % 100;

    return (
      <Grid width={width}>
        {range(0, numOfCols - 1).map(y => (
          <Column key={y}>
            {range(0, numOfRows - 1).map(x => (
              <CellWrapper key={x} cellSize={width / numOfCols}>
                <Cell
                  position={getPositionAtPointRelativeToAxis(
                    waveformShape,
                    1,
                    1,
                    cycle + (100 - y * waveformFrequency * 10)
                  )}
                />
              </CellWrapper>
            ))}
          </Column>
        ))}
      </Grid>
    );
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
