// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import FrequencyGraph from './FrequencyGraph';

const FrequencyGraphWithPadding = props => (
  <Wrapper>
    <FrequencyGraph {...props} />
  </Wrapper>
);

const Wrapper = styled.div`
  padding: 40px;
`;

storiesOf('FrequencyGraph', module)
  .add('default (sine)', () => <FrequencyGraphWithPadding />)
  .add('sine, base frequency 2', () => (
    <FrequencyGraphWithPadding baseFrequency={2} />
  ))
  .add('triangle', () => <FrequencyGraphWithPadding shape="triangle" />)
  .add('square', () => <FrequencyGraphWithPadding shape="square" />)
  .add('sawtooth', () => <FrequencyGraphWithPadding shape="sawtooth" />);
