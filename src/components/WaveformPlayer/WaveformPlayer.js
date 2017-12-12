// @flow
import React, { PureComponent } from 'react';
import { Motion, spring } from 'react-motion';
import styled from 'styled-components';

import { DEFAULT_WAVEFORM_FREQUENCY } from '../../constants';

import Aux from '../Aux';

type Props = {
  isPlaying: boolean,
  frequency: number,
  children: (offset: number) => React$Node,
};

type State = {
  // `cycles` is the number of cycles that have advanced since starting.
  // It can be decimal, and is reset whenever `isPlaying` changes.
  cycles: number,
  lastTickAt: ?Date,
  // When we receive the request to stop the animation, it's nice to follow
  // through to the end of the current cycle, so that it winds up in its
  // original position.
  // This number controls the cycle the stop was requested in.
  stopRequestedAtCycle: ?number,
};

class WaveformPlayer extends PureComponent<Props, State> {
  animationFrameId: number;

  state = {
    cycles: 0,
    lastTickAt: null,
    stopRequestedAtCycle: null,
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
    this.setState({ lastTickAt: new Date() }, this.tick);
  };

  stop = () => {
    this.setState({
      stopRequestedAtCycle: this.state.cycles,
    });
  };

  tick = () => {
    this.animationFrameId = window.requestAnimationFrame(() => {
      const { frequency } = this.props;
      const { cycles, stopRequestedAtCycle, lastTickAt } = this.state;

      if (!lastTickAt) {
        return;
      }

      const tickAt = new Date();

      const secondsSinceLastTick = (tickAt - lastTickAt) / 1000;

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

      // prettier-ignore
      const nextCyclesValue = cycles + (secondsSinceLastTick * frequency);

      // If this is the tick that pushes us into the next cycle, and we've
      // requested a stop, let's end this animation.
      if (typeof stopRequestedAtCycle === 'number') {
        const nextCyclesInteger = Math.floor(nextCyclesValue);

        if (nextCyclesInteger > cycles) {
          this.setState({
            cycles: Math.floor(nextCyclesValue),
            lastTickAt: tickAt,
            stopRequestedAtCycle: null,
          });
          return;
        }
      }

      this.setState({ cycles: nextCyclesValue, lastTickAt: tickAt }, this.tick);
    });
  };

  renderSpringValue = ({ cycles }: { cycles: number }) => {
    const { children } = this.props;

    // `cycles` is an ever-increasing decimal value representing how many
    // iterations of the loop have occured.
    // Transform this value into a circular value between 0 and 99.
    const circularCycles = (cycles * 100) % 100;

    // To appease React Motion, we have to return a React element, so we use
    // the self-erasing <Aux>. This is really just a bit of a hack; I shouldn't
    // really be using React Motion for this at all, I should just manage my own
    // spring values.
    return <Aux>{children((cycles * 100) % 100)}</Aux>;
  };

  render() {
    const { cycles } = this.state;

    return (
      <Motion defaultStyle={{ cycles: 0 }} style={{ cycles: spring(cycles) }}>
        {this.renderSpringValue}
      </Motion>
    );
  }
}

export default WaveformPlayer;
