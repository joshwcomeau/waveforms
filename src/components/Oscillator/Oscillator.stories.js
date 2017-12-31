// @flow
import React, { PureComponent } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import AudioOutput from '../AudioOutput';
import Oscillator from './Oscillator';

storiesOf('Oscillator', module)
  .add('Silent (0 amplitude)', () => (
    <AudioOutput>
      {props => <Oscillator {...props} frequency={440} amplitude={0} />}
    </AudioOutput>
  ))
  .add('440Hz, default shape', () => (
    <AudioOutput>
      {props => <Oscillator {...props} frequency={440} amplitude={1} />}
    </AudioOutput>
  ))
  .add('220Hz, default shape', () => (
    <AudioOutput>
      {props => <Oscillator {...props} frequency={220} amplitude={1} />}
    </AudioOutput>
  ))
  .add('220Hz, sawtooth', () => (
    <AudioOutput>
      {props => (
        <Oscillator {...props} shape="sawtooth" frequency={220} amplitude={1} />
      )}
    </AudioOutput>
  ));
