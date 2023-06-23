import { IconArrowDown } from '@consta/icons/IconArrowDown';
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

    describe('проверка open', () => {
      it('проверка текста при open="false"', () => {
        const { baseElement } = renderComponent({});

        const label = getSpan(baseElement);

        expect(label).toHaveTextContent('Показать больше');
      });

      it('проверка текста при open="true"', () => {
        const { baseElement } = renderComponent({ open: true });

        const label = getSpan(baseElement);

        expect(label).toHaveTextContent('Показать меньше');
      });
    });

    describe('проверка иконок', () => {
      it('проверка наличия подчеркивания при отсутствии иконки', () => {
        renderComponent({});

        const spoiler = screen.getByTestId(testId);

        expect(spoiler).toHaveClass(cnSpoiler({ underline: true }));
      });

      it('проверка отсутствия подчеркивания при наличии иконки', () => {
        renderComponent({ moreIcon: IconArrowDown });

        const spoiler = screen.getByTestId(testId);

        expect(spoiler).toHaveClass(cnSpoiler({ underline: false }));
      });

      it('проверка наличия иконки', () => {
        const { baseElement } = renderComponent({ moreIcon: IconArrowDown });

        const icon = getIcon(baseElement);

        expect(icon).toBeValid();
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
      it('должен отображать текст при open="false"', () => {
        const labelText = 'Показать';

        const { baseElement } = renderComponent({ moreLabel: labelText });

        const label = getSpan(baseElement);

        expect(label).toHaveTextContent(labelText);
      });

      it('должен отображать текст при open="true"', () => {
        const labelText = 'Скрыть';

        const { baseElement } = renderComponent({
          lessLabel: labelText,
          open: true,
        });

        const label = getSpan(baseElement);

        expect(label).toHaveTextContent(labelText);
      });
    });
  });
});
