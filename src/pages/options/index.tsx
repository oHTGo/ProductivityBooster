import Options from '@pages/options/options';
import config from '@shared/configurations/twind';
import { install } from '@twind/core';
import { createRoot } from 'react-dom/client';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';

refreshOnUpdate('pages/options');

function init() {
  install(config);

  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  const root = createRoot(appContainer);
  root.render(<Options />);
}

init();