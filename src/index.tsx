import { reatomContext } from '@reatom/react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router5';

import { AppTheme } from '##/containers/AppTheme';
import { store } from '##/modules/app';
import { router } from '##/modules/router';

import { App } from './App';

const Root = () => (
  <RouterProvider router={router}>
    <reatomContext.Provider value={store}>
      <AppTheme>
        <App />
      </AppTheme>
    </reatomContext.Provider>
  </RouterProvider>
);

createRoot(document.getElementById('app') as Element).render(<Root />);
