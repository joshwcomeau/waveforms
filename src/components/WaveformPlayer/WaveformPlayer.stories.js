// @flow
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import WaveformPlayer from './WaveformPlayer';

type Props = {};
type State = { frequency: number };

class VariableFrequency extends Component<Props, State> {
  state = {
    frequency: 1,
  };

  timeoutId: number;

  componentDidMount() {
    this.tick();
  }

  componentWillUnmount() {
    window.clearTimeout(this.timeoutId);
  }

  tick = () => {
    this.timeoutId = window.setTimeout(() => {
      this.setState({ frequency: this.state.frequency + 0.01 }, this.tick);
    }, 20);
  };

  render() {
    return <WaveformPlayer isPlaying frequency={this.state.frequency} />;
  }
}

storiesOf('WaveformPlayer', module)
  .add('default (paused)', () => <WaveformPlayer />)
  .add('playing', () => <WaveformPlayer isPlaying />)
  .add('playing (2Hz)', () => <WaveformPlayer isPlaying frequency={2} />)
  .add('playing (5Hz)', () => <WaveformPlayer isPlaying frequency={5} />)
  .add('playing (10Hz)', () => <WaveformPlayer isPlaying frequency={10} />)
  .add('playing (0.5Hz)', () => <WaveformPlayer isPlaying frequency={0.5} />)
  .add('variable speed', () => <VariableFrequency />);
