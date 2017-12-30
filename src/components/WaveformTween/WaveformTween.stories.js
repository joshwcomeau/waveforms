// @flow
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { SHAPES } from '../../constants';

import Waveform from '../Waveform';

import WaveformTween from './WaveformTween';

class Manager extends Component<
  { isPlaying: boolean },
  { shapeIndex: number }
> {
  intervalId: number;
  state = {
    shapeIndex: 0,
  };

  componentDidMount() {
    this.intervalId = window.setInterval(this.randomizeShape, 1000);
  }

  randomizeShape = () => {
    this.setState({ shapeIndex: (this.state.shapeIndex + 1) % 4 });
  };

  render() {
    const { shapeIndex } = this.state;

    return (
      <WaveformTween
        frequency={2}
        amplitude={1}
        offset={0}
        width={500}
        shape={SHAPES[shapeIndex]}
      >
        {props => <Waveform {...props} />}
      </WaveformTween>
    );
  }
}

const RED = 'rgba(255, 0, 0, 0.5)';
const BLUE = 'rgba(0, 0, 255, 0.5)';

storiesOf('WaveformTween', module).add('default', () => <Manager />);
