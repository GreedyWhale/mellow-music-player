/* @refresh reload */
import { render } from 'solid-js/web';
import { Router } from "@solidjs/router";

import 'normalize.css';
import '~/assets/styles/global.css';
import App from './App';

const root = document.getElementById('root');

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
render(() => <Router><App /></Router>, root!);
