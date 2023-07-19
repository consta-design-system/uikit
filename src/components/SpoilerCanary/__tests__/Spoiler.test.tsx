import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';

import { cnCanary } from '##/utils/bem';

import { cnSpoiler, Spoiler } from '..';
import { spolierPropSize } from '../types';

const cnSpoilerButton = cnCanary('SpoilerButton');

type SpoilerProps = React.ComponentProps<typeof Spoiler>;

const testId = 'spoiler';

const renderComponent = (props: SpoilerProps) =>
  render(<Spoiler data-testid={testId} {...props} />);

const getButton = (base: Element) => {
  return base.querySelector(`.${cnSpoilerButton()}`) as Element;
};

const getSpan = (base: Element) => {
  return base.querySelector(`.${cnSpoilerButton('Label')}`) as Element;
};

describe('Компонент Spoiler', () => {
  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  describe('проверка props', () => {
    describe('проверка size', () => {
      spolierPropSize.forEach((size) => {
        it(`присваивает класс для size=${size}`, () => {
          renderComponent({ size, children: 'Test' });

          const spoiler = screen.getByTestId(testId);

          expect(spoiler).toHaveClass(cnSpoiler({ size }));
        });
      });
    });

    describe('проверка open', () => {
      it('проверка текста при open="false"', () => {
        const { baseElement } = renderComponent({ children: 'Test' });

        const label = getSpan(baseElement);

        expect(label).toHaveTextContent('Показать больше');
      });

      it('проверка текста при open="true"', () => {
        const { baseElement } = renderComponent({ children: 'Test' });

        const button = getButton(baseElement);

        fireEvent.click(button);

        const label = getSpan(button);

        expect(label).toHaveTextContent('Показать меньше');
      });
    });

    describe('должен отображать текст', () => {
      it('должен отображать текст при open="false"', () => {
        const labelText = 'Показать';

        const { baseElement } = renderComponent({
          moreLabel: labelText,
          children: 'Test',
        });

        const button = getButton(baseElement);

        const label = getSpan(button);

        expect(label).toHaveTextContent(labelText);
      });

      it('должен отображать текст при open="true"', () => {
        const labelText = 'Скрыть';

        const { baseElement } = renderComponent({
          lessLabel: labelText,
          children: 'Test',
        });

        const button = getButton(baseElement);

        fireEvent.click(button);

        const label = getSpan(baseElement);

        expect(label).toHaveTextContent(labelText);
      });
    });
  });
});
