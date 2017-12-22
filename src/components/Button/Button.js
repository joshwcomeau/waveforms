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

const ICON_SIZE = 21;

type Props = {
  icon?: AvailableIcon,
  type?: 'primary' | 'secondary',
  width?: number,
  onClick?: () => void,
  children: React$Node,
};

const Button = ({
  icon,
  type = 'primary',
  width,
  onClick,
  children,
}: Props) => {
  return (
    <ButtonElem type={type} width={width} hasIcon={!!icon} onClick={onClick}>
      {children}
      {icon && (
        <IconWrapper>
          {React.createElement(ICONS[icon], { size: ICON_SIZE })}
        </IconWrapper>
      )}
    </ButtonElem>
  );
};

const BUTTON_BACKGROUND_COLOR = {
  primary: COLORS.primary[500],
  secondary: COLORS.primary[700],
};

const BUTTON_BORDER_COLOR = {
  primary: COLORS.primary[700],
  secondary: COLORS.primary[900],
};

const ButtonElem = styled.button`
  position: relative;
  padding: 10px 20px;
  width: ${props => (props.width ? `${props.width}px` : 'auto')};
  font-size: 14px;
  color: ${COLORS.gray[50]};

  background-color: ${props => BUTTON_BACKGROUND_COLOR[props.type]};
  border: none;
  border-bottom: 2px solid ${props => BUTTON_BORDER_COLOR[props.type]};
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
