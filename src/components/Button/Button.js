// @flow
import React from 'react';
import styled from 'styled-components';
import VolumeOff from 'react-icons/lib/md/volume-off';
import VolumeOn from 'react-icons/lib/md/volume-up';

import { COLORS } from '../../constants';

import type { AvailableIcon } from '../../types';

const ICONS = {
  volumeOff: VolumeOff,
  volumeOn: VolumeOn,
};

const ICON_SIZE = 24;

type Props = {
  icon?: AvailableIcon,
  type?: 'primary' | 'secondary',
  onClick: () => void,
  children: React$Node,
};

const Button = ({ icon, type = 'primary', children }: Props) => {
  return (
    <ButtonElem type={type} hasIcon={!!icon}>
      {children}
      {icon && (
        <IconWrapper>
          {React.createElement(ICONS[icon], { size: ICON_SIZE })}
        </IconWrapper>
      )}
    </ButtonElem>
  );
};

const BUTTON_COLORS = {
  primary: COLORS.blue,
  secondary: COLORS.gray,
};

const ButtonElem = styled.button`
  position: relative;
  padding-top: 10px;
  padding-left: 20px;
  padding-right: ${props => (props.hasIcon ? '50px' : '20px')};
  padding-bottom: 10px;

  font-size: 14px;
  color: ${COLORS.gray[50]};

  background-color: ${props => BUTTON_COLORS[props.type][500]};
  border: none;
  border-bottom: 2px solid ${props => BUTTON_COLORS[props.type][700]};
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  margin: auto;
  width: ${ICON_SIZE + 'px'};
  height: ${ICON_SIZE + 'px'};
`;

export default Button;
