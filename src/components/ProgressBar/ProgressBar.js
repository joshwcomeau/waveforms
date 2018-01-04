// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

type Props = {
  height?: number,
  progress: number,
};

const ProgressBar = ({ height = 30, progress }: Props) => {
  return (
    <Wrapper height={height}>
      <GradientBar />
      <BarBlocker progress={progress} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  height: ${props => props.height}px;
`;

const GradientBar = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
  background: ${COLORS.indigo[500]};
  background: linear-gradient(
    to right,
    ${COLORS.indigo[500]} 0%,
    ${COLORS.purple[500]} 50%,
    ${COLORS.pink[500]} 100%
  );
`;

const BarBlocker = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${COLORS.gray[50]};
  transform: ${props => `translateX(${props.progress}%)`};
`;

export default ProgressBar;
