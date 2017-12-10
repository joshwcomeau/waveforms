// @flow
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import IntersectionObserver from './IntersectionObserver';

const Wrapper = props => (
  <IntersectionObserverContainer>
    <IntersectionObserver {...props}>
      <IntersectionObserverChild>Hello world</IntersectionObserverChild>
    </IntersectionObserver>
  </IntersectionObserverContainer>
);

const IntersectionObserverContainer = styled.div`
  height: 3000px;
  padding-top: 1000px;
`;

const IntersectionObserverChild = styled.div`
  padding: 500px;
  border: 1px solid red;
`;

storiesOf('IntersectionObserver', module)
  .add('logging', () => <Wrapper />)
  .add('TODO', () => <div />);
