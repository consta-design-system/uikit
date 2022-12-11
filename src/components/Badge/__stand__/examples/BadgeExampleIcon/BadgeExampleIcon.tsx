import { IconCheck } from '@consta/icons/IconCheck';
import { IconClose } from '@consta/icons/IconClose';
import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cnDocsExample } from '../../../../../uiKit/components/DocsExample/DocsExample';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { Badge } from '../../../Badge';

export const BadgeExampleIcon = () => (
  <div className={cnDocsDecorator('Section', [cnDocsExample()])}>
    <Badge
      icon={IconCheck}
      status="success"
      label="Съедобно"
      className={wp.decorator({ 'indent-r': 'm' })}
    />
    <Badge
      icon={IconClose}
      status="error"
      label="Отрава"
      className={wp.decorator({ 'indent-r': 'm' })}
    />
  </div>
);
