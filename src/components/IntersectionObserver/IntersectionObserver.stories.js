// @flow
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import IntersectionObserver from './IntersectionObserver';

const fivePercentTriggers = [
  0,
  0.05,
  0.1,
  0.15,
  0.2,
  0.25,
  0.3,
  0.35,
  0.4,
  0.45,
  0.5,
  0.55,
  0.6,
  0.65,
  0.7,
  0.75,
  0.8,
  0.85,
  0.9,
  0.95,
  1,
];

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
  .add('logging', () => (
    <Wrapper id="logger" onIntersect={(...args) => console.info(...args)} />
  ))
  .add('logging with 5% triggers', () => (
    <Wrapper
      id="logger"
      threshold={fivePercentTriggers}
      onIntersect={(...args) => console.info(...args)}
    />
  ))
  .add('logging intersectionRect (5% triggers)', () => (
    <Wrapper
      id="logger"
      threshold={fivePercentTriggers}
      onIntersect={(id, entry) => console.info(entry.intersectionRect)}
    />
  ))
  .add('Only log enter', () => (
    <Wrapper
      id="logger"
      threshold={fivePercentTriggers}
      onlyFireOn="enter"
      onIntersect={(...args) => console.info(...args)}
    />
  ))
  .add('Only log exit', () => (
    <Wrapper
      id="logger"
      threshold={fivePercentTriggers}
      onlyFireOn="exit"
      onIntersect={(...args) => console.info(...args)}
    />
  ));
