import './DocsCard.css';

import React from 'react';

import { Badge } from '../../../components/Badge/Badge';
import { Card } from '../../../components/Card/Card';
import { Text } from '../../../components/Text/Text';
import { cn } from '../../cn';

const cnDocsCard = cn('DocsCard');

export const DocsCard: React.FC<{
  stageName: string;
  stageHeader: string;
  stageText: React.ReactNode;
}> = (props) => {
  const { stageName, stageHeader, stageText } = props;
  return (
    <Card
      style={{ marginTop: 'var(--space-xl)' }}
      className={cnDocsCard()}
      verticalSpace="l"
      horizontalSpace="l"
    >
      <Badge label={stageName} />
      <Text weight="bold">{stageHeader}</Text>
      <>{stageText}</>
    </Card>
  );
};
