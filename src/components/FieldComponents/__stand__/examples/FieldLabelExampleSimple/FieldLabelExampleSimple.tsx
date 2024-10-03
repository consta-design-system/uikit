import { IconComponent } from '@consta/icons/Icon';
import { IconQuestion } from '@consta/icons/IconQuestion';
import { Example } from '@consta/stand';
import React from 'react';

import { FieldControlLayout, FieldLabel } from '##/components/FieldComponents';
import { withTooltip } from '##/hocs/withTooltip';
import { cnMixSpace } from '##/mixs/MixSpace';

const Icon = withTooltip({ mode: 'mouseover', content: 'Подсказка' })(
  IconQuestion,
) as IconComponent;

export const FieldLabelExampleSimple = () => {
  return (
    <Example col={1}>
      <>
        <FieldLabel icon={Icon} className={cnMixSpace({ mB: 'xs' })} required>
          Заголовок поля
        </FieldLabel>
        <FieldControlLayout />
      </>
    </Example>
  );
};
