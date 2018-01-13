// @flow
import React, { PureComponent } from 'react';
import Transition from 'react-transition-group/Transition';

type Props = {
  isVisible: boolean,
  mountOnEnter: boolean,
  unmountOnExit: boolean,
  duration: number,
  typeName: string,
  children: React$Node,
};

class FadeTransition extends PureComponent<Props> {
  static defaultProps = {
    duration: 500,
    typeName: 'span',
  };

  render() {
    const {
      isVisible,
      duration,
      typeName,
      children,
      ...delegated
    } = this.props;

    return (
      <Transition in={isVisible} timeout={duration} {...delegated}>
        {transitionState =>
          React.createElement(
            typeName,
            {
              style: {
                position: 'static',
                display: 'inline-block',
                transition: `opacity ${duration}ms`,
                opacity: transitionState === 'entered' ? 1 : 0,
                pointerEvents: transitionState === 'entered' ? 'auto' : 'none',
              },
            },
            children
          )
        }
      </Transition>
    );
  }
}

export default FadeTransition;
