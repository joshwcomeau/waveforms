// @flow
import React from 'react';
import styled from 'styled-components';

import { WAVEFORM_ASPECT_RATIO, DEFAULT_WAVEFORM_SIZE } from '../../constants';
import Waveform from '../Waveform';

import type { Props as WaveformProps } from '../Waveform';

type Props = {
  size?: number,
  waveforms: Array<WaveformProps>,
};

const defaultProps = {
  size: DEFAULT_WAVEFORM_SIZE,
};

const WaveformCollection = ({ size, waveforms }: Props) => (
  <WaveformCollectionWrapper size={size}>
    {waveforms.map((waveformData, index) => (
      <WaveformWrapper key={index}>
        <Waveform {...waveformData} size={size} />
      </WaveformWrapper>
    ))}
  </WaveformCollectionWrapper>
);

const WaveformCollectionWrapper = styled.div`
  position: relative;
  width: ${props => props.size + 'px'};
  height: ${props => props.size * WAVEFORM_ASPECT_RATIO + 'px'};
`;

const WaveformWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

WaveformCollection.defaultProps = defaultProps;

export default WaveformCollection;
