// @flow
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import Waveform from './Waveform';

import type { WaveformShape } from '../../types/index';

type Props = {
  shape: WaveformShape,
  speed: number,
};

type State = {
  progress: number,
};

class WaveformProgress extends Component<Props, State> {
  state = {
    progress: 0,
  };
  animationFrameId: number;

  static defaultProps = {
    speed: 1,
  };

  componentDidMount() {
    this.tick();
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationFrameId);
  }

  tick() {
    this.animationFrameId = window.requestAnimationFrame(() => {
      this.setState(
        state => ({ progress: (state.progress + this.props.speed) % 100 }),
        this.tick
      );
    });
  }

  render() {
    return (
      <Waveform
        shape={this.props.shape}
        cycles={2}
        offset={this.state.progress}
      />
    );
  }
}

storiesOf('Waveform', module)
  .add('Sine', () => <Waveform shape="sine" />)
  .add('Sine (2 cycles)', () => <Waveform shape="sine" cycles={2} />)
  .add('Sine (4 cycles)', () => <Waveform shape="sine" cycles={4} />)
  .add('Sine (10 cycles)', () => <Waveform shape="sine" cycles={10} />)
  .add('Sine with progress', () => <WaveformProgress shape="sine" />);
