import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cnDocsExample } from '../../../../../uiKit/components/DocsExample/DocsExample';
import * as wp from '../../../../../utils/whitepaper/whitepaper';
import { Badge } from '../../../Badge';

export const BadgeExampleForm = () => (
  <div className={cnDocsDecorator('Section', [cnDocsExample(null)])}>
    <Badge form="default" label="Default badge" className={wp.decorator({ 'indent-r': 'm' })} />
    <Badge form="round" label="Round badge" className={wp.decorator({ 'indent-r': 'm' })} />
  </div>
);
