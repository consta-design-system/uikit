import './HeaderButtonExample.css';

import { IconChatStroked } from '@consta/icons/IconChatStroked';
import { IconDiamond } from '@consta/icons/IconDiamond';
import { IconRing } from '@consta/icons/IconRing';
import React from 'react';

import { cn } from '../../../../../utils/bem';
import { Header, HeaderButton, HeaderModule } from '../../../Header';

const cnExample = cn('HeaderButtonExample');

export function HeaderButtonExample() {
  return (
    <Header
      className={cnExample()}
      rightSide={
        <>
          <HeaderModule indent="s">
            <HeaderButton iconLeft={IconDiamond} />
          </HeaderModule>
          <HeaderModule indent="s">
            <HeaderButton iconLeft={IconChatStroked} />
          </HeaderModule>
          <HeaderModule indent="s">
            <HeaderButton iconLeft={IconRing} />
          </HeaderModule>
        </>
      }
    />
  );
}
