// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

import Waveform from '../Waveform';

const WAVEFORM_SIZE = 60;

const WaveformEquation = () => {
  return (
    <Wrapper>
      <Waveform
        strokeWidth={2}
        color={COLORS.primary[500]}
        frequency={1}
        size={WAVEFORM_SIZE}
      />{' '}
      +{' '}
      <Waveform
        strokeWidth={2}
        color={COLORS.primary[500]}
        frequency={2}
        size={WAVEFORM_SIZE}
      />{' '}
      +{' '}
      <Waveform
        strokeWidth={2}
        color={COLORS.primary[500]}
        frequency={3}
        size={WAVEFORM_SIZE}
      />{' '}
      ={' '}
      <Waveform
        strokeWidth={2}
        color={COLORS.primary[500]}
        frequency={2}
        shape="square"
        size={WAVEFORM_SIZE}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 3rem 0 4rem;
  font-size: 22px;
`;

export default WaveformEquation;
