// @flow
import React, { PureComponent } from 'react';

import Waveform from '../Waveform';

import type { Props as WaveformProps } from '../Waveform';

type Props = {
  ...WaveformProps,
  frequency: number,
  isPlaying: boolean,
};

type State = {
  // `progress` is the number of cycles that have advanced since starting.
  // It can be decimal, and is reset whenever `isPlaying` changes.
  progress: number,
  startTime: Date,
};

class WaveformPlayer extends PureComponent<Props, State> {
  animationFrameId: number;

  state = {
    progress: 0,
  };

  static defaultProps = {
    frequency: 1,
    shape: 'sine',
  };

  componentDidMount() {
    if (this.props.isPlaying) {
      this.start();
    }

    window.setTimeout(this.stop, 4000);
  }

  componentWillReceiveProps(nextProps: Props) {
    const isJustStarting = !this.props.isPlaying && nextProps.isPlaying;
    const isJustStopping = this.props.isPlaying && !nextProps.isPlaying;

    if (isJustStarting) {
      this.start();
    } else if (isJustStopping) {
      this.stop();
    }
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationFrameId);
  }

  start = () => {
    console.log('START');
    this.setState(
      {
        progress: 0,
        startTime: new Date(),
      },
      this.tick
    );
  };

  stop = () => {
    window.cancelAnimationFrame(this.animationFrameId);

    this.setState({ progress: 0 });
  };

  tick = () => {
    this.animationFrameId = window.requestAnimationFrame(() => {
      const secondsSinceStart = (new Date() - this.state.startTime) / 1000;
      const progress = secondsSinceStart * this.props.frequency;

      console.log(progress);

      this.setState({ progress }, this.tick);
    });
  };

  render() {
    const { frequency, isPlaying, ...delegatedProps } = this.props;
    const { progress } = this.state;

    return <Waveform {...delegatedProps} offset={(progress * 100) % 100} />;
  }
}

export default WaveformPlayer;
