// @flow
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Waveform from './Waveform';

import type { WaveformShape } from '../../types/index';

class WaveformProgress extends Component {
  props: {
    shape: WaveformShape,
    speed: number,
  };
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
        state => ({ progress: (state.progress + this.props.speed) % 99 }),
        this.tick
      );
    });
  }

  render() {
    return (
      <Waveform
        shape={this.props.shape}
        progressPercentage={this.state.progress}
      />
    );
  }
}

storiesOf('Waveform', module)
  .add('Default', () => <Waveform />)
  .add('Sine', () => <Waveform shape="sine" />)
  .add('Sine with progress', () => <WaveformProgress shape="sine" />);
