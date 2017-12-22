// @flow
import React from 'react';
import styled from 'styled-components';

import ButtonToggle from '../ButtonToggle';
import FadeTransition from '../FadeTransition';

export const BUTTON_SIZE = 135;

type Props = {
  isVisible: boolean,
  isAudible: boolean,
  handleToggleAudibility: (val: boolean) => void,
};

const SoundButtonToggle = ({
  isVisible,
  isAudible,
  handleToggleAudibility,
}: Props) => (
  <SoundButtonToggleWrapper>
    <FadeTransition isVisible={isVisible}>
      <ButtonToggle
        width={BUTTON_SIZE}
        isToggled={isAudible}
        onIcon="volumeOn"
        offIcon="volumeOff"
        handleClick={handleToggleAudibility}
      >
        Sound
      </ButtonToggle>
    </FadeTransition>
  </SoundButtonToggleWrapper>
);

const SoundButtonToggleWrapper = styled.div`
  position: fixed;
  z-index: 2;
  top: 1rem;
  right: 1rem;
`;

export default SoundButtonToggle;
