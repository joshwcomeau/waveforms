// @flow
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { SHAPES } from '../../constants';
import { sample } from '../../utils';

import Waveform from '../Waveform';

import WaveformTween from './WaveformTween';

import type { WaveformShape } from '../../types';

class Manager extends Component<{}, { shape: WaveformShape }> {
  intervalId: number;
  state = {
    shape: 'sine',
  };

  componentDidMount() {
    this.intervalId = window.setInterval(this.randomizeShape, 1000);
  }

  randomizeShape = () => {
    this.setState({ shape: sample(SHAPES) });
  };

  render() {
    return (
      <WaveformTween
        frequency={1}
        amplitude={1}
        offset={0}
        width={100}
        shape={this.state.shape}
      >
        {props => <Waveform {...props} />}
      </WaveformTween>
    );
  }
}

const RED = 'rgba(255, 0, 0, 0.5)';
const BLUE = 'rgba(0, 0, 255, 0.5)';

storiesOf('WaveformTween', module).add('default', () => <Manager />);
