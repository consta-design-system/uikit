import { Example } from '@consta/stand';
import React, { useRef } from 'react';

import { useFlag } from '##/hooks/useFlag';

import { Button } from '../../../../Button/Button';
import { ContextMenu } from '../../../ContextMenuDeprecated';

const items: string[] = ['Пункт 1', 'Пункт 2', 'Пункт 3'];

export const ContextMenuExampleSize = () => {
  const refS = useRef(null);
  const refM = useRef(null);
  const refL = useRef(null);

  const [isOpenS, setIsOpenS] = useFlag();
  const [isOpenM, setIsOpenM] = useFlag();
  const [isOpenL, setIsOpenL] = useFlag();
  return (
    <>
      <Example>
        <Button ref={refS} label="Меню размера S" onClick={setIsOpenS.toggle} />
        <Button ref={refM} label="Меню размера M" onClick={setIsOpenM.toggle} />
        <Button ref={refL} label="Меню размера L" onClick={setIsOpenL.toggle} />
      </Example>
      {isOpenS && (
        <ContextMenu
          items={items}
          getLabel={(item) => item}
          anchorRef={refS}
          direction="downStartLeft"
          size="s"
        />
      )}
      {isOpenM && (
        <ContextMenu
          items={items}
          getLabel={(item) => item}
          anchorRef={refM}
          direction="downStartLeft"
          size="m"
        />
      )}
      {isOpenL && (
        <ContextMenu
          items={items}
          getLabel={(item) => item}
          anchorRef={refL}
          direction="downStartLeft"
          size="l"
        />
      )}
    </>
  );
};
