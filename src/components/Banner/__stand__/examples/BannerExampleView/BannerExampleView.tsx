import { Example } from '@consta/stand';
import React from 'react';

import { useTheme } from '##/components/Theme/Theme';

import { Banner } from '../../..';
import BannerCustomBg from '../../BannerCustomBg.png';

const views = ['filled', 'ghost'] as const;
const statuses = ['normal', 'warning', 'alert', 'success', 'system'] as const;

const items = statuses.flatMap((status) =>
  views.map((view) => ({ view, status })),
);

export const BannerExampleView = () => {
  return (
    <Example
      col={{ 1: 0, 2: 700 }}
      items={items}
      getItemNode={({ view, status }) => (
        <Banner leftSide="Заголовок" view={view} status={status} />
      )}
      getItemDescription={({ view, status }) => `view=${view} status=${status}`}
      getItemStatus={() => undefined}
    />
  );
};

export const BannerExampleViewCustomBg = () => {
  const { themeClassNames } = useTheme();

  return (
    <Example col={1}>
      <Banner
        leftSide="Заголовок"
        view="transparent"
        style={{
          background: `url(${BannerCustomBg}) right top no-repeat, rgb(1, 45, 155)`,
        }}
        className={themeClassNames.color.accent}
      />
    </Example>
  );
};
