import styled from 'styled-components';

import { COLORS, BREAKPOINTS } from '../../constants';

export default styled.p`
  margin-bottom: 25px;
  font-size: 24px;
  font-weight: 300;
  line-height: 1.5;
  color: ${COLORS.gray[900]};
  -webkit-font-smoothing: 'antialiased';

  @media ${BREAKPOINTS.sm} {
    font-size: 21px;
  }

  @media ${BREAKPOINTS.mdMin} {
    font-size: 24px;
  }
`;
