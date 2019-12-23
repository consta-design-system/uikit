import React, { useRef, useState } from 'react';
import { withKnobs, text, number, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import Popover, { Directions } from './';

storiesOf('Popover', module)
  .addDecorator(withKnobs)
  .add('Обычный', () => {
    const content = text('content', 'Содержимое попапа');
    const directions = select(
      'directions',
      {
        'top-center': 'top-center',
        'top-left': 'top-left',
        'top-right': 'top-right',
        'bottom-center': 'bottom-center',
        'bottom-left': 'bottom-left',
        'bottom-right': 'bottom-right',
        'right-center': 'right-center',
        'left-center': 'left-center',
      },
      'top-center',
    );
    const offset = number('offset', 5);

    const PopoverStory = () => {
      const anchor = useRef(null);
      const [visible, setVisible] = useState(false);
      return (
        <div>
          <button
            style={{
              width: 100,
              padding: 10,
              textAlign: 'center',
              border: '1px solid black',
              marginLeft: 100,
            }}
            ref={anchor}
            onClick={() => setVisible(!visible)}
          >
            {visible ? 'Убрать' : 'Показать'}
          </button>
          <Popover
            anchor={anchor}
            directions={[directions as Directions]}
            visible={visible}
            offset={offset}
          >
            {content}
          </Popover>
        </div>
      );
    };

    return <PopoverStory />;
  });
