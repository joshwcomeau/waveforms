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
  size?: number,
  shape: WaveformShape,
  frequency: number,
  amplitude: number,
  offset: number,
};

const WaveformIntercept = ({
  size = DEFAULT_WAVEFORM_SIZE,
  shape,
  frequency = DEFAULT_WAVEFORM_FREQUENCY,
  amplitude = DEFAULT_WAVEFORM_AMPLITUDE,
  offset,
}: Props) => {
  const height = size * WAVEFORM_ASPECT_RATIO;

  const interceptPosition = getInterceptPosition(
    shape,
    height,
    frequency,
    amplitude,
    offset
  );

  return <WaveformInterceptElem position={interceptPosition} />;
};

const WaveformInterceptElem = styled.div.attrs({
  style: ({ position }) => ({
    transform: `translateY(${position}px)`,
  }),
})`
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background: red;
  position: absolute;
  top: -5px;
  left: -5px;
  will-change: transform;
`;

export default WaveformIntercept;
