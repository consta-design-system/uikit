import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { cnSpoiler, Spoiler } from '../Spoiler';
import { spolierPropSize } from '../types';

type SpoilerProps = React.ComponentProps<typeof Spoiler>;

const testId = 'spoiler';

const renderComponent = (props: SpoilerProps = {}) =>
  render(<Spoiler data-testid={testId} {...props} />);

const getIcon = (base: Element) => {
  return base.querySelector(`.${cnSpoiler('Icon')}`) as Element;
};

const getSpan = (base: Element) => {
  return base.querySelector(`.${cnSpoiler('Label')}`) as Element;
};

describe('Компонент Spoiler', () => {
  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  describe('проверка props', () => {
    describe('проверка size', () => {
      spolierPropSize.forEach((size) => {
        it(`присваивает класс для size=${size}`, () => {
          renderComponent({ size });

          const spoiler = screen.getByTestId(testId);

          expect(spoiler).toHaveClass(cnSpoiler({ size }));
        });
      });
    });

    describe('проверка mode', () => {
      it('проверка отсутствия иконки в mode="inner"', () => {
        const { baseElement } = renderComponent({ mode: 'inner' });

        const icon = getIcon(baseElement);

        expect(icon).toBeNull();
      });

      it('проверка наличия подчеркивания в mode="inner"', () => {
        renderComponent({ mode: 'inner' });

        const spoiler = screen.getByTestId(testId);

        expect(spoiler).toHaveClass(cnSpoiler({ underline: true }));
      });

      it('проверка наличия иконки в mode="external"', () => {
        const { baseElement } = renderComponent({ mode: 'external' });

        const icon = getIcon(baseElement);

        expect(icon).toBeValid();
      });

      it('проверка отсутствия подчеркивания в mode="external"', () => {
        renderComponent({ mode: 'external' });

        const spoiler = screen.getByTestId(testId);

        expect(spoiler).toHaveClass(cnSpoiler({ underline: false }));
      });
    });

    describe('проверка type', () => {
      it('проверка текста в type="more"', () => {
        const { baseElement } = renderComponent({ type: 'more' });

        const label = getSpan(baseElement);

        expect(label).toHaveTextContent('Показать больше');
      });

      it('проверка текста в type="less"', () => {
        const { baseElement } = renderComponent({ type: 'less' });

        const label = getSpan(baseElement);

        expect(label).toHaveTextContent('Показать меньше');
      });
    });

    describe('проверка тега', () => {
      const tags = ['a', 'div', 'span'] as const;
      tags.forEach((el) => {
        it(`должен рендериться как <${el}>`, () => {
          renderComponent({ as: el });

          const spoiler = screen.getByTestId(testId);

          expect(spoiler.tagName).toEqual(el.toUpperCase());
        });
      });
    });

    describe('должен отображать текст', () => {
      it('должен отображать текст в type="more"', () => {
        const labelText = 'Показать';

        const { baseElement } = renderComponent({ moreLabel: labelText });

        const label = getSpan(baseElement);

        expect(label).toHaveTextContent(labelText);
      });

      it('должен отображать текст в type="less"', () => {
        const labelText = 'Скрыть';

        const { baseElement } = renderComponent({
          lessLabel: labelText,
          type: 'less',
        });

        const label = getSpan(baseElement);

        expect(label).toHaveTextContent(labelText);
      });
    });
  });
});
