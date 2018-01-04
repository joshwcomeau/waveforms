// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';

import ProgressBar from './ProgressBar';

storiesOf('ProgressBar', module)
  .add('0%', () => <ProgressBar progress={0} />)
  .add('50%', () => <ProgressBar progress={50} />)
  .add('100%', () => <ProgressBar progress={100} />);
