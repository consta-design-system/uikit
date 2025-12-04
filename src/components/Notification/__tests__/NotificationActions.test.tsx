import {
  act,
  fireEvent,
  render,
  RenderResult,
  screen,
} from '@testing-library/react';
import * as React from 'react';

import { IconMock, iconMockText } from '##/../__mocks__/IconMock';
import { animateTimeout } from '##/mixs/MixPopoverAnimate/MixPopoverAnimate';

import {
  NotificationActions,
  NotificationActionsDefaultItem,
  NotificationActionsProps,
} from '..';

const testId = 'NotificationActions';
const outsideTestId = `${testId}-outside`;

const getRender = () => screen.getByTestId(testId);
const getOutside = () => screen.getByTestId(outsideTestId);
const getContextMenu = () => screen.queryByRole('listbox') as HTMLElement;
const getContextMenuItems = () =>
  getContextMenu().querySelectorAll(`.ListItem`);
const getContextMenuItem = (index: number) => getContextMenuItems()[index];

const getButtonLabel = () =>
  getRender().querySelector(`.Button-Label`) as HTMLElement;
export const buttonClick = () => fireEvent.click(getRender());
export const animateDelay = () =>
  act(() => {
    jest.advanceTimersByTime(animateTimeout);
  });

type NotificationActionsTestComponent = <ITEM = NotificationActionsDefaultItem>(
  props: NotificationActionsProps<ITEM>,
) => RenderResult;

const renderComponent: NotificationActionsTestComponent = (props) =>
  render(
    <>
      <NotificationActions data-testid={testId} {...props} />
      <div data-testid={outsideTestId} />
    </>,
  );

/**
 * Тесты для компонента NotificationActions
 * Компонент отображает действия для уведомлений в виде кнопок или контекстного меню
 */
