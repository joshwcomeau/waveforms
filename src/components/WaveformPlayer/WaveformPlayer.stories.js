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
      this.setState({ frequency: this.state.frequency + 0.25 }, this.tick);
    }, 500);
  };

  render() {
    return <WaveformPlayer isPlaying frequency={this.state.frequency} />;
  }
}

storiesOf('WaveformPlayer', module)
  .add('default (paused)', () => <WaveformPlayer />)
  .add('playing', () => <WaveformPlayer isPlaying />)
  .add('playing (2Hz)', () => <WaveformPlayer isPlaying frequency={2} />)
  .add('variable speed', () => <VariableFrequency />);
