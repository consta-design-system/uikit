import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';

import * as useResizeObserved from '##/hooks/useResizeObserved/useResizeObserved';

import { cnSpoiler, cnSpoilerButton, Spoiler } from '..';
import { spoilerPropSize } from '../types';

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

const mocksProps = {
  children:
    'Проснувшись однажды утром после беспокойного сна, Грегор Белый обнаружил, что он у себя в постели превратился в страшное насекомое. Лежа на твердой спине, он видел, стоило ему приподнять голову, свой коричневый, выпуклый,разделенный дугообразными чешуйками живот, на верхушке которого еле держалось готовое вот-вот окончательно сползти одеяло. Его многочисленные, убого тонкие по сравнению с остальным телом ножки беспомощно копошились у него перед глазами. «Что со мной случилось?» – подумал он.',
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
      renderComponent(mocksProps);

      expect(getButton()).toEqual(null);
    });
    it('кнопка отображается, если высота превью меньше высоты полного текста', () => {
      setMockUseResizeObserved(defaultSizes);
      renderComponent(mocksProps);

      expect(getButton()).toHaveClass(cnSpoilerButton());
    });
  });

  describe('проверка props', () => {
    describe('проверка size', () => {
      spoilerPropSize.forEach((size) => {
        it(`присваивает класс для size=${size}`, () => {
          setMockUseResizeObserved(defaultSizes);
          renderComponent({ ...mocksProps, size });

          expect(getRender()).toHaveClass(cnSpoiler({ size }));
        });
      });
    });

    describe('проверка moreLabel', () => {
      it('проверка текста при open="false"', () => {
        setMockUseResizeObserved(defaultSizes);
        renderComponent(mocksProps);

        expect(getButtonLabel()).toHaveTextContent(mocksProps.moreLabel);
      });
    });
    describe('проверка lessLabel', () => {
      it('проверка текста при open="true"', () => {
        setMockUseResizeObserved(defaultSizes);
        renderComponent(mocksProps);

        const button = getButton();

        fireEvent.click(button);

        expect(getButtonLabel()).toHaveTextContent(mocksProps.lessLabel);
      });
    });

    it('ref должен быть присвоен', () => {
      const ref = React.createRef<HTMLDivElement>();
      renderComponent({ ...mocksProps, ref });
      expect(ref.current).toBe(getRender());
    });
  });
});
