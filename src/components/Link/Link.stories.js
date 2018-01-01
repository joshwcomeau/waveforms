// @flow
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';

import Link from './Link';

const Wrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;

storiesOf('Link', module)
  .add('Internal', () => (
    <Wrapper>
      <Link to="some-internal-path">Internal!</Link>
    </Wrapper>
  ))
  .add('External', () => (
    <Wrapper>
      <Link external to="http://google.com">
        External!
      </Link>
    </Wrapper>
  ))
  .add('with descenders', () => (
    <Wrapper>
      <Link to="some-internal-path">Let's go get some proper coffee</Link>
    </Wrapper>
  ));
