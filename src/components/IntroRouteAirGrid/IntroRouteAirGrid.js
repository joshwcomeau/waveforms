// @flow
import React from 'react';
import styled from 'styled-components';

import { WAVEFORM_ASPECT_RATIO } from '../../constants';

import AvailableWidth from '../AvailableWidth';
import AirGrid from '../AirGrid';
import FadeTransition from '../FadeTransition';

import type { StepData } from '../IntroRoute/IntroRoute.helpers';
import type { WaveformShape } from '../../types';

type Props = {
  numOfRows: number,
  numOfCols: number,
  shape: WaveformShape,
  amplitude: number,
  frequency: number,
  progress: number,
  stepData: StepData,
};

const IntroRouteAirGrid = ({
  numOfRows,
  numOfCols,
  shape,
  amplitude,
  frequency,
  progress,
  stepData,
}: Props) => {
  return (
    <IntroRouteAirGridWrapper>
      <FadeTransition
        mountOnEnter
        unmountOnExit
        isVisible={stepData.showAirGrid}
      >
        <AvailableWidth>
          {width => (
            <AirGrid
              width={Math.round(width)}
              height={Math.round(width * WAVEFORM_ASPECT_RATIO + 30)}
              numOfRows={numOfRows}
              numOfCols={numOfCols}
              waveformShape={shape}
              waveformAmplitude={amplitude}
              waveformFrequency={frequency}
              waveformProgress={progress}
            />
          )}
        </AvailableWidth>
      </FadeTransition>
    </IntroRouteAirGridWrapper>
  );
};

const IntroRouteAirGridWrapper = styled.div`
  position: sticky;
  top: 50px;
`;

export default IntroRouteAirGrid;
