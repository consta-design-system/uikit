import { IconAlert } from '@consta/icons/IconAlert';
import { IconClose } from '@consta/icons/IconClose';
import { useBoolean, useSelect } from '@consta/stand';
import React from 'react';

import { Button } from '##/components/Button';
import { useTheme } from '##/components/Theme/Theme';

import { Banner } from '..';
import BannerCustomBg from './BannerCustomBg.png';

const Variants = () => {
  const size = useSelect('size', ['xs', 's', 'm', 'l'], 'm') || 'm';
  const view = useSelect('view', ['filled', 'ghost', 'transparent'], 'filled');
  const status = useSelect(
    'status',
    ['normal', 'warning', 'alert', 'success', 'system'],
    'normal',
    view !== 'transparent',
  );
  const form = useSelect('form', ['default', 'round', 'brick'], 'default');
  const withCustomBg = useBoolean(
    'withCustomBg',
    false,
    view === 'transparent',
  );
  const iconLeft = useBoolean('iconLeft', false);
  const withRightSide = useBoolean('withRightSide', false);

  const { themeClassNames } = useTheme();

  return (
    <div style={{ width: '100%' }}>
      <Banner
        size={size}
        view={view}
        status={status}
        form={form}
        icon={iconLeft ? IconAlert : undefined}
        leftSide={['Заголовок', 'Описание']}
        rightSide={
          withRightSide
            ? [
                <Button form={form} label="Кнопка" view="ghost" size={size} />,
                <Button
                  form={form}
                  label="Закрыть"
                  view="clear"
                  size={size}
                  iconLeft={IconClose}
                  onlyIcon
                />,
              ]
            : undefined
        }
        className={withCustomBg ? themeClassNames.color.accent : undefined}
        style={
          withCustomBg
            ? {
                background: `url(${BannerCustomBg}) right top no-repeat, rgb(1, 45, 155)`,
              }
            : {}
        }
      />
    </div>
  );
};

export default Variants;
