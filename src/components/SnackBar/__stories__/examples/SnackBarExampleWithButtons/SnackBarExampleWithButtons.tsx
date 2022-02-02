import './SnackBarExampleWithButtons.css';

import React, { useReducer } from 'react';

import { IconComponent } from '../../../../../icons/Icon/Icon';
import { IconAdd } from '../../../../../icons/IconAdd/IconAdd';
import { IconAlert } from '../../../../../icons/IconAlert/IconAlert';
import { IconProcessing } from '../../../../../icons/IconProcessing/IconProcessing';
import { IconRing } from '../../../../../icons/IconRing/IconRing';
import { IconThumbUp } from '../../../../../icons/IconThumbUp/IconThumbUp';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cn } from '../../../../../utils/bem';
import { Button } from '../../../../Button/Button';
import { Item, SnackBarItemStatus } from '../../../helper';
import { SnackBar } from '../../../SnackBar';

type State = Item[];
type Action = { type: 'add'; item: Item } | { type: 'remove'; key: number | string };

const cnSnackBarExampleWithButtons = cn('SnackBarExampleWithButtons');

const getItemIconByStatus = (status: SnackBarItemStatus): IconComponent | undefined => {
  const mapIconByStatus: Record<SnackBarItemStatus, IconComponent> = {
    success: IconThumbUp,
    warning: IconAlert,
    alert: IconAlert,
    system: IconProcessing,
    normal: IconRing,
  };
  return mapIconByStatus[status];
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'add':
      return [...state, action.item];
    case 'remove':
      return state.filter((item) => item.key !== action.key);
  }
}

export function SnackBarExampleWithButtons() {
  const [items, dispatchItems] = useReducer(reducer, []);
  const generateHandleAdd = (status: SnackBarItemStatus) => () => {
    const key = items.length + 1;
    const item: Item = {
      key,
      message: `Сообщение о каком-то событии - ${key}`,
      status,
      icon: getItemIconByStatus(status),
      onClose: () => dispatchItems({ type: 'remove', key }),
    };
    dispatchItems({ type: 'add', item });
  };

  const handleSuccessAdd = generateHandleAdd('success');
  const handleWarningAdd = generateHandleAdd('warning');
  const handleAlertAdd = generateHandleAdd('alert');
  const handleSystemAdd = generateHandleAdd('system');
  const handleNormalAdd = generateHandleAdd('normal');

  React.useEffect(() => handleNormalAdd(), []);

  return (
    <div className={cnSnackBarExampleWithButtons('', [cnDocsDecorator('Section')])}>
      <div className={cnSnackBarExampleWithButtons('Buttons')}>
        <Button
          className={cnSnackBarExampleWithButtons('ButtonAdd')}
          iconLeft={IconAdd}
          label="Выполненно"
          onClick={handleSuccessAdd}
        />
        <Button
          className={cnSnackBarExampleWithButtons('ButtonAdd')}
          iconLeft={IconAdd}
          label="Ошибка"
          onClick={handleAlertAdd}
        />
        <Button
          className={cnSnackBarExampleWithButtons('ButtonAdd')}
          iconLeft={IconAdd}
          label="Предупреждение"
          onClick={handleWarningAdd}
        />
        <Button
          className={cnSnackBarExampleWithButtons('ButtonAdd')}
          iconLeft={IconAdd}
          label="Системное"
          onClick={handleSystemAdd}
        />
        <Button
          className={cnSnackBarExampleWithButtons('ButtonAdd')}
          iconLeft={IconAdd}
          label="Нормальное"
          onClick={handleNormalAdd}
        />
      </div>
      <SnackBar className={cnSnackBarExampleWithButtons('SnackBar')} items={items} />
    </div>
  );
}
