// @flow
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import Sidebar from './Sidebar';

storiesOf('Sidebar', module)
  .add('notice', () => <Sidebar type="notice">This is a notice!</Sidebar>)
  .add('warning', () => <Sidebar type="warning">This is a warning!</Sidebar>);
