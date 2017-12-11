// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { DEFAULT_WAVEFORM_FREQUENCY } from '../../constants';

type Props = {
  isPlaying: boolean,
  frequency: number,
  children: (offset: number) => React$Node,
};

type State = {
  // `cycles` is the number of cycles that have advanced since starting.
  // It can be decimal, and is reset whenever `isPlaying` changes.
  cycles: number,
  lastTickAt?: Date,
};

class WaveformPlayer extends PureComponent<Props, State> {
  animationFrameId: number;

  state = {
    cycles: 0,
  };

  static defaultProps = {
    isPlaying: false,
    frequency: DEFAULT_WAVEFORM_FREQUENCY,
  };

  componentDidMount() {
    if (this.props.isPlaying) {
      this.start();
    }
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
        cycles: 0,
        lastTickAt: new Date(),
      },
      this.tick
    );
  };

  stop = () => {
    // TODO: Might be nice to have a 'gradual' stop, where it waits until the
    // end of the next cycle?
    window.cancelAnimationFrame(this.animationFrameId);

    this.setState({ cycles: 0 });
  };

  tick = () => {
    this.animationFrameId = window.requestAnimationFrame(() => {
      if (!this.state.lastTickAt) {
        return;
      }

      const tickAt = new Date();

      const secondsSinceLastTick = (tickAt - this.state.lastTickAt) / 1000;

      // At first glance, you might think we're just translating a fixed SVG
      // by `n` pixels to the left on every tick.
      // Actually, though, we're redrawing the wave on every tick.
      // This winds up being simpler, since it's an endless animation; this way
      // we don't have to worry about running out of wave, and every tick is
      // exactly the same.
      //
      // So, since we're not actually "moving" anything, all we need to know is
      // how many cycles have passed. If the number is 0.2, we're 20% through
      // the wave, and can start drawing from there.
      // By changing that value, we get the illusion of it moving.
      // on every frame.

      // NOTE: This formula is complex, and there's no smart math behind it:
      // I just wanted the number of cycles-per-second to increase gradually
      // with the frequency, so that higher-frequency waves appear to be moving
      // faster. It's just experimentation though.
      const cyclesPerSecond = this.props.frequency;

      const nextCyclesValue =
        this.state.cycles + secondsSinceLastTick * cyclesPerSecond;

      this.setState({ cycles: nextCyclesValue, lastTickAt: tickAt }, this.tick);
    });
  };

  render() {
    const { isPlaying, children } = this.props;
    const { cycles } = this.state;

    // Turn cycles into a cyclical value between 0 and 99
    const offset = (cycles * 100) % 100;

    return children(offset);
  }
}

export default WaveformPlayer;
