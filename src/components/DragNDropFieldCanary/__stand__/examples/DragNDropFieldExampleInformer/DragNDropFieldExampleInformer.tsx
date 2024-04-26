import { IconAlert } from '@consta/icons/IconAlert';
import { IconCancel } from '@consta/icons/IconCancel';
import { IconClose } from '@consta/icons/IconClose';
import { IconInfo } from '@consta/icons/IconInfo';
import { IconRevert } from '@consta/icons/IconRevert';
import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { DragNDropFieldInformer } from '##/components/DragNDropFieldCanary';

export const DragNDropFieldExampleInformer = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Example col={{ 1: 0, 2: 640 }}>
      <DragNDropFieldInformer status="default" text="Ничего не происходит" />

      <DragNDropFieldInformer
        status="default"
        icon={IconCancel}
        text={isLoading ? 'Загрузка...' : 'Загрузка остановлена'}
        loading={isLoading}
        withButton
        buttonIcon={isLoading ? IconClose : IconRevert}
        buttonLabel={isLoading ? 'Стоп' : 'Заново'}
        onButtonClick={() => setIsLoading(!isLoading)}
      />

      <DragNDropFieldInformer
        status="alert"
        icon={IconAlert}
        text="Что-то пошло не так"
      />

      <DragNDropFieldInformer
        status="warning"
        icon={IconAlert}
        text="Есть проблемы, нажми на кнопку, чтобы узнать подробнее"
        withButton
        buttonIcon={IconInfo}
        buttonLabel="Подробнее"
        onButtonClick={() => alert('Здесь список ошибок')}
      />
    </Example>
  );
};
