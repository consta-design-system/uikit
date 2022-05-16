import React from 'react';
import ReactDOM from 'react-dom';

import { reatomContext } from '@reatom/react';
import { store } from '##/modules/app';
import { RouterProvider } from 'react-router5';
import { router } from '@consta/stand/src/modules/router';
import { AppTheme } from '##/containers/AppTheme';

import { App } from './App';

const Root: React.FC = () => {
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

// router.start();
// createRoot(document.getElementById('app') as Element).render(<Root />);

ReactDOM.render(<Root />, document.getElementById('app'));
