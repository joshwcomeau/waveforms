// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import VolumeOff from 'react-icons/lib/md/volume-off';
import VolumeOn from 'react-icons/lib/md/volume-up';

import { COLORS } from '../../constants';
import { range } from '../../utils';

type Props = {
  blockSize: number,
  currentVolume: number,
  steps: number,
  isMuted: boolean,
  onAdjustVolume: (volume: number) => void,
  onToggleMute: () => void,
};

class VolumeAdjuster extends PureComponent<Props> {
  static defaultProps = {
    blockSize: 16,
    steps: 10,
    isMuted: false,
  };

  render() {
    const { blockSize, currentVolume, steps, isMuted } = this.props;

    const isAudible = !isMuted && currentVolume > 0;
    const VolumeIcon = isAudible ? VolumeOn : VolumeOff;

    return (
      <Wrapper>
        <Header>
          <Label>Volume</Label>
          <MuteButton onClick={this.props.onToggleMute}>
            <VolumeIcon
              color={isAudible ? COLORS.primary[500] : COLORS.gray[700]}
            />
          </MuteButton>
        </Header>

        <VolumeBlocks>
          {range(1, steps - 1).map(index => (
            <VolumeBlock
              key={index}
              size={blockSize}
              onClick={() => this.props.onAdjustVolume(index / steps)}
            >
              <VolumeBlockFill
                isFilled={index / steps <= currentVolume}
                isEnabled={!isMuted}
              />
            </VolumeBlock>
          ))}
        </VolumeBlocks>
      </Wrapper>
    );
  }
}

const BORDER_WIDTH = 1;

const Wrapper = styled.div`
  /*
    Disable double-tap-to-zoom, which can be frustrating when adjusting volume
  */
  touch-action: none;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

const Label = styled.span`
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 400;
  color: ${COLORS.gray[700]};
`;

const MuteButton = styled.button`
  background: transparent;
  border: none;
  padding: 5px;
  font-size: 17px;
  cursor: pointer;
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
  margin-right: 1px;
  outline: none;
`;

const VolumeBlockFill = styled.div`
  position: absolute;
  top: ${-BORDER_WIDTH + 'px'};
  left: ${-BORDER_WIDTH + 'px'};
  right: ${-BORDER_WIDTH + 'px'};
  bottom: ${-BORDER_WIDTH + 'px'};
  background: ${props =>
    props.isEnabled ? COLORS.primary[500] : COLORS.gray[700]};
  opacity: ${props => (props.isFilled ? 1 : 0)};
  transition: opacity 250ms;
`;

export default VolumeAdjuster;
