import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';

import * as useResizeObserved from '##/hooks/useResizeObserved/useResizeObserved';

import { cnSpoiler, cnSpoilerButton, Spoiler } from '..';
import { spolierPropSize } from '../types';

type SpoilerProps = React.ComponentProps<typeof Spoiler>;

const testId = 'spoiler';

export type ComponentSize = {
  width: number;
  height: number;
};

const defaultSizes: ComponentSize[] = [
  { width: 100, height: 200 },
  { width: 100, height: 300 },
  { width: 100, height: 200 },
];

const renderComponent = (props: SpoilerProps) => {
  return render(<Spoiler data-testid={testId} {...props} />);
};

const getRender = () => screen.getByTestId(testId);

const getButton = () =>
  getRender().querySelector(`.${cnSpoilerButton()}`) as Element;

const getButtonLabel = () =>
  getRender().querySelector(`.${cnSpoilerButton('Label')}`) as Element;

const moksProps = {
  children:
    'Проснувшись однажды утром после беспокойного сна, Грегор Замза обнаружил, что он у себя в постели превратился в страшное насекомое. Лежа на панцирнотвердой спине, он видел, стоило ему приподнять голову, свой коричневый, выпуклый,разделенный дугообразными чешуйками живот, на верхушке которого еле держалосьготовое вот-вот окончательно сползти одеяло. Его многочисленные, убого тонкиепо сравнению с остальным телом ножки беспомощно копошились у него передглазами. «Что со мной случилось?» – подумал он.',
  lineClamp: 1,
  moreLabel: 'Показать',
  lessLabel: 'Скрыть',
  style: { width: 50 },
};

afterEach(() => {
  // restore the spy created with spyOn
  jest.restoreAllMocks();
});

describe('Компонент Spoiler', () => {
  const setMockUseResizeObserved = (sizes: ComponentSize[]): void => {
    jest.spyOn(useResizeObserved, 'useResizeObserved').mockReturnValue(sizes);
  };

  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  describe('проверка присутствия кнопки', () => {
    it('кнопка не отображается, если высота превью схожа с высотой полного текста', () => {
      setMockUseResizeObserved([
        { width: 100, height: 200 },
        { width: 100, height: 200 },
        { width: 100, height: 200 },
      ]);
      renderComponent(moksProps);

      expect(getButton()).toEqual(null);
    });
    it('кнопка отображается, если высота превью меньше высоты полного текста', () => {
      setMockUseResizeObserved(defaultSizes);
      renderComponent(moksProps);

      expect(getButton()).toHaveClass(cnSpoilerButton());
    });
  });

  describe('проверка props', () => {
    describe('проверка size', () => {
      spolierPropSize.forEach((size) => {
        it(`присваивает класс для size=${size}`, () => {
          setMockUseResizeObserved(defaultSizes);
          renderComponent({ ...moksProps, size });

          expect(getRender()).toHaveClass(cnSpoiler({ size }));
        });
      });
    });

    describe('проверка moreLabel', () => {
      it('проверка текста при open="false"', () => {
        setMockUseResizeObserved(defaultSizes);
        renderComponent(moksProps);

        expect(getButtonLabel()).toHaveTextContent(moksProps.moreLabel);
      });
    });
    describe('проверка lessLabel', () => {
      it('проверка текста при open="true"', () => {
        setMockUseResizeObserved(defaultSizes);
        renderComponent(moksProps);

        const button = getButton();

        fireEvent.click(button);

        expect(getButtonLabel()).toHaveTextContent(moksProps.lessLabel);
      });
    });
  });
});
