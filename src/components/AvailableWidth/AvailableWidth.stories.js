// @flow
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import AvailableWidth from './AvailableWidth';

storiesOf('AvailableWidth', module)
  .add('default', () => (
    <div style={{ border: '1px solid red' }}>
      <AvailableWidth>
        {width => <div>Available width: {width}</div>}
      </AvailableWidth>
    </div>
  ))
  .add('500px', () => (
    <div style={{ width: 500, border: '1px solid red' }}>
      <AvailableWidth>
        {width => <div>Available width: {width}</div>}
      </AvailableWidth>
    </div>
  ));
