// @flow
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { DEFAULT_WAVEFORM_SIZE, SHAPES } from '../../constants/index';
import { convertProgressToCycle } from '../../helpers/waveform.helpers';

import Waveform from '../Waveform';
import WaveformAxes from '../WaveformAxes';
import WaveformIntercept from '../WaveformIntercept';
import WaveformPlayer from './WaveformPlayer';

import type { WaveformShape } from '../../types';

type Props = { shape: WaveformShape };
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
        {({ progress }) => (
          <Waveform
            shape={this.props.shape}
            offset={convertProgressToCycle(progress)}
          />
        )}
      </WaveformPlayer>
    );
  }
}

SHAPES.forEach(shape =>
  storiesOf('WaveformPlayer', module)
    .add(`${shape} - paused`, () => (
      <WaveformPlayer>
        {({ progress }) => (
          <Waveform shape={shape} offset={convertProgressToCycle(progress)} />
        )}
      </WaveformPlayer>
    ))
    .add(`${shape} - playing`, () => (
      <WaveformPlayer isPlaying>
        {({ progress, frequency }) => (
          <Waveform
            shape={shape}
            offset={convertProgressToCycle(progress)}
            frequency={frequency}
          />
        )}
      </WaveformPlayer>
    ))

    .add(`${shape} - playing (2Hz)`, () => (
      <WaveformPlayer isPlaying frequency={2}>
        {({ progress, frequency }) => (
          <Waveform
            shape={shape}
            offset={convertProgressToCycle(progress)}
            frequency={frequency}
          />
        )}
      </WaveformPlayer>
    ))
    .add(`${shape} - playing (5Hz)`, () => (
      <WaveformPlayer isPlaying frequency={5}>
        {({ progress, frequency }) => (
          <Waveform
            shape={shape}
            offset={convertProgressToCycle(progress)}
            frequency={frequency}
          />
        )}
      </WaveformPlayer>
    ))
    .add(`${shape} - playing (0.5Hz)`, () => (
      <WaveformPlayer isPlaying frequency={0.5}>
        {({ progress, frequency }) => (
          <Waveform
            shape={shape}
            offset={convertProgressToCycle(progress)}
            frequency={frequency}
          />
        )}
      </WaveformPlayer>
    ))
    .add(`${shape} - ever-incrementing`, () => (
      <VariableFrequency shape={shape} />
    ))
    .add(`${shape} - with axes`, () => (
      <div style={{ position: 'relative' }}>
        <WaveformPlayer isPlaying speed={1}>
          {({ progress }) => (
            <span>
              <WaveformAxes />
              <Waveform
                shape={shape}
                offset={convertProgressToCycle(progress)}
              />
            </span>
          )}
        </WaveformPlayer>
      </div>
    ))
    .add(`${shape} - with axes and intercept`, () => (
      <div style={{ position: 'relative' }}>
        <WaveformPlayer isPlaying speed={1}>
          {({ progress }) => (
            <span>
              <WaveformAxes />
              <Waveform
                shape={shape}
                offset={convertProgressToCycle(progress)}
              />
              <WaveformIntercept
                waveformShape={shape}
                offset={convertProgressToCycle(progress)}
              />
            </span>
          )}
        </WaveformPlayer>
      </div>
    ))
);
