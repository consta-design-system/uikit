import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { IconMock, iconMockText } from '##/../__mocks__/IconMock';
import { cnFieldLabel } from '##/components/FieldComponents';
import { cnText } from '##/components/Text';
import { cnMixFlex } from '##/mixs/MixFlex';
import { setRef } from '##/utils/setRef';

import { fieldPropStatus } from '../../__mocks__/variants';
import { FieldWrapper } from '..';
import { cnFieldWrapper } from '../cnFieldWrapper';
import { directionMap, spaceMap } from '../helpers';

type Props = React.ComponentProps<typeof FieldWrapper>;

const testId = 'FieldWrapper';

const renderComponent = ({
  children = undefined,
  ...props
}: Omit<Props, 'children'> & { children?: React.ReactNode } = {}) => {
  return render(
    <FieldWrapper data-testid={testId} {...props}>
      {children}
    </FieldWrapper>,
  );
};

const getRender = () => screen.getByTestId(testId);
const getLabel = () =>
  getRender().querySelector(`.${cnFieldLabel()}`) as HTMLElement;
const getLabelIcon = () => getLabel().querySelector(`.${iconMockText}`);
const getCaption = () =>
  getRender().querySelector(`.${cnFieldWrapper('Caption')}`) as HTMLElement;
const getStart = () => getLabel().querySelector(`.${cnFieldLabel('Star')}`);
const getSide = () => getRender().querySelector(`.${cnFieldWrapper('Side')}`);
const getSideText = () =>
  getRender().querySelector(`.${cnFieldWrapper('SideText')}`);
const getCounter = () =>
  getRender().querySelector(`.${cnFieldWrapper('Counter')}`);

