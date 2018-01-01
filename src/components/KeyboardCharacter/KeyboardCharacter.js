// @flow
import styled from 'styled-components';

import { COLORS } from '../../constants';

export default styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 4px;
  font-size: 16px;
  font-weight: 500;
  color: ${COLORS.gray[700]};
  background: ${COLORS.white};
  border-top: 0.5px solid rgba(0, 0, 0, 0.1);
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  border-bottom: 3px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  cursor: default;
  vertical-align: middle;
`;
