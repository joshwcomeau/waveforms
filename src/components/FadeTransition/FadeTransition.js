// @flow
import React from 'react';
import Transition from 'react-transition-group/Transition';

type Props = {
  isVisible: boolean,
  mountOnEnter: boolean,
  unmountOnExit: boolean,
  duration?: number,
  typeName?: string,
  children: React$Node,
};

const FadeTransition = ({
  isVisible,
  mountOnEnter,
  unmountOnExit,
  duration = 500,
  typeName = 'span',
  children,
}: Props) => {
  return (
    <Transition
      in={isVisible}
      mountOnEnter={mountOnEnter}
      unmountOnExit={unmountOnExit}
      timeout={duration}
    >
      {transitionState =>
        React.createElement(
          typeName,
          {
            style: {
              position: 'static',
              transition: `opacity ${duration}ms`,
              opacity: transitionState === 'entered' ? 1 : 0,
            },
          },
          children
        )
      }
    </Transition>
  );
};

export default FadeTransition;
