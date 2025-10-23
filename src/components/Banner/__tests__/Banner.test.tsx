import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { createIconMock } from '##/../__mocks__/IconMock';
import { cnMixFlex } from '##/mixs/MixFlex';
import { cnMixSpace, MixSpaceProps, Space } from '##/mixs/MixSpace';

import {
  Banner,
  bannerPropForm,
  bannerPropFormDefault,
  bannerPropSize,
  bannerPropSizeDefault,
  bannerPropStatus,
  bannerPropStatusDefault,
  bannerPropView,
  bannerPropViewDefault,
  cnBanner,
} from '../Banner';

const iconText = 'IconMock';
const IconLeftMock = createIconMock(iconText);

type BannerProps = React.ComponentProps<typeof Banner>;

const testId = 'banner';

const getRender = () => screen.getByTestId(testId);

const renderComponent = (props: BannerProps = {}) => {
  return render(<Banner data-testid={testId} {...props} />);
};

describe('Компонент Banner', () => {
  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  it('должен рендериться без какого-либо контента', () => {
    renderComponent();
    expect(getRender()).toBeInTheDocument();
    expect(getRender()).toBeEmptyDOMElement();
  });

  it('должен использовать default значения когда пропсы не переданы', () => {
    renderComponent();
    const banner = getRender();

    expect(banner).toHaveClass(
      cnBanner({
        size: bannerPropSizeDefault,
        view: bannerPropViewDefault,
        form: bannerPropFormDefault,
      }),
    );

    expect(banner).toHaveStyle({
      '--banner-bg-color': `var(--color-bg-${bannerPropStatusDefault})`, // ← Из констант!
    });
  });

  describe('проверка size', () => {
    bannerPropSize.forEach((size) => {
      it(`присваивает класс для size=${size}`, () => {
        renderComponent({ size });
        expect(getRender()).toHaveClass(cnBanner({ size }));
      });
    });
  });

  describe('проверка view', () => {
    bannerPropView.forEach((view) => {
      it(`присваивает класс для view=${view}`, () => {
        renderComponent({ view });
        expect(getRender()).toHaveClass(cnBanner({ view }));
      });
    });
  });

  describe('проверка status', () => {
    bannerPropStatus.forEach((status) => {
      it(`устанавливает CSS переменную для status=${status}`, () => {
        renderComponent({ status });
        expect(getRender()).toHaveStyle({
          '--banner-bg-color': `var(--color-bg-${status})`,
        });
      });
    });
  });

  describe('проверка form', () => {
    bannerPropForm.forEach((form) => {
      it(`присваивает класс для form=${form}`, () => {
        renderComponent({ form });
        expect(getRender()).toHaveClass(cnBanner({ form }));
      });
    });
  });

  describe('проверка ref', () => {
    it('должен корректно передавать ref', () => {
      const ref = React.createRef<HTMLDivElement>();
      renderComponent({ ref });
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass(cnBanner());
    });
  });

  describe('проверка кастомного класса', () => {
    it('должен добавлять переданный className', () => {
      const customClass = 'custom-class';
      renderComponent({ className: customClass });
      expect(getRender()).toHaveClass(customClass);
    });
  });

  describe('проверка кастомного стиля', () => {
    it('должен применять переданный style', () => {
      const customStyle = { backgroundColor: 'red' };
      renderComponent({ style: customStyle });
      expect(getRender()).toHaveStyle(customStyle);
    });
  });

  describe('проверка leftSide', () => {
    it('должен отображать строку в leftSide', () => {
      const leftText = 'Левый текст';
      renderComponent({ leftSide: leftText });
      expect(getRender()).toHaveTextContent(leftText);
    });

    it('должен отображать число в leftSide', () => {
      renderComponent({ leftSide: 123 });
      expect(getRender()).toHaveTextContent('123');
    });

    it('должен отображать React элемент в leftSide', () => {
      const leftElement = <span data-testid="left-element">Элемент</span>;
      renderComponent({ leftSide: leftElement });
      expect(screen.getByTestId('left-element')).toBeInTheDocument();
      expect(screen.getByTestId('left-element')).toHaveTextContent('Элемент');
    });

    it('должен отображать массив строк в leftSide', () => {
      const leftArray = ['Текст 1', 'Текст 2', 'Текст 3'];
      renderComponent({ leftSide: leftArray });
      expect(getRender()).toHaveTextContent('Текст 1Текст 2Текст 3');
    });

    it('должен отображать смешанный массив в leftSide', () => {
      const mixedArray = [
        'Текст 1',
        <span key="2" data-testid="mixed-element">
          Элемент
        </span>,
        123,
        'Текст 4',
      ];

      renderComponent({ leftSide: mixedArray });

      expect(getRender()).toHaveTextContent('Текст 1');
      expect(screen.getByTestId('mixed-element')).toBeInTheDocument();
      expect(getRender()).toHaveTextContent('123');
      expect(getRender()).toHaveTextContent('Текст 4');
    });

    it('должен игнорировать null и undefined в массиве leftSide', () => {
      renderComponent({
        leftSide: ['Текст 1', null, 'Текст 2', undefined, 'Текст 3'],
      });

      expect(getRender()).toHaveTextContent('Текст 1Текст 2Текст 3');
      expect(getRender().querySelectorAll(`.${cnBanner('Slot')}`)).toHaveLength(
        3,
      );
    });
  });

  describe('проверка rightSide', () => {
    it('должен отображать строку в rightSide', () => {
      const rightText = 'Правый текст';
      renderComponent({ leftSide: rightText });
      expect(getRender()).toHaveTextContent(rightText);
    });

    it('должен отображать число в rightSide', () => {
      renderComponent({ rightSide: 123 });
      expect(getRender()).toHaveTextContent('123');
    });

    it('должен отображать React элемент в rightSide', () => {
      const rightElement = <span data-testid="right-element">Элемент</span>;
      renderComponent({ rightSide: rightElement });
      expect(screen.getByTestId('right-element')).toBeInTheDocument();
      expect(screen.getByTestId('right-element')).toHaveTextContent('Элемент');
    });

    it('должен отображать массив строк в rightSide', () => {
      const rightArray = ['Текст 1', 'Текст 2', 'Текст 3'];
      renderComponent({ rightSide: rightArray });
      expect(getRender()).toHaveTextContent('Текст 1Текст 2Текст 3');
    });

    it('должен отображать смешанный массив в rightSide', () => {
      const mixedArray = [
        'Текст 1',
        <span key="2" data-testid="mixed-element">
          Элемент
        </span>,
        123,
        'Текст 4',
      ];

      renderComponent({ rightSide: mixedArray });

      expect(getRender()).toHaveTextContent('Текст 1');
      expect(screen.getByTestId('mixed-element')).toBeInTheDocument();
      expect(getRender()).toHaveTextContent('123');
      expect(getRender()).toHaveTextContent('Текст 4');
    });

    it('должен игнорировать null и undefined в массиве rightSide', () => {
      renderComponent({
        rightSide: ['Текст 1', null, 'Текст 2', undefined, 'Текст 3'],
      });

      expect(getRender()).toHaveTextContent('Текст 1Текст 2Текст 3');
      expect(getRender().querySelectorAll(`.${cnBanner('Slot')}`)).toHaveLength(
        3,
      );
    });
  });

  describe('проверка icon', () => {
    it('должен отображать иконку', () => {
      renderComponent({ icon: IconLeftMock });
      expect(getRender()).toHaveTextContent(iconText);
    });

    it('должен отображать иконку вместе с leftSide', () => {
      renderComponent({ icon: IconLeftMock, leftSide: 'Текст слева' });
      expect(getRender()).toHaveTextContent(`${iconText}Текст слева`);
    });

    it('должен добавлять класс для иконки', () => {
      renderComponent({ icon: IconLeftMock });
      const iconElement = getRender().querySelector(`.${cnBanner('Icon')}`);
      expect(iconElement).toBeInTheDocument();
      expect(iconElement).toHaveClass(cnBanner('Icon'));
    });

    it('должен отображать иконку вместе с массивом в leftSide', () => {
      renderComponent({
        icon: IconLeftMock,
        leftSide: ['Текст 1', 'Текст 2'],
      });
      expect(getRender()).toHaveTextContent(`${iconText}Текст 1Текст 2`);
    });

    it('должен отображать только иконку когда нет leftSide', () => {
      renderComponent({ icon: IconLeftMock });
      expect(getRender()).toHaveTextContent(iconText);
      expect(getRender().querySelectorAll(`.${cnBanner('Slot')}`)).toHaveLength(
        1,
      );
    });

    it('иконка должна быть первым элементом в leftSide', () => {
      renderComponent({
        icon: IconLeftMock,
        leftSide: ['Первый', 'Второй'],
      });

      const slots = getRender().querySelectorAll(`.${cnBanner('Slot')}`);
      expect(slots[0]).toHaveTextContent(iconText);
      expect(slots[1]).toHaveTextContent('Первый');
      expect(slots[2]).toHaveTextContent('Второй');
    });
  });

  describe('проверка space', () => {
    it('должен применять классы для отступов', () => {
      const space: MixSpaceProps = { m: 'm', p: 's' };
      renderComponent({ space });

      expect(getRender()).toHaveClass(cnMixSpace(space));
    });

    it('должен применять отступы по осям', () => {
      const space: MixSpaceProps = {
        mH: 'm',
        mV: 's',
        pH: 'l',
        pV: 'xs',
      };
      renderComponent({ space });

      expect(getRender()).toHaveClass(cnMixSpace(space));
    });
  });

  describe('проверка itemsGap', () => {
    it('должен применять единый отступ для всех элементов', () => {
      const itemsGap: Space = 'm';
      renderComponent({
        itemsGap,
        leftSide: ['Текст 1', 'Текст 2'],
        rightSide: ['Текст 3', 'Текст 4'],
      });

      const leftContainer = getRender().firstChild as HTMLElement;
      const rightContainer = getRender().lastChild as HTMLElement;

      expect(leftContainer).toHaveClass(cnMixFlex({ gap: 'm' }));
      expect(rightContainer).toHaveClass(cnMixFlex({ gap: 'm' }));
    });

    it('должен применять разные отступы для левой и правой стороны', () => {
      const itemsGap: [Space, Space] = ['s', 'm'];
      renderComponent({
        itemsGap,
        leftSide: ['Текст 1', 'Текст 2'],
        rightSide: ['Текст 3', 'Текст 4'],
      });

      const leftContainer = getRender().firstChild as HTMLElement;
      const rightContainer = getRender().lastChild as HTMLElement;

      expect(leftContainer).toHaveClass(cnMixFlex({ gap: 's' }));
      expect(rightContainer).toHaveClass(cnMixFlex({ gap: 'm' }));
    });

    it('должен применять gap только к левому контейнеру при отсутствии правого', () => {
      renderComponent({
        itemsGap: 'm',
        leftSide: ['Текст 1', 'Текст 2'],
      });

      const leftContainer = getRender().firstChild as HTMLElement;
      expect(leftContainer).toHaveClass(cnMixFlex({ gap: 'm' }));
      expect(getRender().children).toHaveLength(1);
    });

    it('должен применять gap только к правому контейнеру при отсутствии левого', () => {
      renderComponent({
        itemsGap: 'm',
        rightSide: ['Текст 1', 'Текст 2'],
      });

      const rightContainer = getRender().firstChild as HTMLElement;
      expect(rightContainer).toHaveClass(cnMixFlex({ gap: 'm' }));
      expect(getRender().children).toHaveLength(1);
    });
  });
});
