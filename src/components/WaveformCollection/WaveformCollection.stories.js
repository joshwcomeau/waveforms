// @flow
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import WaveformCollection from './WaveformCollection';

storiesOf('WaveformCollection', module)
  .add('Single sine wave', () => (
    <WaveformCollection waveforms={[{ shape: 'sine' }]} />
  ))
  .add('Two sine wave', () => (
    <WaveformCollection
      waveforms={[
        { shape: 'sine', frequency: 1, color: 'red' },
        { shape: 'sine', frequency: 2, color: 'blue' },
      ]}
    />
  ))
  .add('Five sine wave', () => (
    <WaveformCollection
      waveforms={[
        { shape: 'sine', frequency: 1, color: '#ff5050' },
        { shape: 'sine', frequency: 1.5, color: '#ff7d50' },
        { shape: 'sine', frequency: 2.25, color: '#ffb750' },
        { shape: 'sine', frequency: 3.375, color: '#ffe050' },
        { shape: 'sine', frequency: 5.0625, color: '#e8ff50' },
      ]}
    />
  ));
