import React from 'react';
import { injectGlobal } from 'styled-components';

import { COLORS } from '../../constants';

import Header from '../Header';
import MaxWidthWrapper from '../MaxWidthWrapper';

// NOTE: Many of the variable-free global CSS lives in public/index.html.
// I think it's better to leave stuff there to avoid a flash once the JS is
// parsed.
// For certain things that require variables, though, better to do it here.
injectGlobal`
  body {
    background: ${COLORS.cream[50]};
    color: ${COLORS.gray[800]};
  }
`;

const App = () => {
  return (
    <MaxWidthWrapper>
      <Header />
    </MaxWidthWrapper>
  );
};

export default App;
