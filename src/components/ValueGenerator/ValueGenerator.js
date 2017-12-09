// Utility component that generates a random value within a given range.
// Used exclusively for Storybook stories, at the time of writing.
// @flow
import React, { PureComponent } from 'react';
import { Motion, spring } from 'react-motion';

import { random } from '../../utils';

type Props = {
  from: number,
  to: number,
  mode: 'random' | 'oscillate',
  updateEvery: number,
  children: (value: number) => any,
};

type State = {
  value: number,
};

class ValueGenerator extends PureComponent<Props, State> {
  state = {
    value: 0,
  };

  intervalId: number;

  static defaultProps = {
    from: 0,
    to: 1,
    updateEvery: 1000,
  };

  componentDidMount() {
    this.intervalId = window.setInterval(this.tick, this.props.updateEvery);
  }

  componentWillUnmount() {
    window.clearInterval(this.intervalId);
  }

  getValueForNextTick = () => {
    const { mode, from, to } = this.props;
    const { value } = this.state;

    switch (mode) {
      case 'random':
        return random(from, to);
      case 'oscillate':
        return value === from ? to : from;
    }
  };

  tick = () => {
    this.setState({ value: this.getValueForNextTick() });
  };

  render() {
    return (
      <Motion
        defaultStyle={{ value: 0 }}
        style={{ value: spring(this.state.value) }}
      >
        {({ value }) => this.props.children(value)}
      </Motion>
    );
  }
}

export default ValueGenerator;
