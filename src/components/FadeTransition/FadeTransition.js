// @flow
import React from 'react';
import Transition from 'react-transition-group/Transition';

type Props = {
  isVisible: boolean,
  duration?: number,
  typeName?: string,
  children: React$Node,
};

const FadeTransition = ({
  isVisible,
  duration = 500,
  typeName = 'span',
  children,
}: Props) => {
  return (
    <Transition in={isVisible} timeout={duration}>
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
