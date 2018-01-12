import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { injectGlobal } from 'styled-components';

import { COLORS } from '../../constants';

import IntroRoute from '../IntroRoute';
import Footer from '../Footer';

// NOTE: Many of the variable-free global CSS lives in public/index.html.
// I think it's better to leave stuff there to avoid a flash once the JS is
// parsed.
// For certain things that require variables, though, better to do it here.
injectGlobal`
  body {
    background: ${COLORS.gray[50]};
    color: ${COLORS.gray[800]};
  }
`;

const App = () => {
  return (
    <Router>
      <Fragment>
        <Switch>
          <Route path="/waveforms-intro" component={IntroRoute} />
          <Redirect from="/" to="/waveforms-intro" />
        </Switch>
        <Footer />
      </Fragment>
    </Router>
  );
};

export default App;
