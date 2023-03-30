/* @refresh reload */
import { render } from 'solid-js/web';
import { Router } from "@solidjs/router";

import 'normalize.css';
import '~/assets/styles/global.css';
import App from './App';

import { MellowMusicPlayerProvider } from '~/context/index';

const root = document.getElementById('root');

render(() => (
  <Router>
    <MellowMusicPlayerProvider>
      <App />
    </MellowMusicPlayerProvider>
  </Router>
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
), root!);
