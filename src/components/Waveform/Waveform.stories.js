// @flow
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import Waveform from './Waveform';

storiesOf('Waveform', module)
  .add('Sine', () => <Waveform shape="sine" />)
  .add('Sine (red)', () => <Waveform shape="sine" color="red" />)
  .add('Sine (2Hz)', () => <Waveform shape="sine" frequency={2} />)
  .add('Sine (quiet)', () => <Waveform shape="sine" amplitude={0.5} />)
  .add('Arbitrary points', () => (
    <Waveform
      points={[
        // Not the whole range, because I'm lazy, but enough to prove it works
        { x: 0, y: 0 },
        { x: 1, y: 0.1 },
        { x: 2, y: 0.2 },
        { x: 3, y: 0.3 },
        { x: 4, y: 0.4 },
        { x: 5, y: 0.5 },
        { x: 6, y: 0.6 },
        { x: 7, y: 0.7 },
        { x: 8, y: 0.8 },
        { x: 9, y: 0.9 },
        { x: 10, y: 1 },
        { x: 11, y: -1 },
        { x: 12, y: -0.9 },
        { x: 13, y: -0.8 },
        { x: 14, y: -0.7 },
        { x: 15, y: -0.6 },
        { x: 16, y: -0.5 },
        { x: 17, y: -0.4 },
        { x: 18, y: -0.3 },
        { x: 19, y: -0.2 },
        { x: 20, y: -0.1 },
        { x: 21, y: 0 },
      ]}
    />
  ));
