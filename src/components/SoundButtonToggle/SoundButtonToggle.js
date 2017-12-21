import React from 'react';
import styled from 'styled-components';

import ButtonToggle from '../ButtonToggle';

const SoundButtonToggle = ({ isAudible, handleToggleAudibility }) => (
  <SoundButtonToggleWrapper>
    <ButtonToggle
      isToggled={isAudible}
      onIcon="volumeOn"
      offIcon="volumeOff"
      handleClick={handleToggleAudibility}
    >
      Sound
    </ButtonToggle>
  </SoundButtonToggleWrapper>
);

const SoundButtonToggleWrapper = styled.div`
  position: fixed;
  z-index: 2;
  top: 1rem;
  right: 1rem;
`;

export default SoundButtonToggle;
