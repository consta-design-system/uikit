import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Button } from '##/components/Button';

import { Transition } from '../../..';

export const TransitionExample = () => {
  const [mount, setMount] = useState(false);
  return (
    <Example>
      <>
        <Button
          onClick={() => setMount(!mount)}
          label={mount ? 'Unmount' : 'Mount'}
        />
        <Transition in={mount} timeout={300} unmountOnExit>
          {(status) => (
            <div
              style={{
                paddingTop: 'var(--space-l)',
                transition: 'all 0.3s ease-in-out',
                opacity: status === 'entered' ? 1 : 0,
              }}
            >
              Hello World
            </div>
          )}
        </Transition>
      </>
    </Example>
  );
};
