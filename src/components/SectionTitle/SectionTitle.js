import styled from 'styled-components';

import { COLORS, BREAKPOINTS } from '../../constants';

export default styled.h2`
  margin-bottom: 45px;
  padding-bottom: 12px;
  font-weight: 400;
  border-bottom: 5px solid ${COLORS.gray[900]};
  letter-spacing: -1px;

  @media ${BREAKPOINTS.sm} {
    font-size: 28px;
  }

  @media ${BREAKPOINTS.mdMin} {
    font-size: 42px;
  }
`;
