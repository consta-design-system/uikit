import './StandPageHeader.css';

import { Badge } from '@consta/uikit/Badge';
import { IconYoutube } from '@consta/uikit/IconYoutube';
import { Text } from '@consta/uikit/Text';
import React from 'react';

import { Stand } from '##/exportTypes';
import { cn } from '##/utils/bem';

type Props = {
  stand: Stand;
  className?: string;
};

const cnStandPageHeader = cn('StandPageHeader');

const getLabel = (status: Stand['status']): string | undefined => {
  if (status === 'deprecated') {
    return 'deprecated';
  }
  if (status === 'canary') {
    return 'canary';
  }
  if (status === 'stable') {
    return 'Стабильный';
  }
};

const getStatus = (status: Stand['status']) => {
  if (status === 'deprecated') {
    return 'error';
  }
  if (status === 'canary') {
    return 'success';
  }
  if (status === 'stable') {
    return 'normal';
  }
};

const getView = (status: Stand['status']) => {
  if (status === 'deprecated' || status === 'stable') {
    return 'stroked';
  }
  if (status === 'canary' || status === 'inWork') {
    return 'filled';
  }
};

export const StandPageHeader = (props: Props) => {
  const { stand, className } = props;
  const { title, status, version, description } = stand;

  return (
    <div className={cnStandPageHeader(null, [className])}>
      <div className={cnStandPageHeader('Top')}>
        <Text weight="semibold" size="4xl" lineHeight="m">
          {title}
        </Text>
        <div className={cnStandPageHeader('Badges')}>
          {getStatus(status) && (
            <Badge
              size="l"
              label={getLabel(status)}
              status={getStatus(status)}
              view={getView(status)}
            />
          )}
          {version && (
            <Badge
              size="l"
              label={`Доступен с ${version}`}
              icon={IconYoutube}
              status="system"
              view="stroked"
            />
          )}
        </div>
      </div>
      {description && (
        <Text
          className={cnStandPageHeader('Description')}
          size="m"
          lineHeight="m"
        >
          {description}
        </Text>
      )}
    </div>
  );
};
