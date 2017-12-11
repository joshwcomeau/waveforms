// @flow
import React from 'react';
import styled from 'styled-components';

import {
  WAVEFORM_ASPECT_RATIO,
  DEFAULT_WAVEFORM_SIZE,
  DEFAULT_WAVEFORM_FREQUENCY,
  DEFAULT_WAVEFORM_AMPLITUDE,
} from '../../constants';
import { getInterceptPosition } from '../../helpers/waveform.helpers';

import type { WaveformShape } from '../../types/index';

type Props = {
  color?: string,
  size?: number,
  waveformSize?: number,
  waveformShape: WaveformShape,
  frequency: number,
  amplitude: number,
  offset: number,
};

const WaveformIntercept = ({
  color = 'red',
  size = 16,
  waveformSize = DEFAULT_WAVEFORM_SIZE,
  waveformShape,
  frequency = DEFAULT_WAVEFORM_FREQUENCY,
  amplitude = DEFAULT_WAVEFORM_AMPLITUDE,
  offset,
}: Props) => {
  const waveformHeight = waveformSize * WAVEFORM_ASPECT_RATIO;

  const interceptPosition = getInterceptPosition(
    waveformShape,
    waveformHeight,
    frequency,
    amplitude,
    offset
  );

  return (
    <WaveformInterceptElem
      position={interceptPosition}
      color={color}
      size={size}
    />
  );
};

const WaveformInterceptElem = styled.div.attrs({
  style: ({ position }) => ({
    transform: `translateY(${position}px)`,
  }),
})`
  width: ${props => props.size + 'px'};
  height: ${props => props.size + 'px'};
  border-radius: 50%;
  background: ${props => props.color};
  position: absolute;
  top: ${props => -1 * props.size / 2 + 'px'};
  left: ${props => -1 * props.size / 2 + 'px'};
  will-change: transform;
`;

export default WaveformIntercept;
