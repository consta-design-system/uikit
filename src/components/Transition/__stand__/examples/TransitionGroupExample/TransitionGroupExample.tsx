import './TransitionGroupExample.css';

import { IconTrash } from '@consta/icons/IconTrash';
import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Button } from '##/components/Button';
import { ListItem } from '##/components/ListCanary';
import { useMutableRef } from '##/hooks/useMutableRef';
import { cnMixFlex } from '##/mixs/MixFlex';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';

import { TransitionGroup } from '../../..';

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

const cnTransitionGroupExample = cn('TransitionGroupExample');

export const TransitionGroupExample = () => {
  const [list, setList] = useState<Todo[]>(todos);

  // Из-за того что renderItem отрабатывает только при изменении статуса анимации,
  // для минимизации количества рендеров,
  // Нужно иметь возможность в handleRemove получать актуальный список,
  // можно с помощью useMutableRef сохранить ссылку на актуальный список

  const listRef = useMutableRef(list);

  const handleAdd = () => {
    const id = generateUniqueId();
    setList([...list, { id, text: `Todo - ${id}` }]);
  };

  const handleRemove = (id: string) => {
    // Используем ссылку на актуальный список
    setList(listRef.current.filter((todo) => todo.id !== id));
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

        <TransitionGroup
          timeout={250}
          getItemKey={(todo) => todo.id}
          unmountOnExit
          items={list}
          renderItem={(todo, animate) => {
            return (
              <ListItem
                className={cnTransitionGroupExample('Item', { animate })}
                key={todo.id}
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
            );
          }}
        />
      </>
    </Example>
  );
};
