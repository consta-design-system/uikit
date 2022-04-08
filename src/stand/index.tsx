import React from 'react';
import ReactDOM from 'react-dom';

import { reatomContext } from '@reatom/react';
import { store } from '@@/stand/modules/app';
import { RouterProvider } from 'react-router5';
import { router } from '@consta/stand/src/modules/router';

import { App } from './App';

const Root: React.FC = () => {
  return (
    <RouterProvider router={router}>
      <reatomContext.Provider value={store}>
        <App />
      </reatomContext.Provider>
    </RouterProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById('app'));
