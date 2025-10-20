import { fireEvent, render, screen, within } from '@testing-library/react';
import React from 'react';

import { Pagination } from '../Pagination';
import { cnPaginationArrow } from '../PaginationArrow';
import { cnPaginationItem } from '../PaginationItem';

const testId = 'Pagination';

type PaginationProps = React.ComponentProps<typeof Pagination>;

const renderComponent = (props: PaginationProps = {}) => {
  return render(
    <Pagination data-testid={testId} style={{ width: 1000 }} {...props} />,
  );
};

const getRender = () => screen.getByTestId(testId);
const queryRender = () => screen.queryByTestId(testId);

const getAllPageButtons = (tagName = 'button') =>
  getRender().querySelectorAll(`${tagName}.${cnPaginationItem()}`);
const getPage = (index: number, tagName?: string) =>
  getAllPageButtons(tagName)[index];

const getAllArrowButtons = () =>
  getRender().querySelectorAll(`.${cnPaginationArrow()}`);
const getLeftArrow = () => getAllArrowButtons()[0];
const getRightArrow = () => getAllArrowButtons()[1];

const getPageInput = () => within(getRender()).getByRole('textbox');

describe('Компонент Pagination', () => {
  const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;

  beforeAll(() => {
    // Мок getBoundingClientRect, иначе getBoundingClientRect вернет нули и не будут рендериться кнопки пагинации
    // https://github.com/jsdom/jsdom/issues/1590
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 100,
      height: 50,
      top: 10,
      left: 20,
      right: 120,
      bottom: 60,
      x: 20,
      y: 10,
      toJSON: () => ({}),
    }));
  });

  afterAll(() => {
    Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
  });

  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  describe('проверка items', () => {
    it('при items=0 компонент Pagination не отображается', () => {
      renderComponent({ items: 0 });
      expect(queryRender()).not.toBeInTheDocument();
    });

    it('visibleCount ограничивает количество страниц', () => {
      const items = 10;
      const visibleCount = 3;
      renderComponent({ items, visibleCount });

      expect(getAllPageButtons().length).toBe(visibleCount);
    });

    it('showFirstPage отображает кнопку первой страницы', () => {
      const items = 20;
      const visibleCount = 5;
      renderComponent({
        items,
        visibleCount,
        value: 10,
        showFirstPage: true,
      });

      // кнопки 1 ... 10 11 12
      expect(getPage(0)).toHaveTextContent('1');
    });

    it('showLastPage отображает кнопку последней страницы', () => {
      const items = 20;
      const visibleCount = 5;
      renderComponent({
        items,
        visibleCount,
        value: 10,
        showLastPage: true,
      });

      // кнопки 8 9 10 ... 20
      expect(getPage(4)).toHaveTextContent('20');
    });
  });

  describe('проверка arrows', () => {
    it('не отображаются по-умолчанию', () => {
      renderComponent({ items: 5 });
      expect(getAllArrowButtons().length).toBe(0);
    });

    it('отображаются, если передать [true, true]', () => {
      renderComponent({ items: 5, arrows: [true, true] });

      expect(getLeftArrow()).toBeInTheDocument();
      expect(getRightArrow()).toBeInTheDocument();
    });

    it('отображаются с кастомным текстом', () => {
      const prevLabel = 'Назад';
      const nextLabel = 'Вперед';
      renderComponent({
        items: 5,
        arrows: [{ label: prevLabel }, { label: nextLabel }],
      });
      expect(getLeftArrow()).toHaveTextContent(prevLabel);
      expect(getRightArrow()).toHaveTextContent(nextLabel);
    });

    it('клик по стрелке "вперед" меняет страницу', () => {
      const handleChange = jest.fn();
      renderComponent({
        items: 5,
        value: 1,
        onChange: handleChange,
        arrows: [true, true],
      });
      const nextArrow = getRightArrow();
      fireEvent.click(nextArrow);
      expect(handleChange).toHaveBeenCalledWith(2, expect.any(Object));
    });

    it('клик по стрелке "назад" меняет страницу', () => {
      const handleChange = jest.fn();
      renderComponent({
        items: 5,
        value: 2,
        onChange: handleChange,
        arrows: [true, true],
      });
      const prevArrow = getLeftArrow();
      fireEvent.click(prevArrow);
      expect(handleChange).toHaveBeenCalledWith(1, expect.any(Object));
    });

    it('стрелка "назад" заблокирована на первой странице', () => {
      renderComponent({ items: 5, value: 1, arrows: [true, true] });
      expect(getLeftArrow()).toBeDisabled();
    });

    it('стрелка "вперед" заблокирована на последней странице', () => {
      renderComponent({ items: 5, value: 5, arrows: [true, true] });
      expect(getRightArrow()).toBeDisabled();
    });
  });

  describe('проверка onChange', () => {
    it('клик по странице вызывает onChange', () => {
      const handleChange = jest.fn();
      renderComponent({
        items: 5,
        value: 1,
        visibleCount: 5,
        onChange: handleChange,
      });

      const pageButton = getPage(1);
      fireEvent.click(pageButton);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(2, expect.any(Object));
    });

    it('клик по активной странице не вызывает onChange', () => {
      const handleChange = jest.fn();
      renderComponent({
        items: 5,
        value: 1,
        visibleCount: 5,
        onChange: handleChange,
      });

      const pageButton = getPage(0);
      fireEvent.click(pageButton);

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('проверка outerMostArrows', () => {
    it('переходит на последнюю страницу при клике стрелки последней страницы', () => {
      const handleChange = jest.fn();
      renderComponent({
        items: 10,
        value: 1,
        visibleCount: 5,
        outerMostArrows: [true, true],
        onChange: handleChange,
      });

      const nextArrow = getRightArrow();
      fireEvent.click(nextArrow);

      expect(handleChange).toHaveBeenCalledWith(10, expect.any(Object));
    });

    it('переходит на первую страницу при клике стрелки первой страницы', () => {
      const handleChange = jest.fn();
      renderComponent({
        items: 10,
        value: 9,
        visibleCount: 5,
        outerMostArrows: [true, true],
        onChange: handleChange,
      });

      const leftArrow = getLeftArrow();
      fireEvent.click(leftArrow);

      expect(handleChange).toHaveBeenCalledWith(1, expect.any(Object));
    });
  });

  describe('проверка hotKeys', () => {
    it('переключает страницу при клике на hotkey', () => {
      const handleChange = jest.fn();

      renderComponent({
        items: 10,
        value: 1,
        visibleCount: 5,
        arrows: [true, true],
        onChange: handleChange,
        hotKeys: [
          { label: 'влево', keys: ['ArrowLeft'] },
          { label: 'вправо', keys: ['ArrowRight'] },
        ],
      });

      fireEvent.keyDown(window, { key: 'ArrowRight' });

      expect(handleChange).toHaveBeenCalledWith(2, expect.any(Object));
    });

    it('переключает страницу при клике на hotkey влево', () => {
      const handleChange = jest.fn();

      renderComponent({
        items: 10,
        value: 10,
        visibleCount: 5,
        arrows: [true, true],
        onChange: handleChange,
        hotKeys: [
          { label: 'влево', keys: ['ArrowLeft'] },
          { label: 'вправо', keys: ['ArrowRight'] },
        ],
      });

      fireEvent.keyDown(window, { key: 'ArrowLeft' });

      expect(handleChange).toHaveBeenCalledWith(9, expect.any(Object));
    });
  });

  describe('проверка type="input"', () => {
    it('отображает инпут', () => {
      renderComponent({
        items: 10,
        type: 'input',
      });
      expect(getPageInput()).toBeInTheDocument();
    });

    it('вызывает onChange при клике стрелок вверх/вниз на клавиатуре', async () => {
      const handleChange = jest.fn();

      renderComponent({
        items: 10,
        value: 1,
        type: 'input',
        onChange: handleChange,
      });

      const pageInput = getPageInput();

      fireEvent.keyDown(pageInput, { key: 'ArrowUp' });
      fireEvent.keyDown(pageInput, { key: 'Enter' });

      expect(handleChange).toHaveBeenCalledWith(2, expect.any(Object));

      fireEvent.keyDown(pageInput, { key: 'ArrowDown' });
      fireEvent.keyDown(pageInput, { key: 'Enter' });

      expect(handleChange).toHaveBeenCalledWith(1, expect.any(Object));
    });
  });

  it('getItemAs и getItemAttributes должны работать', () => {
    renderComponent({
      items: 5,
      visibleCount: 5,
      getItemAs: () => 'a',
      getItemAttributes: (item) => ({ href: `#${item.key}` }),
    });

    const pageButton = getPage(0, 'a');
    expect(pageButton.tagName).toBe('A');
    expect(pageButton).toHaveAttribute('href', '#1');
  });

  it('должен устанавливать кастомный className', () => {
    const className = 'my-custom-class';
    renderComponent({ items: 5, className });
    expect(getRender()).toHaveClass(className);
  });
});
