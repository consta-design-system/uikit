import { knobBoolean, knobNumber } from '@consta/stand';
import { reatomFactoryComponent } from '@reatom/react';
import React from 'react';

import { Badge } from '##/components/Badge';
import { cnMixPopoverAnimate } from '##/mixs/MixPopoverAnimate';

import { Transition } from '..';

export default reatomFactoryComponent(() => {
  const inValue = knobBoolean('in', true);
  const timeout = knobNumber('timeout', 300);
  const unmountOnExit = knobBoolean('unmountOnExit', false);

  return () => (
    <Transition
      timeout={timeout() || 0}
      in={inValue()}
      unmountOnExit={unmountOnExit()}
    >
      {(animate) => (
        <Badge
          style={{
            [`--mix-dropdown-animate-timeout` as string]: `${timeout()}ms`,
          }}
          className={cnMixPopoverAnimate({ animate })}
          label={animate}
          size="l"
        />
      )}
    </Transition>
  );
});
