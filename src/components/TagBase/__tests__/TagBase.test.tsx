import { cnIcon } from '@consta/icons/Icon';
import { IconAttach } from '@consta/icons/IconAttach';
import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';

import {
  cnTagBase,
  TagBase,
  tagBasePropGroup,
  tagBasePropSize,
  tagBasePropView,
} from '../TagBase';

type TagBaseProps = React.ComponentProps<typeof TagBase>;

const testId = cnTagBase();

const renderComponent = (props: TagBaseProps) => {
  return render(<TagBase data-testid={testId} {...props} />);
};

describe('Компонент TagBase', () => {
  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  describe('проверка props', () => {
    const label = 'label';
    describe('проверка label', () => {
      renderComponent({ label });
      const tagBase = screen.getByTestId(testId);
      expect(tagBase.textContent).toEqual(label);
    });
    describe('проверка size', () => {
      tagBasePropSize.forEach((size) => {
        it(`присваивает класс для size=${size}`, () => {
          renderComponent({ label, size });

          const tagBase = screen.getByTestId(testId);

          expect(tagBase).toHaveClass(cnTagBase({ size }));
        });
      });
    });
    describe('проверка group', () => {
      tagBasePropGroup.forEach((group) => {
        it(`присваивает класс для group=${group}`, () => {
          renderComponent({ label, group });

          const tagBase = screen.getByTestId(testId);

          expect(tagBase).toHaveClass(cnTagBase({ group }));
        });
      });
    });
    describe('проверка view', () => {
      tagBasePropView.forEach((view) => {
        it(`присваивает класс для view=${view}`, () => {
          renderComponent({ label, view });

          const tagBase = screen.getByTestId(testId);

          expect(tagBase).toHaveClass(cnTagBase({ view }));
        });
      });
    });
    describe('проверка withAction', () => {
      it(`присваивает класс для withAction`, () => {
        renderComponent({ label, withAction: true });

        const tagBase = screen.getByTestId(testId);

        expect(tagBase).toHaveClass(cnTagBase({ withAction: true }));
      });
    });
    describe('проверка onCancel', () => {
      it('отображает иконку на кнопке', () => {
        const handleClick = jest.fn();
        renderComponent({ label, onCancel: handleClick });
        const tagBase = screen.getByTestId(testId);
        const cancelButton = tagBase.querySelector(
          `.${cnTagBase('CancelButton')}`,
        ) as HTMLButtonElement;
        expect(cancelButton.children[0]).toHaveClass(cnIcon());
      });
      it('кнопка закрытия срабатывает', () => {
        const handleClick = jest.fn();
        renderComponent({ label, onCancel: handleClick });
        const tagBase = screen.getByTestId(testId);
        const cancelButton = tagBase.querySelector(
          `.${cnTagBase('CancelButton')}`,
        ) as HTMLButtonElement;
        fireEvent.click(cancelButton);
        expect(handleClick).toHaveBeenCalledTimes(1);
      });
    });
    describe('проверка onClick', () => {
      it('кнопка срабатывает', () => {
        const handleClick = jest.fn();
        renderComponent({ label, onClick: handleClick });
        const tagBase = screen.getByTestId(testId);
        fireEvent.click(tagBase);
        expect(handleClick).toHaveBeenCalledTimes(1);
      });
    });
    describe('проверка as', () => {
      const tags = ['a', 'div', 'span'] as const;

      tags.forEach((el) => {
        it(`должен рендериться как <${el}>`, () => {
          renderComponent({ label, as: el });

          const tagBase = screen.getByTestId(testId);

          expect(tagBase.tagName).toEqual(el.toUpperCase());
        });
      });
    });
    describe('проверка className', () => {
      const className = 'className';

      it(`присваивает className`, () => {
        renderComponent({ label, className });

        const tagBase = screen.getByTestId(testId);

        expect(tagBase).toHaveClass(className);
      });
    });
    describe('проверка icon', () => {
      it('отображает иконку', () => {
        renderComponent({ label, icon: IconAttach });
        const tagBase = screen.getByTestId(testId);
        const icon = tagBase.querySelector(
          `.${cnTagBase('Icon')}`,
        ) as HTMLButtonElement;
        expect(icon).toHaveClass('IconAttach');
      });
    });
  });
});
