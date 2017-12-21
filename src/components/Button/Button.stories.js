// @flow
import React, { PureComponent } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from './Button';

storiesOf('Button', module)
  .add('default', () => <Button>I'm a button!</Button>)
  .add('with icon', () => <Button icon="mute">Turn Sound On</Button>);
