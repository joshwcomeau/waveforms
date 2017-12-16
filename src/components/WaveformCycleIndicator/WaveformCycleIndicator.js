// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

import { getWidthFor1Cycle } from './WaveformCycleIndicator.helpers';

type Props = {
  numOfCycles: number,
};

const WaveformCycleIndicator = ({ numOfCycles }: Props) => (
  <WaveformCycleIndicatorWrapper numOfCycles={numOfCycles}>
    <CycleLabel>1 Cycle</CycleLabel>
    <CycleIndicator />
  </WaveformCycleIndicatorWrapper>
);

const WaveformCycleIndicatorWrapper = styled.div.attrs({
  width: getWidthFor1Cycle,
})`
  position: absolute;
  top: -25px;
  left: 0;
  transform: translateY(-100%);
`;

const CycleLabel = styled.div`
  text-align: center;
  font-size: 14px;
`;

const CycleIndicator = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background-color: ${COLORS.gray[500]};

  &:before {
    content: '';
    position: absolute;
    left: 0;
    bottom: -4px;
    height: 4px;
    width: 1px;
    background-color: ${COLORS.gray[500]};
  }

  &:after {
    content: '';
    position: absolute;
    right: 0;
    bottom: -4px;
    height: 4px;
    width: 1px;
    background-color: ${COLORS.gray[500]};
  }
`;

export default WaveformCycleIndicator;
