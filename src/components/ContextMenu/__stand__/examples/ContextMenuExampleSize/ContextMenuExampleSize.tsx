import { IconAdd } from '@consta/icons/IconAdd';
import { Example } from '@consta/stand';
import React, { useRef, useState } from 'react';

import { Button } from '../../../../Button/Button';
import { ContextMenu } from '../../../ContextMenu';

const items: string[] = ['Пункт 1', 'Пункт 2', 'Пункт 3'];

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
    <>
      <Example>
        <Button
          iconLeft={IconAdd}
          ref={refXS}
          label="Меню размера XS"
          onClick={() => setIsOpenXS(!isOpenXS)}
        />
        <Button
          iconLeft={IconAdd}
          ref={refS}
          label="Меню размера S"
          onClick={() => setIsOpenS(!isOpenS)}
        />
        <Button
          iconLeft={IconAdd}
          ref={refM}
          label="Меню размера M"
          onClick={() => setIsOpenM(!isOpenM)}
        />
        <Button
          iconLeft={IconAdd}
          ref={refL}
          label="Меню размера L"
          onClick={() => setIsOpenL(!isOpenL)}
        />
      </Example>
      <ContextMenu
        items={items}
        isOpen={isOpenXS}
        getItemLabel={(item) => item}
        anchorRef={refXS}
        direction="downStartLeft"
        size="xs"
      />
      <ContextMenu
        items={items}
        isOpen={isOpenS}
        getItemLabel={(item) => item}
        anchorRef={refS}
        direction="downStartLeft"
        size="s"
      />
      <ContextMenu
        items={items}
        isOpen={isOpenM}
        getItemLabel={(item) => item}
        anchorRef={refM}
        direction="downStartLeft"
        size="m"
      />
      <ContextMenu
        items={items}
        isOpen={isOpenL}
        getItemLabel={(item) => item}
        anchorRef={refL}
        direction="downStartLeft"
        size="l"
      />
    </>
  );
};
