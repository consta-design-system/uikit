import { IconCamera } from '@consta/icons/IconCamera';
import { IconPhoto } from '@consta/icons/IconPhoto';
import { IconRing } from '@consta/icons/IconRing';
import { Example } from '@consta/stand';
import React from 'react';

import { ChoiceGroup } from '../../../ChoiceGroup';

export const ChoiceGroupExampleIcon = () => {
  return (
    <Example col={1}>
      <ChoiceGroup
        items={[
          {
            label: 'Первый',
            icon: IconPhoto,
          },
          {
            label: 'Второй',
            icon: IconRing,
          },
          {
            label: 'Третий вариант',
            icon: IconCamera,
          },
        ]}
        name="ChoiceGroupExampleIcon"
      />
      <ChoiceGroup
        items={[
          {
            name: 'Первый',
            pictogram: IconPhoto,
          },
          {
            name: 'Второй',
            pictogram: IconRing,
          },
          {
            name: 'Третий вариант',
            pictogram: IconCamera,
          },
        ]}
        getItemLabel={(item) => item.name}
        getItemIcon={(item) => item.pictogram}
        onlyIcon
        name="ChoiceGroupExampleIcon"
      />
    </Example>
  );
};
