// @flow
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import WaveformAddition from './WaveformAddition';

const defaultWaveformProps = {
  shape: 'sine',
  frequency: 1,
  amplitude: 0.5,
  offset: 0,
  strokeWidth: 3,
};

const RED = 'rgba(255, 0, 0, 0.5)';
const BLUE = 'rgba(0, 0, 255, 0.5)';

storiesOf('WaveformAddition', module)
  .add('Cancelling (0%)', () => (
    <WaveformAddition
      waveforms={[
        { ...defaultWaveformProps, color: RED },
        { ...defaultWaveformProps, color: BLUE, offset: 50 },
      ]}
      progress={0}
    />
  ))
  .add('Cancelling (25%)', () => (
    <WaveformAddition
      waveforms={[
        { ...defaultWaveformProps, color: RED },
        { ...defaultWaveformProps, color: BLUE, offset: 50 },
      ]}
      progress={0.25}
    />
  ))
  .add('Cancelling (50%)', () => (
    <WaveformAddition
      waveforms={[
        { ...defaultWaveformProps, color: RED },
        { ...defaultWaveformProps, color: BLUE, offset: 50 },
      ]}
      progress={0.5}
    />
  ))
  .add('Cancelling (75%)', () => (
    <WaveformAddition
      waveforms={[
        { ...defaultWaveformProps, color: RED },
        { ...defaultWaveformProps, color: BLUE, offset: 50 },
      ]}
      progress={0.75}
    />
  ))
  .add('Cancelling (100%)', () => (
    <WaveformAddition
      waveforms={[
        { ...defaultWaveformProps, color: RED },
        { ...defaultWaveformProps, color: BLUE, offset: 50 },
      ]}
      progress={1}
    />
  ))
  .add('Double-frequency (0%)', () => (
    <WaveformAddition
      waveforms={[
        { ...defaultWaveformProps, color: RED },
        { ...defaultWaveformProps, color: BLUE, frequency: 2 },
      ]}
      progress={0}
    />
  ))
  .add('Double-frequency (25%)', () => (
    <WaveformAddition
      waveforms={[
        { ...defaultWaveformProps, color: RED },
        { ...defaultWaveformProps, color: BLUE, frequency: 2 },
      ]}
      progress={0.25}
    />
  ))
  .add('Double-frequency (50%)', () => (
    <WaveformAddition
      waveforms={[
        { ...defaultWaveformProps, color: RED },
        { ...defaultWaveformProps, color: BLUE, frequency: 2 },
      ]}
      progress={0.5}
    />
  ))
  .add('Double-frequency (75%)', () => (
    <WaveformAddition
      waveforms={[
        { ...defaultWaveformProps, color: RED },
        { ...defaultWaveformProps, color: BLUE, frequency: 2 },
      ]}
      progress={0.75}
    />
  ))
  .add('Double-frequency (100%)', () => (
    <WaveformAddition
      waveforms={[
        { ...defaultWaveformProps, color: RED },
        { ...defaultWaveformProps, color: BLUE, frequency: 2 },
      ]}
      progress={1}
    />
  ));
