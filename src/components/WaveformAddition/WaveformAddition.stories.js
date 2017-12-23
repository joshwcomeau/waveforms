// @flow
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { DEFAULT_WAVEFORM_SHAPE } from '../../constants';
import { getHarmonicsForWave } from '../../helpers/waveform.helpers';

import ValueGenerator from '../ValueGenerator';
import WaveformAddition from './WaveformAddition';

const defaultWaveformProps = {
  shape: DEFAULT_WAVEFORM_SHAPE,
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
  .add('Cancelling (50%)', () => (
    <WaveformAddition
      waveforms={[
        { ...defaultWaveformProps, color: RED },
        { ...defaultWaveformProps, color: BLUE, offset: 50 },
      ]}
      progress={0.5}
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
  .add('Cancelling (oscillating animation)', () => (
    <ValueGenerator from={0} to={100} mode="oscillate" updateEvery={1000}>
      {value => (
        <WaveformAddition
          waveforms={[
            { ...defaultWaveformProps, color: RED },
            { ...defaultWaveformProps, color: BLUE, offset: 50 },
          ]}
          progress={value / 100}
        />
      )}
    </ValueGenerator>
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
  .add('Double-frequency (50%)', () => (
    <WaveformAddition
      waveforms={[
        { ...defaultWaveformProps, color: RED },
        { ...defaultWaveformProps, color: BLUE, frequency: 2 },
      ]}
      progress={0.5}
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
  ))
  .add('Double-frequency (oscillating animation)', () => (
    <ValueGenerator from={0} to={100} mode="oscillate" updateEvery={1000}>
      {value => (
        <WaveformAddition
          waveforms={[
            { ...defaultWaveformProps, color: RED },
            { ...defaultWaveformProps, color: BLUE, frequency: 2 },
          ]}
          progress={value / 100}
        />
      )}
    </ValueGenerator>
  ));

['square', 'triangle', 'sawtooth'].forEach(shape => {
  storiesOf('WaveformAddition', module)
    .add(`${shape} wave (3 waves, animated)`, () => (
      <ValueGenerator from={0} to={100} mode="oscillate" updateEvery={1000}>
        {value => (
          <WaveformAddition
            waveforms={[
              { ...defaultWaveformProps, color: RED },
              ...getHarmonicsForWave({
                shape,
                baseFrequency: 1,
                baseAmplitude: 0.5,
                maxNumberToGenerate: 3,
              }).map(harmonic => ({
                ...defaultWaveformProps,
                ...harmonic,
                color: BLUE,
              })),
            ]}
            progress={value / 100}
          />
        )}
      </ValueGenerator>
    ))
    .add(`${shape} wave (8 waves, animated)`, () => (
      <ValueGenerator from={0} to={100} mode="oscillate" updateEvery={1000}>
        {value => (
          <WaveformAddition
            waveforms={[
              { ...defaultWaveformProps, color: RED },
              ...getHarmonicsForWave({
                shape,
                baseFrequency: 1,
                baseAmplitude: 0.5,
                maxNumberToGenerate: 8,
              }).map(harmonic => ({
                ...defaultWaveformProps,
                ...harmonic,
                color: BLUE,
              })),
            ]}
            progress={value / 100}
          />
        )}
      </ValueGenerator>
    ))
    .add(`${shape} wave (15 waves, animated)`, () => (
      <ValueGenerator from={0} to={100} mode="oscillate" updateEvery={1000}>
        {value => (
          <WaveformAddition
            waveforms={[
              { ...defaultWaveformProps, color: RED },
              ...getHarmonicsForWave({
                shape,
                baseFrequency: 1,
                baseAmplitude: 0.5,
                maxNumberToGenerate: 15,
              }).map(harmonic => ({
                ...defaultWaveformProps,
                ...harmonic,
                color: BLUE,
              })),
            ]}
            progress={value / 100}
          />
        )}
      </ValueGenerator>
    ))
    .add(`${shape} wave (100 waves, animated)`, () => (
      <ValueGenerator from={0} to={100} mode="oscillate" updateEvery={1000}>
        {value => (
          <WaveformAddition
            waveforms={[
              { ...defaultWaveformProps, color: RED },
              ...getHarmonicsForWave({
                shape,
                baseFrequency: 1,
                baseAmplitude: 0.5,
                maxNumberToGenerate: 100,
              }).map(harmonic => ({
                ...defaultWaveformProps,
                ...harmonic,
                color: BLUE,
              })),
            ]}
            progress={value / 100}
          />
        )}
      </ValueGenerator>
    ));
});
