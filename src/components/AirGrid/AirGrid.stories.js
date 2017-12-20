// @flow
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { DEFAULT_WAVEFORM_SIZE } from '../../constants';

import WaveformPlayer from '../WaveformPlayer';
import AirGrid from './AirGrid';

storiesOf('AirGrid', module)
  .add('Default (1Hz, 1dB, 4x4)', () => (
    <WaveformPlayer isPlaying>
      {({ amplitude, frequency, progress }) => (
        <AirGrid
          shape="sine"
          waveformAmplitude={amplitude}
          waveformFrequency={frequency}
          waveformProgress={progress}
        />
      )}
    </WaveformPlayer>
  ))
  .add('Quiet (1Hz, 0.5dB, 4x4)', () => (
    <WaveformPlayer isPlaying amplitude={0.5}>
      {({ amplitude, frequency, progress }) => (
        <AirGrid
          shape="sine"
          waveformAmplitude={amplitude}
          waveformFrequency={frequency}
          waveformProgress={progress}
        />
      )}
    </WaveformPlayer>
  ));
