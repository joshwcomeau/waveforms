// Utility component that generates a random value within a given range.
// Used exclusively for Storybook stories, at the time of writing.
// @flow
import React, { PureComponent } from 'react';

import { random } from '../../utils';

type Props = {
  from: number,
  to: number,
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

  tick = () => {
    this.setState({ value: random(this.props.from, this.props.to) });
  };

  render() {
    return this.props.children(this.state.value);
  }
}

export default ValueGenerator;
