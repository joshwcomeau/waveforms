import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { isMobile } from '../../helpers/responsive.helpers';

class RevealableAnswer extends PureComponent {
  state = {
    isRevealed: false,
  };

  reveal = () => {
    this.setState({ isRevealed: true });
  };

  render() {
    const { children } = this.props;
    const { isRevealed } = this.state;

    const verb = isMobile() ? 'Tap' : 'Click';

    return isRevealed ? (
      children
    ) : (
      <Trigger onClick={this.reveal}>{verb} to reveal the answer</Trigger>
    );
  }
}

const Trigger = styled.a`
  display: block;
  cursor: pointer;
  font-weight: 700;
`;

export default RevealableAnswer;
