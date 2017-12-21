// @flow
import React, { PureComponent } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ButtonToggle from './ButtonToggle';

storiesOf('ButtonToggle', module)
  .add('sound - on', () => (
    <ButtonToggle isToggled={true} onIcon="volumeOn" offIcon="volumeOff">
      Sound
    </ButtonToggle>
  ))
  .add('sound - off', () => (
    <ButtonToggle isToggled={false} onIcon="volumeOn" offIcon="volumeOff">
      Sound
    </ButtonToggle>
  ));
