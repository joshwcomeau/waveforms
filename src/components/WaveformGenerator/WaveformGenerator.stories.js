// @flow
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import WaveformGenerator from './WaveformGenerator';

storiesOf('WaveformGenerator', module).add('Default', () => (
  <WaveformGenerator />
));
