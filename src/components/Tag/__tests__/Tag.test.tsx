import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';

import { getParams, Tag, tagPropMode } from '../Tag';

type TagProps = React.ComponentProps<typeof Tag>;

const testId = 'Tag';

const renderComponent = (props: TagProps) => {
  return render(<Tag data-testid={testId} {...props} />);
};

describe('Компонент Tag', () => {
  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  describe('проверка props', () => {
    const label = 'label';

    describe('проверка className', () => {
      const className = 'className';

      it(`присваивает className`, () => {
        renderComponent({ label, className, mode: 'link' });

        const tagBase = screen.getByTestId(testId);

        expect(tagBase).toHaveClass(className);
      });
    });

    describe('проверка disabled', () => {
      it('при disabled=true отключает onClick в mode=button', () => {
        const handleClick = jest.fn();
        renderComponent({
          label,
          disabled: true,
          mode: 'button',
          onClick: handleClick,
        });

        const tagBase = screen.getByTestId(testId);
        expect(tagBase).toBeDisabled();

        fireEvent.click(tagBase);

        expect(handleClick).not.toBeCalled();
      });

      it('при disabled=true отключает onChange в mode=check', () => {
        const handleChange = jest.fn();
        renderComponent({
          label,
          disabled: true,
          checked: false,
          mode: 'check',
          onChange: handleChange,
        });

        const tagBase = screen.getByTestId(testId);
        expect(tagBase).toBeDisabled();

        fireEvent.click(tagBase);

        expect(handleChange).not.toBeCalled();
      });

      it('при disabled=true отключает onCancel в mode=cancel', () => {
        const handleCancel = jest.fn();
        renderComponent({
          label,
          disabled: true,
          mode: 'cancel',
          onCancel: handleCancel,
        });

        const tagBase = screen.getByTestId(testId);

        fireEvent.click(tagBase);

        expect(handleCancel).not.toBeCalled();
      });

      it('при disabled=true отключает ссылку в mode=link', () => {
        renderComponent({
          label,
          disabled: true,
          mode: 'link',
          href: '#',
        });

        const tagBase = screen.getByTestId(testId);

        expect(tagBase).not.toHaveAttribute('href');
      });
    });
  });

  describe('проверка getParams', () => {
    const onClick = jest.fn();
    const onChange = undefined;
    const onCancel = jest.fn();
    const checked = true;

    const testModeButton = {
      view: 'filled',
      onClick,
      as: 'button',
      withAction: true,
    };

    const testModeLink = {
      view: 'filled',
      onClick,
      as: 'a',
      withAction: true,
    };

    const testModeCheck = {
      view: checked ? 'filled' : 'stroked',
      onClick: undefined,
      as: 'button',
      withAction: true,
    };

    const testModeCancel = {
      view: 'filled',
      onCancel,
      as: 'span',
    };

    const testModeInfo = {
      view: 'filled',
      as: 'span',
    };

    tagPropMode.forEach((mode) => {
      it(`возвращает верный объект при mode=${mode}`, () => {
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
            return;
          case 'info':
            expect(params).toEqual(testModeInfo);
        }
      });
    });
  });
});
