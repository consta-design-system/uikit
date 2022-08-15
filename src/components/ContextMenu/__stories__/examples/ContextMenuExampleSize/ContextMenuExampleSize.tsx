import React, { useRef, useState } from 'react';

import { IconAdd } from '../../../../../icons/IconAdd/IconAdd';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { cn } from '../../../../../utils/bem';
import { Button } from '../../../../Button/Button';
import { ContextMenu } from '../../../ContextMenu';

const items: string[] = ['Пункт 1', 'Пункт 2', 'Пункт 3'];

const cnContextMenuExampleSize = cn('ContextMenuExampleSize');

export const ContextMenuExampleSize = () => {
  const refXS = useRef(null);
  const refS = useRef(null);
  const refM = useRef(null);
  const refL = useRef(null);
  const [isOpenXS, setIsOpenXS] = useState<boolean>(false);
  const [isOpenS, setIsOpenS] = useState<boolean>(false);
  const [isOpenM, setIsOpenM] = useState<boolean>(false);
  const [isOpenL, setIsOpenL] = useState<boolean>(false);

  return (
    <StoryBookExample
      className={cnDocsDecorator('Section', [cnContextMenuExampleSize()])}
    >
      <Button
        iconLeft={IconAdd}
        ref={refXS}
        label="Меню размера XS"
        onClick={() => setIsOpenXS(!isOpenXS)}
      />
      <ContextMenu
        items={items}
        isOpen={isOpenXS}
        getItemLabel={(item) => item}
        anchorRef={refXS}
        direction="downStartLeft"
        size="xs"
      />
      <Button
        iconLeft={IconAdd}
        ref={refS}
        label="Меню размера S"
        onClick={() => setIsOpenS(!isOpenS)}
      />
      <ContextMenu
        items={items}
        isOpen={isOpenS}
        getItemLabel={(item) => item}
        anchorRef={refS}
        direction="downStartLeft"
        size="s"
      />
      <Button
        iconLeft={IconAdd}
        ref={refM}
        label="Меню размера M"
        onClick={() => setIsOpenM(!isOpenM)}
      />
      <ContextMenu
        items={items}
        isOpen={isOpenM}
        getItemLabel={(item) => item}
        anchorRef={refM}
        direction="downStartLeft"
        size="m"
      />
      <Button
        iconLeft={IconAdd}
        ref={refL}
        label="Меню размера L"
        onClick={() => setIsOpenL(!isOpenL)}
      />
      <ContextMenu
        items={items}
        isOpen={isOpenL}
        getItemLabel={(item) => item}
        anchorRef={refL}
        direction="downStartLeft"
        size="l"
      />
    </StoryBookExample>
  );
};
