// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Waveform from './Waveform';

storiesOf('Waveform', module)
  .add('Default', () => <Waveform />)
  .add('Sine', () => <Waveform shape="sine" />)
  .add('Sine with 0% progress', () => (
    <Waveform shape="sine" progressPercentage={0} />
  ))
  .add('Sine with 25% progress', () => (
    <Waveform shape="sine" progressPercentage={25} />
  ))
  .add('Sine with 50% progress', () => (
    <Waveform shape="sine" progressPercentage={50} />
  ))
  .add('Sine with 75% progress', () => (
    <Waveform shape="sine" progressPercentage={75} />
  ))
  .add('Sine with 99% progress', () => (
    <Waveform shape="sine" progressPercentage={99} />
  ));
