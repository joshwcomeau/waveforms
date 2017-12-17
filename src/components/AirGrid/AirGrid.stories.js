// @flow
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { DEFAULT_WAVEFORM_SIZE } from '../../constants';

import WaveformPlayer from '../WaveformPlayer';
import AirGrid from './AirGrid';

storiesOf('AirGrid', module).add('Default (1Hz, 4x4)', () => (
  <WaveformPlayer isPlaying>
    {({ amplitude, numOfCycles, progress }) => (
      <AirGrid
        shape="sine"
        waveformAmplitude={amplitude}
        waveformFrequency={numOfCycles}
        waveformProgress={progress}
      />
    )}
  </WaveformPlayer>
));
