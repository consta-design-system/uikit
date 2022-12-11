import './CollapseExampleLabel.css';

import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Badge } from '##/components/Badge';
import { cn } from '##/utils/bem';

import { content } from '../../../__mocks__/mock.data';
import { Collapse } from '../../../Collapse';

const cnCollapseExampleLabel = cn('CollapseExampleLabel');

export const CollapseExampleLabel = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <Example>
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
    </Example>
  );
};
