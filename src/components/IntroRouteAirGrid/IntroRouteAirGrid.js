// @flow
import React from 'react';
import styled from 'styled-components';

import AvailableWidth from '../AvailableWidth';
import AirGrid from '../AirGrid';
import FadeTransition from '../FadeTransition';

const IntroRouteAirGrid = ({
  numOfRows,
  numOfCols,
  shape,
  amplitude,
  numOfCycles,
  progress,
  stepData,
}) => {
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
              size={Math.round(width)}
              numOfRows={numOfRows}
              numOfCols={numOfCols}
              waveformShape={shape}
              waveformAmplitude={amplitude}
              waveformFrequency={numOfCycles}
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
