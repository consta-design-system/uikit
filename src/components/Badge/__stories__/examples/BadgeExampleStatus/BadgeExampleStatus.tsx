import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cnDocsExample } from '../../../../../uiKit/components/DocsExample/DocsExample';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { Badge } from '../../../Badge';

export const BadgeExampleStatus = () => (
  <div className={cnDocsDecorator('Section', [cnDocsExample()])}>
    <Badge status="system" label="Черновик" className={wp.decorator({ 'indent-r': 'm' })} />
    <Badge status="normal" label="Новый" className={wp.decorator({ 'indent-r': 'm' })} />
    <Badge status="warning" label="На проверке" className={wp.decorator({ 'indent-r': 'm' })} />
    <Badge status="error" label="Есть ошибки" className={wp.decorator({ 'indent-r': 'm' })} />
    <Badge status="success" label="Готов" className={wp.decorator({ 'indent-r': 'm' })} />
  </div>
);
