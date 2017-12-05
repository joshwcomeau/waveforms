// @flow
import { isMobile } from '../../helpers/responsive.helpers';

export const getPadding = ({
  noPadding,
  noPaddingOnMobile,
}: {
  noPadding: boolean,
  noPaddingOnMobile: boolean,
}) => {
  if (noPadding) {
    return 0;
  }

  if (isMobile() && noPaddingOnMobile) {
    return 0;
  }

  return isMobile() ? '1rem' : '2rem';
};
