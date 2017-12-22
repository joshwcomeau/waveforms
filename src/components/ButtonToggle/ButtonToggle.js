// @flow
import React from 'react';

import Button from '../Button';
import type { AvailableIcon } from '../../types';

type Props = {
  isToggled?: boolean,
  onIcon: AvailableIcon,
  offIcon: AvailableIcon,
  handleClick?: (newToggleStatus: boolean) => void,
  children: React$Node,
};

const noop = () => {};

const ButtonToggle = ({
  isToggled = false,
  onIcon,
  offIcon,
  handleClick = noop,
  children,
  ...delegatedProps
}: Props) => {
  return (
    <Button
      type={isToggled ? 'primary' : 'secondary'}
      icon={isToggled ? onIcon : offIcon}
      onClick={() => handleClick(!isToggled)}
      {...delegatedProps}
    >
      {children}
    </Button>
  );
};

export default ButtonToggle;
