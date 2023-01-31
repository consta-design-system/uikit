import React, { useState } from 'react';

import { usePropsHandler } from '##/components/EventInterceptor/usePropsHandler';
import { ComponentSize } from '##/hooks/useComponentSize';
import { useDebounce } from '##/hooks/useDebounce';
import { useFlag } from '##/hooks/useFlag';
import { animateTimeout } from '##/mixs/MixPopoverAnimate';

import { ContextMenuLevels } from './ContextMenuLevels';
import { ContextMenuWrapper } from './ContextMenuWrapper';
import { ContextMenuComponent, ContextMenuProps } from './types';

export const COMPONENT_NAME = 'ContextMenu' as const;

const ContextMenuRender = (
  props: ContextMenuProps,
  ref: React.Ref<HTMLDivElement>,
) => {
  const rest = usePropsHandler(COMPONENT_NAME, props, ref);

  const [componentSize, setComponentSize] = useState<ComponentSize>({
    width: 240,
    height: 100,
  });

  const [animationBack, setAnimationBack] = useFlag();
  const disableAnimationBack = useDebounce(
    setAnimationBack.off,
    animateTimeout,
  );

  return (
    <ContextMenuWrapper
      {...rest}
      animationBack={animationBack}
      style={{ ...rest?.style, ...componentSize }}
    >
      <ContextMenuLevels
        {...rest}
        setComponentSize={setComponentSize}
        ref={ref}
        enableAnimationBack={setAnimationBack.on}
        disableAnimationBack={disableAnimationBack}
      />
    </ContextMenuWrapper>
  );
};

export const ContextMenu = React.forwardRef(
  ContextMenuRender,
) as ContextMenuComponent;

export * from './types';
