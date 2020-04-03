import React from 'react';

import { Button, IButton } from '../../Button/Button';

type IHeaderButton<T = {}> = Omit<IButton<T>, 'size' | 'view' | 'form' | 'onlyIcon' | 'label'>;

export function HeaderButton<T = {}>(props: IHeaderButton<T>) {
  const { ...otherProps } = props;
  return <Button size="m" view="clear" form="round" onlyIcon {...otherProps} />;
}
