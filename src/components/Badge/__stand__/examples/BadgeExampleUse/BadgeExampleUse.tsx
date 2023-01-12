import { Example } from '@consta/stand';
import React from 'react';

import { Badge } from '##/components/Badge';
import { Tag } from '##/components/Tag';
import { cnMixSpace } from '##/mixs/MixSpace';

export const BadgeExampleUse = () => {
  return (
    <Example
      col={{ 1: 0, 2: 600 }}
      separately
      items={[
        {
          node: (
            <>
              <Tag
                mode="button"
                onClick={() => console.log('onClick')}
                label="Мощный"
                group="1"
                size="s"
                className={cnMixSpace({ mR: 'xs' })}
              />
              <Badge label="В наличии" size="s" status="success" />
            </>
          ),
          label: 'Первый ноутбук',
        },
        {
          node: (
            <>
              <Badge
                label="Ожидается"
                size="s"
                status="system"
                className={cnMixSpace({ mR: 'xs' })}
              />
              <Tag
                mode="button"
                onClick={() => console.log('onClick')}
                label="Красивый"
                group="1"
                size="s"
              />
            </>
          ),
          label: 'Второй ноутбук',
        },
      ]}
    />
  );
};
