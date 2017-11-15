import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

storiesOf('Waveform', module)
  .add('Default', () => <Waveform />)
  .add('Sine', () => <Waveform shape="sine" />);
