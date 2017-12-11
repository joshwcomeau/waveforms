import React from 'react';
import styled from 'styled-components';

import {
  COLORS,
  DEFAULT_WAVEFORM_SIZE,
  WAVEFORM_ASPECT_RATIO,
} from '../../constants/index';

type Props = {
  size?: number,
};

const TOP_AXIS_SPACING = 15;
const SIDE_AXIS_SPACING = 10;

const WaveformAxes = ({ size = DEFAULT_WAVEFORM_SIZE }: Props) => {
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

  // prettier-ignore
  const width = size + (SIDE_AXIS_SPACING * 2);
  // prettier-ignore
  const height = (size * WAVEFORM_ASPECT_RATIO) + (TOP_AXIS_SPACING * 2);

  return (
    <WaveformAxesWrapper width={width} height={height}>
      <YAxis left={SIDE_AXIS_SPACING} />
      <XAxis />
    </WaveformAxesWrapper>
  );
};

const WaveformAxesWrapper = styled.div`
  position: absolute;
  width: ${props => props.width + 'px'};
  height: ${props => props.height + 'px'};
  top: ${`-${TOP_AXIS_SPACING}px`};
  left: ${`-${SIDE_AXIS_SPACING}px`};
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

export default WaveformAxes;
