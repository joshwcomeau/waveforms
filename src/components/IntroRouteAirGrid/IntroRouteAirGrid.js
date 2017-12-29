// @flow
import React from 'react';
import styled from 'styled-components';

import { WAVEFORM_ASPECT_RATIO } from '../../constants';

import AvailableWidth from '../AvailableWidth';
import AirGrid from '../AirGrid';

import type { WaveformShape } from '../../types';

type Props = {
  shape: WaveformShape,
  amplitude: number,
  frequency: number,
  progress: number,
  highlightAirGridColumn?: boolean,
};

const NUM_OF_ROWS = 26;
const NUM_OF_COLS = 26;

const IntroRouteAirGrid = ({
  shape,
  amplitude,
  frequency,
  progress,
  highlightAirGridColumn,
}: Props) => {
  return (
    <IntroRouteAirGridWrapper>
      <AvailableWidth>
        {width => (
          <AirGrid
            width={Math.round(width)}
            height={Math.round(width * WAVEFORM_ASPECT_RATIO + 10)}
            numOfRows={NUM_OF_ROWS}
            numOfCols={NUM_OF_COLS}
            waveformShape={shape}
            waveformAmplitude={amplitude}
            waveformFrequency={frequency}
            waveformProgress={progress}
            highlightColumnIndex={highlightAirGridColumn ? 0 : null}
          />
        )}
      </AvailableWidth>
    </IntroRouteAirGridWrapper>
  );
};

const IntroRouteAirGridWrapper = styled.div`
  padding: 30px;
`;

export default IntroRouteAirGrid;