describe('NotificationActions', () => {
  /**
   * Проверяет, что компонент рендерится без ошибок
   */
  it('Компонент рендерится без ошибок', () => {
    renderComponent({});

    expect(screen.getByTestId('NotificationActions')).toBeInTheDocument();
  });
  /**
   * Тесты для рендера компонента с одним элементом действия
   * В этом случае компонент отображается как обычная кнопка
   */
  describe('рендер с одним элементом', () => {
    /**
     * Проверяет, что компонент с одним элементом рендерится как кнопка с текстом
     */
    it('рендерится как кнопка с текстом', () => {
      renderComponent({
        items: [{ label: 'test', onClick: () => {} }],
      });

      expect(getRender().textContent).toEqual('test');
    });

    /**
     * Проверяет, что компонент с одним элементом рендерится как кнопка с текстом и иконкой
     */
    it('рендерится как кнопка с текстом и иконкой', () => {
      renderComponent({
        items: [{ label: 'test', icon: IconMock, onClick: () => {} }],
      });

      expect(getButtonLabel().textContent).toEqual('test');
      expect(getRender().querySelector(`.${iconMockText}`)).toBeInTheDocument();
    });

    /**
     * Проверяет, что клик по кнопке срабатывает корректно
     */
    it('клик отрабатывает', () => {
      const onClick = jest.fn();
      renderComponent({
        items: [{ label: 'test', icon: IconMock, onClick }],
      });

      expect(onClick).toHaveBeenCalledTimes(0);
      getRender().click();
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    /**
     * Проверяет, что компонент рендерится только с иконкой, когда установлен флаг onlyIcon
     */
    it('рендерится с onlyIcon=true', () => {
      renderComponent({
        items: [{ label: 'test', icon: IconMock, onClick: () => {} }],
        onlyIcon: true,
      });

      expect(getRender().querySelector(`.${iconMockText}`)).toBeInTheDocument();
      expect(getButtonLabel()).not.toBeInTheDocument();
    });

    /**
     * Проверяет, что className прокидывается в компонент
     */
    it('прокидывает className', () => {
      const className = 'test-class-name';
      renderComponent({
        items: [{ label: 'test', onClick: () => {} }],
        className,
      });

      expect(getRender()).toHaveClass(className);
    });

    it('прокидывает className', () => {
      const className = 'test-class-name';
      renderComponent({
        items: [{ label: 'test', onClick: () => {} }],
        className,
        onlyIcon: true,
      });

      expect(getRender()).toHaveClass(className);
    });

    /**
     * Проверяет, что ref прокидывается в компонент
     */
    it('прокидывает ref', () => {
      const ref = React.createRef<HTMLButtonElement>();
      const items = [{ label: 'test', onClick: () => {} }];
      renderComponent({ ref, items });

      expect(ref.current).not.toBeNull();
      expect(ref.current).toBe(getRender());
    });
  });
  /**
   * Тесты для рендера компонента с несколькими элементами действий
   * В этом случае компонент отображается как кнопка с контекстным меню
   */
  describe('рендер с несколькими кнопками', () => {
    /**
     * Проверяет, что контекстное меню открывается по клику на кнопку
     */
    it('Контекстное меню открывается по клику на кнопку', () => {
      jest.useFakeTimers();

      const items = [
        { label: 'test1', icon: IconMock, onClick: () => {} },
        { label: 'test2', icon: IconMock, onClick: () => {} },
      ];
      act(() => {
        renderComponent({ items });
      });

      buttonClick();
      animateDelay();

      expect(getContextMenu()).toBeInTheDocument();
    });

    it('прокидывает className', () => {
      const className = 'test-class-name';
      const items = [
        { label: 'test1', icon: IconMock, onClick: () => {} },
        { label: 'test2', icon: IconMock, onClick: () => {} },
      ];
      renderComponent({
        items,
        className,
      });

      expect(getRender()).toHaveClass(className);
    });

    it('прокидывает ref', () => {
      const ref = React.createRef<HTMLButtonElement>();
      const items = [
        { label: 'test1', icon: IconMock, onClick: () => {} },
        { label: 'test2', icon: IconMock, onClick: () => {} },
      ];
      renderComponent({ ref, items });

      expect(ref.current).not.toBeNull();
      expect(ref.current).toBe(getRender());
    });
    /**
     * Проверяет, что контекстное меню закрывается по клику на кнопку
     */
    it('Контекстное меню закрывается по клику на кнопку', () => {
      jest.useFakeTimers();

      const items = [
        { label: 'test1', icon: IconMock, onClick: () => {} },
        { label: 'test2', icon: IconMock, onClick: () => {} },
      ];
      act(() => {
        renderComponent({ items });
      });

      // Открываем меню
      buttonClick();
      animateDelay();

      // Проверяем, что меню открылось
      expect(getContextMenu()).toBeInTheDocument();

      // Закрываем меню кликом на кнопку
      buttonClick();
      animateDelay();

      // Проверяем, что меню закрылось
      expect(getContextMenu()).not.toBeInTheDocument();
    });
    /**
     * Проверяет, что контекстное меню закрывается по клику вне компонента
     */
    it('Контекстное меню закрывается по клику вне компонента', () => {
      jest.useFakeTimers();

      const items = [
        { label: 'test1', icon: IconMock, onClick: () => {} },
        { label: 'test2', icon: IconMock, onClick: () => {} },
      ];
      act(() => {
        renderComponent({ items });
      });

      // Открываем меню
      buttonClick();
      animateDelay();

      // Проверяем, что меню открылось
      expect(getContextMenu()).toBeInTheDocument();

      // Закрываем меню кликом вне компонента
      fireEvent.mouseDown(getOutside());
      animateDelay();

      // Проверяем, что меню закрылось
      expect(getContextMenu()).not.toBeInTheDocument();
    });
    /**
     * Проверяет, что количество кнопок в контекстном меню соответствует количеству переданных элементов
     */
    it('количество кнопок равно количеству переданных', () => {
      jest.useFakeTimers();
      const items = [
        { label: 'test1', icon: IconMock, onClick: () => {} },
        { label: 'test2', icon: IconMock, onClick: () => {} },
      ];

      act(() => {
        renderComponent({ items });
      });

      buttonClick();
      animateDelay();

      expect(getContextMenuItems()).toHaveLength(items.length);
    });
    /**
     * Проверяет, что текст и иконка кнопок в контекстном меню совпадают с переданными
     */
    it('текст и иконка кнопок совпадает с переданными', () => {
      jest.useFakeTimers();
      const items = [
        { label: 'test1', icon: IconMock, onClick: () => {} },
        { label: 'test2', icon: IconMock, onClick: () => {} },
      ];
      act(() => {
        renderComponent({ items });
      });

      buttonClick();
      animateDelay();

      const index = 0;

      expect(getContextMenuItem(index)).toHaveTextContent(items[index].label);
      expect(
        getContextMenuItem(index).querySelector(`.${iconMockText}`),
      ).toBeInTheDocument();
    });
    /**
     * Проверяет, что клик на кнопку в контекстном меню отрабатывает корректно
     */
    it('клик на кнопку отрабатывает', () => {
      jest.useFakeTimers();
      const onClick = jest.fn();
      const items = [
        { label: 'test1', icon: IconMock, onClick },
        { label: 'test2', icon: IconMock, onClick: () => {} },
      ];
      act(() => {
        renderComponent({ items });
      });

      buttonClick();
      animateDelay();

      const index = 0;
      expect(onClick).toHaveBeenCalledTimes(0);
      fireEvent.click(getContextMenuItem(index));
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
});
