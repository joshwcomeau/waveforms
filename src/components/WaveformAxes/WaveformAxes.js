import React from 'react';
import styled from 'styled-components';

import { COLORS, WAVEFORM_ASPECT_RATIO } from '../../constants/index';

type Props = {
  size: number,
  children: React$Element,
};

const WaveformAxes = ({ size = 200, children }: Props) => {
  // Our axes will actually be slightly oversized compared to the `size` prop,
  // since we want some "breathing room" around the waveform.
  const sideSpacing = 10;
  const heightSpacing = 15;

  // prettier-ignore
  const width = size + (sideSpacing * 2);
  // prettier-ignore
  const height = (size * WAVEFORM_ASPECT_RATIO) + (heightSpacing * 2);

  return (
    <WaveformAxesWrapper width={width} height={height}>
      <YAxis left={sideSpacing} />
      <XAxis />
      <WaveformPositioner left={sideSpacing} top={heightSpacing}>
        {children}
      </WaveformPositioner>
      <VerticalCycleIndicators />
    </WaveformAxesWrapper>
  );
};

const WaveformAxesWrapper = styled.div`
  position: relative;
  width: ${props => props.width + 'px'};
  height: ${props => props.height + 'px'};
`;

const YAxis = styled.div`
  position: absolute;
  top: 0;
  left: ${props => props.left + 'px'};
  bottom: 0;
  width: 2px;
  transform: translateX(-1px);
  background: ${COLORS.gray[700]};
`;

const XAxis = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  margin: auto;
  background: ${COLORS.gray[700]};
`;

const WaveformPositioner = styled.div`
  padding-top: ${props => props.top + 'px'};
  padding-left: ${props => props.left + 'px'};
`;

const VerticalCycleIndicators = styled.div``;

export default WaveformAxes;
