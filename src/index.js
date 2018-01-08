import React from 'react';
import { hydrate, render } from 'react-dom';
import loadScripts from 'snapshotify';

import './polyfills';

import App from './components/App';

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  loadScripts().then(() => hydrate(<App />, rootElement));
} else {
  render(<App />, rootElement);
}
