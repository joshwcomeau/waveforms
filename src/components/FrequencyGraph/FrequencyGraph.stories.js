// @flow
import React, { PureComponent } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import FrequencyGraph from './FrequencyGraph';

storiesOf('FrequencyGraph', module)
  .add('default', () => <FrequencyGraph />)
  .add('Base frequency of 2', () => <FrequencyGraph baseFrequency={2} />);
