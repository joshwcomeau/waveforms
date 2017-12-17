// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import {
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

    return (
      <Grid>
        {range(0, numOfCols).map(y => (
          <Column key={y}>
            {range(0, numOfRows).map(x => (
              <AirGridCell
                key={x}
                cellSize={size / numOfRows}
                position={getPositionAtPointRelativeToAxis(
                  waveformShape,
                  waveformFrequency,
                  waveformAmplitude,
                  waveformProgress
                )}
              />
            ))}
          </Column>
        ))}
      </Grid>
    );
  }
}

const Grid = styled.div`
  display: flex;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const AirGridCell = styled.div.attrs({
  style: ({ position }) => ({
    transform: `translateX(${position * 100 + '%'}`,
  }),
})`
  width: ${({ cellSize }) => cellSize + 'px'};
  height: ${({ cellSize }) => cellSize + 'px'};
  background: red;
  border-radius: 50%;
`;

export default AirGrid;
