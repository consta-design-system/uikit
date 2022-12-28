import { IconAlert } from '@consta/icons/IconAlert';
import { IconSettings } from '@consta/icons/IconSettings';
import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Badge } from '##/components/Badge';
import { Button } from '##/components/Button';

import { content } from '../../../__mocks__/mock.data';
import { Collapse } from '../../../Collapse';

export const CollapseExampleIconRightSideBadge = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <Example>
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
    </Example>
  );
};

export const CollapseExampleIconRightSideButton = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <Example>
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
    </Example>
  );
};
