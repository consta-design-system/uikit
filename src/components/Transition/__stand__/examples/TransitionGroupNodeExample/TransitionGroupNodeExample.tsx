import './TransitionGroupNodeExample.css';

import { IconTrash } from '@consta/icons/IconTrash';
import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Button } from '##/components/Button';
import { ListItem } from '##/components/ListCanary';
import { cnMixFlex } from '##/mixs/MixFlex';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';

import { Transition, TransitionGroupNode } from '../../..';

const generateUniqueId = () =>
  `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 11)}`;

type Todo = {
  id: string;
  text: string;
};

const todos: Todo[] = [
  { id: '1', text: 'Learn React' },
  { id: '2', text: 'Learn Reatom' },
];

const cnTransitionGroupNodeExample = cn('TransitionGroupNodeExample');

export const TransitionGroupNodeExample = () => {
  const [list, setList] = useState<Todo[]>(todos);

  const handleAdd = () => {
    const id = generateUniqueId();
    setList([...list, { id, text: `Todo - ${id}` }]);
  };

  const handleRemove = (id: string) => {
    // Используем ссылку на актуальный список
    setList(list.filter((todo) => todo.id !== id));
  };

  const handleClearAll = () => {
    setList([]);
  };

  return (
    <Example>
      <>
        <div
          className={`${cnMixFlex({ flex: 'flex', direction: 'row', gap: 's' })} ${cnMixSpace(
            { mB: 's' },
          )}`}
        >
          <Button label="Добавить" onClick={handleAdd} />
          <Button label="Удалить все" onClick={handleClearAll} />
        </div>

        <TransitionGroupNode>
          {list.map((todo) => (
            <Transition timeout={250} key={todo.id} unmountOnExit>
              {(animate) => (
                <ListItem
                  className={cnTransitionGroupNodeExample('Item', { animate })}
                  rightSide={
                    <Button
                      size="xs"
                      view="ghost"
                      iconLeft={IconTrash}
                      onClick={() => handleRemove(todo.id)}
                      form="round"
                    />
                  }
                  label={todo.text}
                />
              )}
            </Transition>
          ))}
        </TransitionGroupNode>
      </>
    </Example>
  );
};
