// @flow
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { DEFAULT_WAVEFORM_SIZE } from '../../constants/index';
import { convertProgressToCycle } from '../../helpers/waveform.helpers';

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
        {({ progress }) => (
          <Waveform shape="sine" offset={convertProgressToCycle(progress)} />
        )}
      </WaveformPlayer>
    );
  }
}

storiesOf('WaveformPlayer', module)
  .add('default (paused)', () => (
    <WaveformPlayer>
      {({ progress }) => (
        <Waveform shape="sine" offset={convertProgressToCycle(progress)} />
      )}
    </WaveformPlayer>
  ))
  .add('playing', () => (
    <WaveformPlayer isPlaying>
      {({ progress, frequency }) => (
        <Waveform
          shape="sine"
          offset={convertProgressToCycle(progress)}
          frequency={frequency}
        />
      )}
    </WaveformPlayer>
  ))
  .add('playing (2Hz at 1 cycle)', () => (
    <WaveformPlayer isPlaying speed={2}>
      {({ progress, frequency }) => (
        <Waveform
          shape="sine"
          offset={convertProgressToCycle(progress)}
          frequency={frequency}
        />
      )}
    </WaveformPlayer>
  ))
  .add('playing (2Hz at 2 cycles)', () => (
    <WaveformPlayer isPlaying speed={2} frequency={2}>
      {({ progress, frequency }) => (
        <Waveform
          shape="sine"
          offset={convertProgressToCycle(progress)}
          frequency={frequency}
        />
      )}
    </WaveformPlayer>
  ))
  .add('playing (5Hz at 2 cycles)', () => (
    <WaveformPlayer isPlaying speed={5} frequency={2}>
      {({ progress, frequency }) => (
        <Waveform
          shape="sine"
          offset={convertProgressToCycle(progress)}
          frequency={frequency}
        />
      )}
    </WaveformPlayer>
  ))
  .add('playing (0.5Hz)', () => (
    <WaveformPlayer isPlaying speed={0.5}>
      {({ progress, frequency }) => (
        <Waveform
          shape="sine"
          offset={convertProgressToCycle(progress)}
          frequency={frequency}
        />
      )}
    </WaveformPlayer>
  ))
  .add('variable speed', () => <VariableFrequency />)
  .add('with axes', () => (
    <div style={{ position: 'relative' }}>
      <WaveformPlayer isPlaying speed={1}>
        {({ progress }) => (
          <span>
            <WaveformAxes />
            <Waveform shape="sine" offset={convertProgressToCycle(progress)} />
          </span>
        )}
      </WaveformPlayer>
    </div>
  ))
  .add('with axes and intercept', () => (
    <div style={{ position: 'relative' }}>
      <WaveformPlayer isPlaying speed={1}>
        {({ progress }) => (
          <span>
            <WaveformAxes />
            <Waveform shape="sine" offset={convertProgressToCycle(progress)} />
            <WaveformIntercept
              waveformShape="sine"
              offset={convertProgressToCycle(progress)}
            />
          </span>
        )}
      </WaveformPlayer>
    </div>
  ));
