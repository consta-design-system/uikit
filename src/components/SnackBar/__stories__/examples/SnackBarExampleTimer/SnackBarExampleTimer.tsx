import './SnackBarExampleTimer.css';

import React, { useReducer } from 'react';

import { IconComponent } from '../../../../../icons/Icon/Icon';
import { IconAdd } from '../../../../../icons/IconAdd/IconAdd';
import { IconAlert } from '../../../../../icons/IconAlert/IconAlert';
import { IconRing } from '../../../../../icons/IconRing/IconRing';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cn } from '../../../../../utils/bem';
import { Button } from '../../../../Button/Button';
import { Item, SnackBarItemShowProgressProp, SnackBarItemStatus } from '../../../helper';
import { SnackBar } from '../../../SnackBar';

const cnSnackBarExampleTimer = cn('SnackBarExampleTimer');

const mapIconByStatus: Record<SnackBarItemStatus, IconComponent | undefined> = {
  alert: IconAlert,
  normal: IconRing,
  system: undefined,
  success: undefined,
  warning: undefined,
};

const getItemIconByStatus = (status: SnackBarItemStatus): IconComponent | undefined =>
  mapIconByStatus[status];

function reducer(
  state: Item[],
  action: { type: 'add' | 'remove'; item: Item; key?: number | string },
): Item[] {
  switch (action.type) {
    case 'add':
      return [...state, action.item];
    case 'remove':
      return state.filter((item) => item.key !== action.key);
  }
}

export const SnackBarExampleTimer: React.FC = () => {
  const [items, dispatchItems] = useReducer<
    React.Reducer<Item[], { type: 'add' | 'remove'; item: Item; key?: number | string }>
  >(reducer, []);
  const generateHandleAdd = (
    status: SnackBarItemStatus,
    showProgress?: SnackBarItemShowProgressProp,
  ) => () => {
    const key = items.length + 1;
    const item: Item = {
      key,
      message: `Сейчас эта штука закроется ${key}`,
      status,
      icon: getItemIconByStatus(status),
      onClose: () => dispatchItems({ type: 'remove', item, key }),
      autoClose: 5,
      showProgress,
    };
    dispatchItems({ type: 'add', item });
  };

  const handleAlertAdd = generateHandleAdd('alert', 'timer');
  const handleNormalAdd = generateHandleAdd('normal', 'timer');
  const handleLineNormalAdd = generateHandleAdd('normal', 'line');
  const handleHiddenTimerAdd = generateHandleAdd('normal');

  React.useEffect(() => handleNormalAdd(), []);

  return (
    <div className={cnSnackBarExampleTimer('', [cnDocsDecorator('Section')])}>
      <div className={cnSnackBarExampleTimer('Buttons')}>
        <Button
          className={cnSnackBarExampleTimer('ButtonAdd')}
          iconLeft={IconAdd}
          label="Обычный таймер"
          onClick={handleNormalAdd}
        />
        <Button
          className={cnSnackBarExampleTimer('ButtonAdd')}
          iconLeft={IconAdd}
          label="Обычный таймер c линией"
          onClick={handleLineNormalAdd}
        />
        <Button
          className={cnSnackBarExampleTimer('ButtonAdd')}
          iconLeft={IconAdd}
          label="Тревожный таймер"
          onClick={handleAlertAdd}
        />
        <Button
          className={cnSnackBarExampleTimer('ButtonAdd')}
          iconLeft={IconAdd}
          label="Скрытый таймер + иконка"
          onClick={handleHiddenTimerAdd}
        />
      </div>
      <SnackBar className={cnSnackBarExampleTimer('SnackBar')} items={items} />
    </div>
  );
};
