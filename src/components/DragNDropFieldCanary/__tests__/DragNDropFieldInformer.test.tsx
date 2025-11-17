import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { createIconMock } from '##/../__mocks__/IconMock';

import { DragNDropFieldInformer } from '../DragNDropFieldInformer';

const testId = 'DragNDropFieldInformer';

type Props = React.ComponentProps<typeof DragNDropFieldInformer>;

const renderComponent = (props: Props = {}) => {
  return render(<DragNDropFieldInformer data-testid={testId} {...props} />);
};

const iconText = 'TestIcon';
const Icon = createIconMock(iconText);

const getRender = () => screen.getByTestId(testId);
const getButton = () => getRender().querySelector('button');
const getProgress = () =>
  getRender().querySelector('[class*="DragNDropFieldInformer-Progress"]');

describe('Компонент DragNDropFieldInformer', () => {
  it('должен рендериться без ошибок', () => {
    expect(() => renderComponent()).not.toThrow();
  });

  it('должен присваиваться дополнительный className', () => {
    const className = 'custom-class';
    renderComponent({ className });
    expect(getRender()).toHaveClass(className);
  });

  it('ref должен быть присвоен', () => {
    const ref = React.createRef<HTMLDivElement>();
    renderComponent({ ref });
    expect(ref.current).toBe(getRender());
  });

  it('должен отображаться текст', () => {
    const text = 'Test text';
    renderComponent({ text });
    expect(getRender()).toHaveTextContent(text);
  });

  describe('проверка icon', () => {
    it('иконка отображается', () => {
      renderComponent({ icon: Icon });
      expect(getRender()).toHaveTextContent(iconText);
    });

    it('иконка не отображается в состоянии loading', () => {
      renderComponent({ icon: Icon, loading: true });
      expect(getRender()).not.toHaveTextContent(iconText);
    });
  });

  describe('проверка loading', () => {
    it('отображается ProgressSpin при loading=true', () => {
      renderComponent({ loading: true });
      expect(getProgress()).toBeInTheDocument();
    });

    it('отображается ProgressSpin при loading={50}', () => {
      renderComponent({ loading: 50 });
      expect(getProgress()).toBeInTheDocument();
    });

    it('не отображается ProgressSpin при loading=false', () => {
      renderComponent({ loading: false });
      expect(getProgress()).not.toBeInTheDocument();
    });
  });

  describe('проверка кнопки', () => {
    it('кнопка не отображается по умолчанию', () => {
      renderComponent();
      expect(getButton()).not.toBeInTheDocument();
    });

    it('кнопка отображается c withButton=true', () => {
      renderComponent({ withButton: true });
      expect(getButton()).toBeInTheDocument();
    });

    it('на кнопке отображается иконка', () => {
      renderComponent({ withButton: true, buttonIcon: Icon });
      expect(getButton()).toHaveTextContent(iconText);
    });

    it('у кнопки есть title', () => {
      const buttonLabel = 'Test title';
      renderComponent({ withButton: true, buttonLabel });
      expect(getButton()).toHaveAttribute('title', buttonLabel);
    });

    it('onButtonClick вызывается при клике', () => {
      const onButtonClick = jest.fn();
      renderComponent({ withButton: true, onButtonClick });
      const button = getButton()!;
      fireEvent.click(button);
      expect(onButtonClick).toHaveBeenCalledTimes(1);
    });
  });
});
