// @flow
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { DEFAULT_WAVEFORM_SIZE } from '../../constants/index';

import Waveform from '../Waveform';
import WaveformAxes from '../WaveformAxes';
import WaveformIntercept from '../WaveformIntercept';

import WaveformPlayer from './WaveformPlayer';

type Props = {};
type State = { speed: number };

class VariableFrequency extends Component<Props, State> {
  state = {
    speed: 1,
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
      this.setState({ speed: this.state.speed + 0.01 }, this.tick);
    }, 20);
  };

  render() {
    return (
      <WaveformPlayer isPlaying speed={this.state.speed}>
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
      {(offset, numOfCycles) => (
        <Waveform shape="sine" offset={offset} numOfCycles={numOfCycles} />
      )}
    </WaveformPlayer>
  ))
  .add('playing (2Hz at 1 cycle)', () => (
    <WaveformPlayer isPlaying speed={2}>
      {(offset, numOfCycles) => (
        <Waveform shape="sine" offset={offset} numOfCycles={numOfCycles} />
      )}
    </WaveformPlayer>
  ))
  .add('playing (2Hz at 2 cycles)', () => (
    <WaveformPlayer isPlaying speed={2} numOfCycles={2}>
      {(offset, numOfCycles) => (
        <Waveform shape="sine" offset={offset} numOfCycles={numOfCycles} />
      )}
    </WaveformPlayer>
  ))
  .add('playing (5Hz at 2 cycles)', () => (
    <WaveformPlayer isPlaying speed={5} numOfCycles={2}>
      {(offset, numOfCycles) => (
        <Waveform shape="sine" offset={offset} numOfCycles={numOfCycles} />
      )}
    </WaveformPlayer>
  ))
  .add('playing (0.5Hz)', () => (
    <WaveformPlayer isPlaying speed={0.5}>
      {(offset, numOfCycles) => (
        <Waveform shape="sine" offset={offset} numOfCycles={numOfCycles} />
      )}
    </WaveformPlayer>
  ))
  .add('variable speed', () => <VariableFrequency />)
  .add('with axes', () => (
    <div style={{ position: 'relative' }}>
      <WaveformPlayer isPlaying speed={1}>
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
      <WaveformPlayer isPlaying speed={1}>
        {offset => (
          <span>
            <WaveformAxes />
            <Waveform shape="sine" offset={offset} />
            <WaveformIntercept waveformShape="sine" offset={offset} />
          </span>
        )}
      </WaveformPlayer>
    </div>
  ));
