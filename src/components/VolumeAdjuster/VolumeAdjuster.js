// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';
import { range } from '../../utils';

type Props = {
  blockSize?: number,
  currentVolume: number,
  maxVolume: number,
  onAdjustVolume: (volume: number) => void,
};

const VolumeAdjuster = ({
  blockSize = 16,
  currentVolume,
  maxVolume,
  onAdjustVolume,
}: Props) => {
  return (
    <Wrapper>
      <Label>Volume</Label>
      <VolumeBlocks>
        {range(1, maxVolume).map(index => (
          <VolumeBlock
            key={index}
            size={blockSize}
            onClick={() => onAdjustVolume(index)}
          >
            <VolumeBlockFill isFilled={index <= currentVolume} />
          </VolumeBlock>
        ))}
      </VolumeBlocks>
    </Wrapper>
  );
};

const BORDER_WIDTH = 2;

const Wrapper = styled.div``;

const Label = styled.span`
  font-size: 16px;
  text-transform: uppercase;
  color: ${COLORS.gray[500]};
`;

const VolumeBlocks = styled.div`
  display: flex;
`;

const VolumeBlock = styled.button`
  position: relative;
  width: ${props => props.size + 'px'};
  height: ${props => props.size + 'px'};
  background: #fff;
  border: ${BORDER_WIDTH + 'px'} solid ${COLORS.gray[300]};
  border-radius: 0;
  margin-right: 2px;
  outline: none;
`;

const VolumeBlockFill = styled.div`
  position: absolute;
  top: ${-BORDER_WIDTH + 'px'};
  left: ${-BORDER_WIDTH + 'px'};
  right: ${-BORDER_WIDTH + 'px'};
  bottom: ${-BORDER_WIDTH + 'px'};
  background: ${COLORS.primary[500]};
  opacity: ${props => (props.isFilled ? 1 : 0)};
  transition: opacity 250ms;
`;

export default VolumeAdjuster;
