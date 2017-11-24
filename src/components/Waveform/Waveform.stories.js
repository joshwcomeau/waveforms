// @flow
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import Waveform from './Waveform';

storiesOf('Waveform', module)
  .add('Sine', () => <Waveform shape="sine" />)
  .add('Sine (2 cycles)', () => <Waveform shape="sine" cycles={2} />)
  .add('Sine (4 cycles)', () => <Waveform shape="sine" cycles={4} />)
  .add('Sine (10 cycles)', () => <Waveform shape="sine" cycles={10} />);
