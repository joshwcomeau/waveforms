// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';

import KeyboardCharacter from './KeyboardCharacter';

storiesOf('KeyboardCharacter', module)
  .add('alone', () => <KeyboardCharacter>M</KeyboardCharacter>)
  .add('in a sentence', () => (
    <span>
      Press the <KeyboardCharacter>M</KeyboardCharacter> key
    </span>
  ));
