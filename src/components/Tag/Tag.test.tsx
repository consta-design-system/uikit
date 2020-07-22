import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { cnTag, getParams, Tag } from './Tag';

type TagProps = React.ComponentProps<typeof Tag>;

const testId = cnTag();

const renderComponent = (props: TagProps) => {
  return render(<Tag data-testid={testId} {...props} />);
};

describe('Компонент Tag', () => {
  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  describe('проверка props', () => {
    const label = 'label';
    describe('проверка mode', () => {
      const modes = ['button', 'link', 'check', 'cancel'] as const;

      const handleClick = jest.fn();

      modes.forEach((mode) => {
        it(`присваивает класс для mode=${mode}`, () => {
          switch (mode) {
            case 'check':
              renderComponent({ label, mode, checked: true, onChange: handleClick });
              break;
            case 'button':
              renderComponent({ label, mode, onClick: handleClick });
              break;
            case 'link':
              renderComponent({ label, mode });
              break;
            case 'cancel':
              renderComponent({ label, mode, onCancel: handleClick });
              break;
          }

          const tag = screen.getByTestId(testId);

          expect(tag).toHaveClass(cnTag({ mode }));
        });
      });
    });
    describe('проверка className', () => {
      const className = 'className';

      it(`присваивает className`, () => {
        renderComponent({ label, className, mode: 'link' });

        const tagBase = screen.getByTestId(testId);

        expect(tagBase).toHaveClass(className);
      });
    });
  });
  describe('проверка getParams', () => {
    const modes = ['button', 'link', 'check', 'cancel'] as const;
    const onClick = jest.fn();
    const onChange = undefined;
    const onCancel = jest.fn();
    const checked = true;

    const testModeButton = {
      view: 'filled',
      onClick,
      as: 'button',
    };

    const testModeLink = {
      view: 'filled',
      onClick,
      as: 'a',
    };

    const testModeCheck = {
      view: checked ? 'filled' : 'stroked',
      onClick: undefined,
      as: 'button',
    };

    const testModeCancel = {
      view: 'filled',
      onCancel,
      as: 'div',
    };

    modes.forEach((mode) => {
      it(`возвращает верный обьект при mode=${mode}`, () => {
        const params = getParams(mode, checked, onClick, onChange, onCancel);

        switch (mode) {
          case 'check':
            expect(params).toEqual(testModeCheck);
            return;
          case 'button':
            expect(params).toEqual(testModeButton);
            return;
          case 'link':
            expect(params).toEqual(testModeLink);
            return;
          case 'cancel':
            expect(params).toEqual(testModeCancel);
        }
      });
    });
  });
});
