// @flow
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { DEFAULT_WAVEFORM_SIZE } from '../../constants/index';

import Waveform from '../Waveform';
import WaveformAxes from '../WaveformAxes';
import WaveformIntercept from '../WaveformIntercept';

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
    return (
      <WaveformPlayer isPlaying frequency={this.state.frequency}>
        {offset => <Waveform shape="sine" offset={offset} />}
      </WaveformPlayer>
    );
  }
}

storiesOf('WaveformPlayer', module)
  .add('default (paused)', () => (
    <WaveformPlayer>
      {offset => <Waveform shape="sine" offset={offset} />}
    </WaveformPlayer>
  ))
  .add('playing', () => (
    <WaveformPlayer isPlaying>
      {offset => <Waveform shape="sine" offset={offset} />}
    </WaveformPlayer>
  ))
  .add('playing (2Hz)', () => (
    <WaveformPlayer isPlaying frequency={2}>
      {offset => <Waveform shape="sine" offset={offset} />}
    </WaveformPlayer>
  ))
  .add('playing (5Hz)', () => (
    <WaveformPlayer isPlaying frequency={5}>
      {offset => <Waveform shape="sine" offset={offset} />}
    </WaveformPlayer>
  ))
  .add('playing (10Hz)', () => (
    <WaveformPlayer isPlaying frequency={10}>
      {offset => <Waveform shape="sine" offset={offset} />}
    </WaveformPlayer>
  ))
  .add('playing (0.5Hz)', () => (
    <WaveformPlayer isPlaying frequency={0.5}>
      {offset => <Waveform shape="sine" offset={offset} />}
    </WaveformPlayer>
  ))
  .add('variable speed', () => <VariableFrequency />)
  .add('with axes', () => (
    <div style={{ position: 'relative' }}>
      <WaveformPlayer isPlaying frequency={1}>
        {offset => (
          <span>
            <WaveformAxes size={DEFAULT_WAVEFORM_SIZE} />
            <Waveform shape="sine" offset={offset} />
          </span>
        )}
      </WaveformPlayer>
    </div>
  ))
  .add('with axes and intercept', () => (
    <div style={{ position: 'relative' }}>
      <WaveformPlayer isPlaying frequency={1}>
        {offset => (
          <span>
            <WaveformAxes />
            <Waveform shape="sine" offset={offset} />
            <WaveformIntercept shape="sine" offset={offset} />
          </span>
        )}
      </WaveformPlayer>
    </div>
  ));
