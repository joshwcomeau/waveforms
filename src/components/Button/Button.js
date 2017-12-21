// @flow
import React from 'react';
import styled from 'styled-components';
import VolumeMute from 'react-icons/lib/md/volume-mute';

import { COLORS } from '../../constants';

const ICONS = {
  mute: VolumeMute,
};

type Props = {
  icon?: string,
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
          {React.createElement(ICONS[icon], { size: 24 })}
        </IconWrapper>
      )}
    </ButtonElem>
  );
};

const BUTTON_COLORS = {
  primary: COLORS.blue,
};

const ButtonElem = styled.button`
  position: relative;
  padding-top: 10px;
  padding-left: 20px;
  padding-right: ${props => (props.hasIcon ? '40px' : '20px')};
  padding-bottom: 10px;

  font-size: 16px;
  color: ${COLORS.gray[50]};

  background-color: ${props => BUTTON_COLORS[props.type][500]};
  border: none;
  border-bottom: 2px solid ${props => BUTTON_COLORS[props.type][700]};
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 8px;
  right: 10px;
  bottom: 0;
`;

export default Button;
