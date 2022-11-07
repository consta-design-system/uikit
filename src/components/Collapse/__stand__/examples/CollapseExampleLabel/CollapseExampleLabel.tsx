import './CollapseExampleLabel.css';

import React, { useState } from 'react';

import { Badge } from '##/components/Badge';
import { cn } from '##/utils/bem';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { content } from '../../../__mocks__/mock.data';
import { Collapse } from '../../../Collapse';

const cnCollapseExampleLabel = cn('CollapseExampleLabel');

export const CollapseExampleLabel = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <div className={cnDocsDecorator('Section')}>
      <Collapse
        label={
          <>
            Заголовок
            <Badge
              className={cnCollapseExampleLabel('Badge')}
              label="Статус"
              size="s"
            />
          </>
        }
        isOpen={isOpen}
        className={cnCollapseExampleLabel()}
        onClick={() => setOpen(!isOpen)}
      >
        {content}
      </Collapse>
    </div>
  );
};
