import React, { useState } from 'react';

import { content } from '../../../__mocks__/mock.data';
import { IconAlert } from '../../../../../icons/IconAlert/IconAlert';
import { IconSettings } from '../../../../../icons/IconSettings/IconSettings';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { Badge } from '../../../../Badge/Badge';
import { Button } from '../../../../Button/Button';
import { Collapse } from '../../../Collapse';

export const CollapseExampleIconRightSideBadge = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <div className={cnDocsDecorator('Section')}>
      <Collapse
        label="Здесь справа что-то есть"
        isOpen={isOpen}
        onClick={() => setOpen(!isOpen)}
        rightSide={[
          <Badge label="Badge" status="success" />,
          <IconAlert size="s" view="warning" />,
        ]}
      >
        {content}
      </Collapse>
    </div>
  );
};

export const CollapseExampleIconRightSideButton = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <div className={cnDocsDecorator('Section')}>
      <Collapse
        label="А здесь вообще справа настройки"
        isOpen={isOpen}
        onClick={() => setOpen(!isOpen)}
        rightSide={
          <Button
            iconLeft={IconSettings}
            size="xs"
            view="ghost"
            onClick={(e) => {
              e.stopPropagation();
              alert('Button Click');
            }}
          />
        }
      >
        {content}
      </Collapse>
    </div>
  );
};
