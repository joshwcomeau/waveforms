import styled from 'styled-components';

import { BREAKPOINTS } from '../../constants';

// TODO: Support different 'levels'?

export default styled.h4`
  margin-bottom: 25px;
  font-size: 30px;
  font-weight: 600;
  letter-spacing: -0.5px;
  -webkit-font-smoothing: antialiased;

  @media ${BREAKPOINTS.sm} {
    font-size: 25px;
  }

  @media ${BREAKPOINTS.mdMin} {
    font-size: 32px;
  }
`;
