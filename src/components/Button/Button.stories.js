// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from './Button';

storiesOf('Button', module)
  .add('default', () => <Button>I'm a button!</Button>)
  .add('with icon', () => <Button icon="volumeOff">Turn Sound On</Button>);
