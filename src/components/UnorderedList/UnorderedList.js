import styled from 'styled-components';

import { COLORS } from '../../constants';

export default styled.ul`
  padding: 0;
  margin: 0;
  margin-bottom: 40px;
  padding-left: 25px;
  font-size: 22px;
  line-height: 1.5;
  font-weight: 300;
  color: ${COLORS.gray[900]};
  -webkit-font-smoothing: 'antialiased';
  list-style-type: square;

  & > li {
    margin-bottom: 10px;
  }
`;
