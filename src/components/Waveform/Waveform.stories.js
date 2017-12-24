// @flow
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { SHAPES } from '../../constants';

import Waveform from './Waveform';

SHAPES.forEach(shape =>
  storiesOf('Waveform', module)
    .add(`${shape}`, () => <Waveform shape={shape} />)
    .add(`${shape} (red)`, () => <Waveform shape={shape} color="red" />)
    .add(`${shape} (2Hz)`, () => <Waveform shape={shape} frequency={2} />)
    .add(`${shape} (3Hz)`, () => <Waveform shape={shape} frequency={3} />)
    .add(`${shape} (0.5Hz)`, () => <Waveform shape={shape} frequency={0.5} />)
    .add(`${shape} (25% offset)`, () => <Waveform shape={shape} offset={25} />)
    .add(`${shape} (500px)`, () => <Waveform shape={shape} size={500} />)
    .add(`${shape} (0.5dB)`, () => <Waveform shape={shape} amplitude={0.5} />)
);

// The typical usecase is to provide a `shape` and let <Waveform> work out the
// specific points, but during waveform addition, the waveform needs to draw
// arbitrary points. This story checks that alternative usecase.
storiesOf('Waveform', module).add('Arbitrary points', () => (
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
