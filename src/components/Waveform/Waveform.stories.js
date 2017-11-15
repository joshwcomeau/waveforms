// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Waveform from './Waveform';

storiesOf('Waveform', module)
  .add('Default', () => <Waveform />)
  .add('Sine', () => <Waveform shape="sine" />);
