import './SnackBar.variants.css';

import { useBoolean, useSelect } from '@consta/stand';
import React, { useReducer } from 'react';

import { Button } from '##/components/Button/Button';
import { Text } from '##/components/Text/Text';
import { IconComponent } from '##/icons/Icon/Icon';
import { IconAdd } from '##/icons/IconAdd/IconAdd';
import { IconAlert } from '##/icons/IconAlert/IconAlert';
import { IconProcessing } from '##/icons/IconProcessing/IconProcessing';
import { IconRing } from '##/icons/IconRing/IconRing';
import { IconThumbUp } from '##/icons/IconThumbUp/IconThumbUp';
import { cn } from '##/utils/bem';

import { SnackBar } from '../SnackBar';
import {
  SnackBarItemDefault,
  snackBarItemShowProgressProp,
  SnackBarItemStatus,
} from '../types';

type State = SnackBarItemDefault[];
type Action =
  | { type: 'add'; item: SnackBarItemDefault }
  | { type: 'remove'; key: number | string };

const Variants = () => {
  const withIcon = useBoolean('withIcon', false);
  const withActionButtons = useBoolean('withActionButtons', false);
  const withCloseButton = useBoolean('withCloseButton', true);
  const withAutoClose = useBoolean('withAutoClose', false);
  const showProgress = useSelect(
    'showProgress',
    snackBarItemShowProgressProp,
    snackBarItemShowProgressProp[0],
    Boolean(withAutoClose),
  );
  const withComponentInsteadOfText = useBoolean(
    'withComponentInsteadOfText',
    false,
  );

  const mapIconByStatus: Record<SnackBarItemStatus, IconComponent> = {
    success: IconThumbUp,
    warning: IconAlert,
    alert: IconAlert,
    system: IconProcessing,
    normal: IconRing,
  };

  const getItemIcon = (
    item: SnackBarItemDefault,
  ): IconComponent | undefined => {
    return item.status ? mapIconByStatus[item.status] : undefined;
  };

  const cnSnackBarVariants = cn('SnackBarVariants');

  function reducer(state: State, action: Action) {
    switch (action.type) {
      case 'add':
        return [...state, action.item];
      case 'remove':
        return state.filter((item) => item.key !== action.key);
    }
  }
  const [items, dispatchItems] = useReducer(reducer, []);
  const generateHandleAdd = (status: SnackBarItemStatus) => () => {
    const key = items.length + 1;

    const text = `Сообщение о каком-то событии - ${key}`;
    const message = withComponentInsteadOfText ? (
      <Text as="a" cursor="pointer" font="mono" weight="bold" size="l">
        {text}
      </Text>
    ) : (
      text
    );
    const item: SnackBarItemDefault = {
      key,
      message,
      status,
    };
    dispatchItems({ type: 'add', item });
  };

  const handleSuccessAdd = generateHandleAdd('success');
  const handleWarningAdd = generateHandleAdd('warning');
  const handleAlertAdd = generateHandleAdd('alert');
  const handleSystemAdd = generateHandleAdd('system');
  const handleNormalAdd = generateHandleAdd('normal');

  React.useEffect(() => handleNormalAdd(), []);

  const handlerRemoveItem = (item: SnackBarItemDefault) =>
    dispatchItems({ type: 'remove', key: item.key });

  return (
    <div className={cnSnackBarVariants()}>
      <div className={cnSnackBarVariants('Buttons')}>
        <Button
          className={cnSnackBarVariants('ButtonAdd')}
          iconLeft={IconAdd}
          view="ghost"
          size="s"
          width="full"
          label="Выполненно"
          onClick={handleSuccessAdd}
        />
        <Button
          className={cnSnackBarVariants('ButtonAdd')}
          iconLeft={IconAdd}
          view="ghost"
          size="s"
          width="full"
          label="Ошибка"
          onClick={handleAlertAdd}
        />
        <Button
          className={cnSnackBarVariants('ButtonAdd')}
          iconLeft={IconAdd}
          view="ghost"
          size="s"
          width="full"
          label="Предупреждение"
          onClick={handleWarningAdd}
        />
        <Button
          className={cnSnackBarVariants('ButtonAdd')}
          iconLeft={IconAdd}
          view="ghost"
          size="s"
          width="full"
          label="Системное"
          onClick={handleSystemAdd}
        />
        <Button
          className={cnSnackBarVariants('ButtonAdd')}
          iconLeft={IconAdd}
          view="ghost"
          size="s"
          width="full"
          label="Нормальное"
          onClick={handleNormalAdd}
        />
      </div>
      <SnackBar
        className={cnSnackBarVariants('SnackBar')}
        items={items}
        getItemIcon={withIcon ? getItemIcon : undefined}
        {...(withCloseButton && {
          onItemClose: handlerRemoveItem,
        })}
        {...(withAutoClose && {
          onItemAutoClose: handlerRemoveItem,
        })}
        getItemAutoClose={withAutoClose ? () => 5 : undefined}
        getItemShowProgress={showProgress ? () => showProgress : undefined}
        getItemActions={
          withActionButtons
            ? () => [
                {
                  label: 'Согласен',
                  onClick: () => console.log('Согласен'),
                },
                {
                  label: 'Не согласен',
                  onClick: () => console.log('Не согласен'),
                },
              ]
            : undefined
        }
      />
    </div>
  );
};

export default Variants;
