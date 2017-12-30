// @flow
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { SHAPES } from '../../constants';
import { convertProgressToCycle } from '../../helpers/waveform.helpers';

import Waveform from '../Waveform';

import WaveformPlayer from '../WaveformPlayer';
import WaveformTween from './WaveformTween';

type ManagerProps = {
  isPlaying: boolean,
  frequency: number,
  amplitude: number,
};
type ManagerState = {
  shapeIndex: number,
};

class Manager extends Component<ManagerProps, ManagerState> {
  intervalId: number;
  state = {
    shapeIndex: 0,
  };

  static defaultProps = {
    isPlaying: false,
    frequency: 2,
    amplitude: 1,
  };

  componentDidMount() {
    this.intervalId = window.setInterval(this.randomizeShape, 1000);
  }

  randomizeShape = () => {
    this.setState({ shapeIndex: (this.state.shapeIndex + 1) % 4 });
  };

  render() {
    const { isPlaying } = this.props;
    const { shapeIndex } = this.state;

    return (
      <WaveformPlayer
        frequency={this.props.frequency}
        amplitude={this.props.amplitude}
        isPlaying={isPlaying}
      >
        {({ frequency, amplitude, progress }) => (
          <WaveformTween
            frequency={2}
            amplitude={1}
            offset={convertProgressToCycle(progress)}
            width={500}
            shape={SHAPES[shapeIndex]}
          >
            {props => <Waveform {...props} />}
          </WaveformTween>
        )}
      </WaveformPlayer>
    );
  }
}

const RED = 'rgba(255, 0, 0, 0.5)';
const BLUE = 'rgba(0, 0, 255, 0.5)';

storiesOf('WaveformTween', module)
  .add('default (static)', () => <Manager isPlaying={false} />)
  .add('is playing', () => <Manager isPlaying />);