describe(`Компонент ${testId}`, () => {
  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });
  describe('проверка ref', () => {
    it(`ref присвоен`, () => {
      const ref = { current: null };

      renderComponent({
        ref: (el: HTMLDivElement) => setRef(ref, el),
      });

      expect(ref.current).toBeTruthy();
    });
  });

  describe('проверка as', () => {
    const tags = ['a', 'div', 'span'] as const;

    tags.forEach((el) => {
      it(`должен рендериться как <${el}>`, () => {
        renderComponent({ as: el });
        expect(getRender().tagName).toEqual(el.toUpperCase());
      });
    });
  });
  describe('проверка className', () => {
    it(`Присваивается дополнительный className`, () => {
      const className = 'className';

      renderComponent({ className });
      expect(getRender()).toHaveClass(className);
    });
  });

  describe('проверка other props', () => {
    const props = ['data-attr', 'role', 'id'] as const;

    props.forEach((prop) => {
      it(`присваивается  ${prop}=${prop}`, () => {
        renderComponent({ [prop]: prop });

        expect(getRender()).toHaveAttribute(prop, prop);
      });
    });
  });

  describe('проверка children', () => {
    it(`Пробрасывается children`, () => {
      const children = 'children';

      renderComponent({ children });

      expect(getRender()).toHaveTextContent(children);
    });
  });

  describe('проверка label', () => {
    it(`Пробрасывается label`, () => {
      const label = 'label';

      renderComponent({ label });

      expect(getLabel()).toHaveTextContent(label);
    });

    it(`при отсутствие label ${cnFieldLabel()} не рендериться`, () => {
      renderComponent({ label: undefined });

      expect(getLabel()).toBeNull();
    });
  });

  describe('проверка size', () => {
    const sizes = ['s', 'm', 'l', 'xs'] as const;
    sizes.forEach((size) => {
      it(`${cnFieldLabel()} рендериться как ${cnText({
        size,
      })}`, () => {
        renderComponent({ size, label: 'label' });

        expect(getLabel()).toHaveClass(cnText({ size }));
      });
    });

    sizes.forEach((size) => {
      it(`gap для ${cnMixFlex(
        {},
      )} при size=${size} вычислен и присвоен`, () => {
        renderComponent({ size, label: 'label' });

        expect(getRender()).toHaveClass(cnMixFlex({ gap: spaceMap[size] }));
      });
    });
  });

  describe('проверка label', () => {
    it(`Пробрасывается label`, () => {
      const label = 'label';

      renderComponent({ label });

      expect(getLabel()).toHaveTextContent(label);
    });

    it(`при отсутствие label ${cnFieldLabel()} не рендериться`, () => {
      renderComponent({ label: undefined });

      expect(getLabel()).toBeNull();
    });
  });

  describe('проверка labelIcon', () => {
    it(`Отображается icon`, () => {
      renderComponent({
        label: 'label',
        labelIcon: IconMock,
      });
      expect(getLabelIcon()).toHaveTextContent(iconMockText);
    });
  });

  describe('проверка labelIconRef', () => {
    it(`iconRef присвоен`, () => {
      const ref = { current: null };
      renderComponent({
        label: 'label',
        labelIcon: IconMock,
        labelIconRef: (el: HTMLElement) => setRef(ref, el),
      });
      expect(ref.current).toBeTruthy();
    });
  });

  describe('проверка caption', () => {
    it(`Пробрасывается caption`, () => {
      const caption = 'caption';

      renderComponent({ caption });

      expect(getCaption()).toHaveTextContent(caption);
    });

    it(`при отсутствие caption ${cnFieldLabel()} не рендериться`, () => {
      renderComponent({ label: undefined });

      expect(getCaption()).toBeNull();
    });
  });

  describe('проверка required', () => {
    it(`Отображается элемент ${cnFieldLabel('Star')}`, () => {
      renderComponent({ label: 'label', required: true });
      expect(getStart()).not.toBeNull();
    });
  });

  describe('проверка status', () => {
    const tags = [...fieldPropStatus, undefined] as const;
    tags.forEach((status) => {
      it(`${cnFieldWrapper('Caption')} должен рендериться как ${cnText({
        view: status || 'ghost',
      })}`, () => {
        renderComponent({ status, caption: 'caption' });

        expect(getCaption()).toHaveClass(cnText({ view: status || 'ghost' }));
      });
    });
  });

  describe('проверка side', () => {
    it(`Отображается элемент ${cnFieldWrapper('Side')}`, () => {
      renderComponent({ side: 'side' });
      expect(getSide()).not.toBeNull();
    });
    it(`Не отображается элемент ${cnFieldWrapper(
      'Side',
    )} если side не указан`, () => {
      renderComponent();
      expect(getSide()).toBeNull();
    });
    it(`Отображается элемент ${cnFieldWrapper(
      'SideText',
    )} если side строка`, () => {
      const side = 'side';
      renderComponent({ side });
      expect(getSideText()).not.toBeNull();
      expect(getSideText()).toHaveTextContent(side);
    });
    it(`Не отображается элемент ${cnFieldWrapper(
      'SideText',
    )} если side не строка`, () => {
      const side = 'side';
      renderComponent({ side: <div>{side}</div> });
      expect(getSideText()).toBeNull();
      expect(getSide()).toHaveTextContent(side);
    });
  });

  describe('проверка counter', () => {
    it(`Отображается элемент ${cnFieldLabel('Counter')}`, () => {
      const counter = '10/100';
      renderComponent({ counter });
      expect(getCounter()).not.toBeNull();
      expect(getCounter()).toHaveTextContent(counter);
    });
    it(`Форматирование counter`, () => {
      const counter = [10, 100] as [number, number];
      renderComponent({ counter });
      expect(getCounter()).not.toBeNull();
      expect(getCounter()).toHaveTextContent('10/100');
    });
  });

  describe('проверка labelPosition', () => {
    const labelPositions = ['top', 'left'] as const;
    labelPositions.forEach((labelPosition) => {
      it(`direction применяется в соответствии с directionMap (labelPosition = ${labelPosition})`, () => {
        renderComponent({ labelPosition });

        expect(getRender()).toHaveClass(
          cnMixFlex({ direction: directionMap[labelPosition] }),
        );
      });
    });

    it(`gap для ${cnMixFlex(
      {},
    )} при labelPosition ==! 'top', должен быть 's'`, () => {
      renderComponent({ labelPosition: 'left' });

      expect(getRender()).toHaveClass(cnMixFlex({ gap: 's' }));
    });
  });

  describe('проверка labelHtmlFor', () => {
    it(`атрибут for присвоился к ${cnFieldLabel()} и отрендерил как <label>`, () => {
      const labelHtmlFor = 'id';
      renderComponent({ labelHtmlFor, label: 'label' });

      expect(getLabel()).toHaveAttribute('for', labelHtmlFor);
      expect(getLabel().tagName).toEqual('LABEL');
    });
  });
  describe('проверка renderCounter', () => {
    it('Отображается корректный counter, если передана строка', () => {
      const counter = '10/100';
      renderComponent({ counter });
      expect(getCounter()).toHaveTextContent(counter);
    });

    it('Отображается корректный counter, если передан массив', () => {
      const counter: [number, number] = [10, 100];
      renderComponent({ counter });
      expect(getCounter()).toHaveTextContent('10/100');
    });

    it('Отображается корректный counter, если передано число', () => {
      const counter = 50;
      renderComponent({ counter });
      expect(getCounter()).toHaveTextContent('50');
    });

    it('Не отображается counter, если он не передан', () => {
      renderComponent();
      expect(getCounter()).toBeNull();
    });
  });

  describe('проверка renderSide', () => {
    it('Отображается side, если передана строка', () => {
      const side = 'side text';
      renderComponent({ side });
      expect(getSideText()).toHaveTextContent(side);
    });

    it('Отображается side, если передан React элемент', () => {
      const side = <div>Custom Side</div>;
      renderComponent({ side });
      expect(getSide()).toHaveTextContent('Custom Side');
    });

    it('Не отображается side, если он не передан', () => {
      renderComponent();
      expect(getSide()).toBeNull();
    });
  });

  describe('проверка labelPosition', () => {
    it('Применяется корректный direction для labelPosition="top"', () => {
      renderComponent({ labelPosition: 'top' });
      expect(getRender()).toHaveClass(
        cnMixFlex({ direction: directionMap.top }),
      );
    });

    it('Применяется корректный direction для labelPosition="left"', () => {
      renderComponent({ labelPosition: 'left' });
      expect(getRender()).toHaveClass(
        cnMixFlex({ direction: directionMap.left }),
      );
    });

    it('Применяется gap="s" для labelPosition="left"', () => {
      renderComponent({ labelPosition: 'left' });
      expect(getRender()).toHaveClass(cnMixFlex({ gap: 's' }));
    });

    it('Применяется корректный gap для labelPosition="top"', () => {
      renderComponent({ labelPosition: 'top', size: 'm' });
      expect(getRender()).toHaveClass(cnMixFlex({ gap: spaceMap.m }));
    });
  });

  describe('проверка FieldCaption', () => {
    it('Отображается caption, если он передан', () => {
      const caption = 'Test Caption';
      renderComponent({ caption });
      expect(getCaption()).toHaveTextContent(caption);
    });

    it('Не отображается caption, если он не передан', () => {
      renderComponent();
      expect(getCaption()).toBeNull();
    });

    it('Применяется корректный статус для caption', () => {
      renderComponent({ caption: 'Caption', status: 'alert' });
      expect(getCaption()).toHaveClass(cnText({ view: 'alert' }));
    });
  });
});
