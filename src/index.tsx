import React from 'react';
import { createRoot } from 'react-dom/client';

import { reatomContext } from '@reatom/react';
import { store, registry } from '##/modules/app';
import { RouterProvider } from 'react-router5';
import { router } from '@consta/stand/src/modules/router';
import { AppTheme } from '##/containers/AppTheme';

import { App } from './App';

const Root = () => {
  return (
    <RouterProvider router={router}>
      <reatomContext.Provider value={store}>
        <AppTheme>
          <App />
        </AppTheme>
      </reatomContext.Provider>
    </RouterProvider>
  );
};

createRoot(document.getElementById('app') as Element).render(<Root />);
