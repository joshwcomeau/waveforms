// @flow
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import Waveform from './Waveform';

storiesOf('Waveform', module)
  .add('Sine', () => <Waveform shape="sine" />)
  .add('Sine (red)', () => <Waveform shape="sine" color="red" />)
  .add('Sine (2Hz)', () => <Waveform shape="sine" frequency={2} />)
  .add('Sine (quiet)', () => <Waveform shape="sine" amplitude={0.5} />);
