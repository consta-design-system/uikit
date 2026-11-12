import { useClickOutside } from '##/hooks/useClickOutside';

import { usePortalContext } from '../PortalWithTheme';

/**
 * Подписчик на PortalWithThemeProvider
 * получает рефы всех вложенных порталов во всплывающем окне
 * для дальнейшего исключения их из useClickOutside
 */
export const PortalWithThemeConsumer: React.FC<{
  onClickOutside?: (event: MouseEvent) => void;
  ignoreClicksInsideRefs?: ReadonlyArray<React.RefObject<HTMLElement>>;
  children: React.ReactNode;
  clickOutsideSubscriber?: HTMLElement;
}> = ({
  onClickOutside,
  children,
  ignoreClicksInsideRefs,
  clickOutsideSubscriber,
}) => {
  const { refs } = usePortalContext();

  useClickOutside({
    isActive: !!onClickOutside,
    ignoreClicksInsideRefs: [
      ...(ignoreClicksInsideRefs || []),
      ...(refs || []),
    ],
    handler: onClickOutside,
    subscriber: clickOutsideSubscriber,
  });

  return children as React.ReactNode;
};
