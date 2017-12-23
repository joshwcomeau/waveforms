// @flow
import React, { PureComponent } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import FrequencyGraph from './FrequencyGraph';

storiesOf('FrequencyGraph', module)
  .add('default (sine)', () => <FrequencyGraph />)
  .add('sine, base frequency 2', () => <FrequencyGraph baseFrequency={2} />)
  .add('triangle', () => <FrequencyGraph shape="triangle" />)
  .add('square', () => <FrequencyGraph shape="square" />);
