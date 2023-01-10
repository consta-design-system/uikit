import './SnackBarExampleTimer.css';

import { IconComponent } from '@consta/icons/Icon';
import { IconAdd } from '@consta/icons/IconAdd';
import { IconAlert } from '@consta/icons/IconAlert';
import { IconRing } from '@consta/icons/IconRing';
import { Example } from '@consta/stand';
import React, { useReducer } from 'react';

import { cn } from '../../../../../utils/bem';
import { Button } from '../../../../Button/Button';
import { SnackBar } from '../../../SnackBar';
import {
  SnackBarItemShowProgressProp,
  SnackBarItemStatus,
} from '../../../types';

const cnSnackBarExampleTimer = cn('SnackBarExampleTimer');

type Item = {
  key: number;
  message: string;
  status: SnackBarItemStatus;
  progressMode?: 'line' | 'timer';
};

const mapIconByStatus: Record<SnackBarItemStatus, IconComponent | undefined> = {
  alert: IconAlert,
  normal: IconRing,
  system: undefined,
  success: undefined,
  warning: undefined,
};

function reducer(
  state: Item[],
  action: { type: 'add' | 'remove'; item: Item },
): Item[] {
  switch (action.type) {
    case 'add':
      return [...state, action.item];
    case 'remove':
      return state.filter((itemInState) => itemInState.key !== action.item.key);
  }
}

const getItemIcon = (item: Item) => mapIconByStatus[item.status];
const getItemShowProgress = (item: Item) => item.progressMode;

export const SnackBarExampleTimer: React.FC = () => {
  const [items, dispatchItems] = useReducer<
    React.Reducer<
      Item[],
      { type: 'add' | 'remove'; item: Item; key?: number | string }
    >
  >(reducer, []);

  const generateHandleAdd =
    (status: SnackBarItemStatus, progressMode?: SnackBarItemShowProgressProp) =>
    () => {
      const key = items.length + 1;
      const item: Item = {
        key,
        message: `Сейчас эта штука закроется ${key}`,
        status,
        progressMode,
      };
      dispatchItems({ type: 'add', item });
    };

  const handleAlertAdd = generateHandleAdd('alert', 'timer');
  const handleNormalAdd = generateHandleAdd('normal', 'timer');
  const handleLineNormalAdd = generateHandleAdd('normal', 'line');
  const handleHiddenTimerAdd = generateHandleAdd('normal');

  React.useEffect(() => handleNormalAdd(), []);

  return (
    <Example col={2}>
      <div className={cnSnackBarExampleTimer('Buttons')}>
        <Button
          className={cnSnackBarExampleTimer('ButtonAdd')}
          iconLeft={IconAdd}
          label="Без таймера + иконка"
          onClick={handleHiddenTimerAdd}
        />
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
      </div>
      <SnackBar
        className={cnSnackBarExampleTimer('SnackBar')}
        items={items}
        onItemClose={(item) => dispatchItems({ type: 'remove', item })}
        getItemShowProgress={getItemShowProgress}
        getItemIcon={getItemIcon}
        getItemAutoClose={() => 5}
      />
    </Example>
  );
};
