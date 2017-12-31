// @flow
import React, { PureComponent } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Oscillator from './Oscillator';

storiesOf('Oscillator', module)
  .add('Silent (muted with masterVolume)', () => (
    <Oscillator masterVolume={0} frequency={440} amplitude={1} />
  ))
  .add('440Hz, default shape', () => (
    <Oscillator masterVolume={0.5} frequency={440} amplitude={1} />
  ))
  .add('220Hz, default shape', () => (
    <Oscillator masterVolume={0.5} frequency={220} amplitude={1} />
  ))
  .add('220Hz, sawtooth', () => (
    <Oscillator
      masterVolume={0.5}
      shape="sawtooth"
      frequency={220}
      amplitude={1}
    />
  ))
  .add('220Hz, LOUD', () => (
    <Oscillator masterVolume={1} frequency={220} amplitude={1} />
  ));
