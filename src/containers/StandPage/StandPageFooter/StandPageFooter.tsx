import './StandPageFooter.css';

import { Button } from '@consta/uikit/Button';
import { Text } from '@consta/uikit/Text';
import React from 'react';

import { cn } from '##/utils/bem';

type Props = {
  onSPAClick?: (status: 'success' | 'cancel') => void;
  githubLink?: string;
  className?: string;
};

const defaultLink = 'https://github.com/consta-design-system/uikit';

const cnStandPageFooter = cn('StandPageFooter');

export const StandPageFooter = (props: Props) => {
  const { onSPAClick, githubLink, className } = props;
  return (
    <div className={cnStandPageFooter(null, [className])}>
      {onSPAClick && (
        <div className={cnStandPageFooter('SPA')}>
          <Text size="2xl" lineHeight="m" weight="semibold">
            Полезная информация?
          </Text>
          <div className={cnStandPageFooter('Buttons')}>
            <Button
              label="Нет"
              size="l"
              view="ghost"
              onClick={() => onSPAClick('cancel')}
            />
            <Button
              label="Да"
              size="l"
              view="ghost"
              onClick={() => onSPAClick('success')}
            />
          </div>
        </div>
      )}
      <div className={cnStandPageFooter('Container')}>
        <Text size="2xl" lineHeight="m" weight="bold" view="brand">
          Открытая дизайн-система
        </Text>
        <div className={cnStandPageFooter('Links')}>
          <Text size="m" lineHeight="m">
            Consta — open source с первого дня так <br />
            что, давай, контрибьють, не стесняйся
          </Text>
          <Text size="m" lineHeight="m">
            Эта статья{' '}
            <Text
              as="a"
              view="link"
              href={githubLink ?? defaultLink}
              size="m"
              lineHeight="m"
            >
              в репозитории
            </Text>{' '}
            на Github
          </Text>
        </div>
      </div>
    </div>
  );
};
