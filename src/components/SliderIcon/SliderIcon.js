import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

const SliderIcon = ({ fieldName }) => {
  return (
    <Wrapper>
      <MiniSlider>
        <Bar1 />
        <Bar2 />
        <Handle />
      </MiniSlider>{' '}
      <strong>{fieldName} slider</strong>
    </Wrapper>
  );
};

const HANDLE_SIZE = 13;

const Wrapper = styled.span`
  white-space: nowrap;
`;

const MiniSlider = styled.span`
  position: relative;
  display: inline-block;
  width: 30px;
  height: ${HANDLE_SIZE}px;
  vertical-align: middle;
  margin-left: 4px;
`;

const Bar = styled.span`
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
  height: 2px;
  width: 50%;
`;

const Bar1 = styled(Bar)`
  left: 0;
  background-color: ${COLORS.gray[700]};
`;
const Bar2 = styled(Bar)`
  right: 0;
  background-color: ${COLORS.gray[400]};
`;

const Handle = styled.span`
  display: block;
  position: absolute;
  top: 0;
  left: 50%;
  height: ${HANDLE_SIZE}px;
  width: ${HANDLE_SIZE}px;
  border-radius: 50%;
  background: ${COLORS.primary[500]};
  transform: translateX(-50%);
`;

export default SliderIcon;
