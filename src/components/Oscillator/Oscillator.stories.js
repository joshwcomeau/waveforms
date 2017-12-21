// @flow
import React, { PureComponent } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Oscillator from './Oscillator';

storiesOf('Oscillator', module)
  .add('Silent', () => <Oscillator frequency={440} amplitude={1} />)
  .add('440Hz, default shape', () => (
    <Oscillator isAudible frequency={440} amplitude={1} />
  ))
  .add('220Hz, default shape', () => (
    <Oscillator isAudible frequency={220} amplitude={1} />
  ))
  .add('220Hz, sawtooth', () => (
    <Oscillator isAudible shape="sawtooth" frequency={220} amplitude={1} />
  ))
  .add('220Hz, quiet', () => (
    <Oscillator isAudible frequency={220} amplitude={0.5} />
  ));
