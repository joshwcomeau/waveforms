// @flow
import React, { PureComponent } from 'react';

import Waveform from '../Waveform';
import WaveformAxes from '../WaveformAxes';

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
  lastTickAt?: Date,
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

    // window.setTimeout(this.stop, 4000);
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
    this.setState(
      {
        progress: 0,
        lastTickAt: new Date(),
      },
      this.tick,
    );
  };

  stop = () => {
    window.cancelAnimationFrame(this.animationFrameId);

    this.setState({ progress: 0 });
  };

  tick = () => {
    this.animationFrameId = window.requestAnimationFrame(() => {
      if (!this.state.lastTickAt) {
        return;
      }

      const tickAt = new Date();

      const secondsSinceLastTick = (tickAt - this.state.lastTickAt) / 1000;

      // Each tick, we want to advance the waveform by a certain amount.
      // This is controlled by the offset, and it's how we control the "speed"
      // of the waveform. The higher the frequency, the faster we want the
      // wave to "appear" to move.
      //
      // Of course, we aren't actually "moving" anything; we're redrawing it
      // on every frame.
      const progressPerSecond =
        0.5 / this.props.frequency + this.props.frequency * 0.1;

      const nextProgress =
        this.state.progress + secondsSinceLastTick * progressPerSecond;

      this.setState({ progress: nextProgress, lastTickAt: tickAt }, this.tick);
    });
  };

  render() {
    const { isPlaying, size, ...delegatedProps } = this.props;
    const { progress } = this.state;

    // Turn progress into a cyclical value between 0 and 99
    const offsetCycles = (progress * 100) % 100;

    return (
      <WaveformAxes size={size}>
        <Waveform {...delegatedProps} size={size} offset={offsetCycles} />
      </WaveformAxes>
    );
  }
}

export default WaveformPlayer;
