import { Example } from '@consta/stand';
import React from 'react';

import { Badge } from '##/components/Badge';
import { Tag } from '##/components/Tag';
import { Text } from '##/components/Text';
import { cnMixSpace } from '##/mixs/MixSpace';

export const BadgeExampleUse = () => {
  return (
    <div>
      <Example col={{ 1: 0, flex: 400 }}>
        <Text weight="bold">Первый ноутбук</Text>
        <Badge label="В наличии" size="s" status="success" />
        <div>
          <Tag
            mode="button"
            onClick={() => console.log('onClick')}
            label="Мощный"
            group="1"
            size="s"
            className={cnMixSpace({ mR: 'xs' })}
          />
          <Tag
            mode="button"
            onClick={() => console.log('onClick')}
            label="Игровой"
            group="1"
            size="s"
          />
        </div>
      </Example>
      <Example col={{ 1: 0, flex: 400 }}>
        <Text weight="bold">Второй ноутбук</Text>
        <Badge label="Ожидается" size="s" status="system" />
        <Tag
          mode="button"
          onClick={() => console.log('onClick')}
          label="Красивый"
          group="1"
          size="s"
        />
      </Example>
    </div>
  );
};
