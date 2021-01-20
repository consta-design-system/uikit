import './HeaderButtonExample.css';

import React from 'react';

import { IconChat } from '../../../../../icons/IconChat/IconChat';
import { IconDiamond } from '../../../../../icons/IconDiamond/IconDiamond';
import { IconRing } from '../../../../../icons/IconRing/IconRing';
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
            <HeaderButton iconLeft={IconChat} />
          </HeaderModule>
          <HeaderModule indent="s">
            <HeaderButton iconLeft={IconRing} />
          </HeaderModule>
        </>
      }
    />
  );
}
