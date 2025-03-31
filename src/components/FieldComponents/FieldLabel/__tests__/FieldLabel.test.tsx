import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { IconMock, iconMockText } from '##/../__mocks__/IconMock';
import { iconSpaceMap } from '##/components/FieldComponents/FieldLabel/helpers';
import { cnText } from '##/components/Text';
import { cnMixSpace } from '##/mixs/MixSpace';
import { setRef } from '##/utils/setRef';

import { cnFieldLabel, FieldLabel } from '..';

type FieldCaptionProps = React.ComponentProps<typeof FieldLabel>;

const testId = 'FieldLabel';

const renderComponent = (props: FieldCaptionProps = {}) => {
  return render(<FieldLabel data-testid={testId} {...props} />);
};

const getRender = () => screen.getByTestId(testId);
const getStar = () => getRender().querySelector(`.${cnFieldLabel('Star')}`);
const getIcon = () => getRender().querySelector(`.${iconMockText}`);

describe(`Компонент ${testId}`, () => {
  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });
  describe('проверка ref', () => {
    it(`ref присвоен`, () => {
      const ref = { current: null };

      renderComponent({
        ref: (el: HTMLElement) => setRef(ref, el),
      });

      expect(ref.current).toBeTruthy();
    });
  });

  describe('проверка className', () => {
    it(`Присваивается дополнительный className`, () => {
      const className = 'className';

      renderComponent({ className });
      expect(getRender()).toHaveClass(className);
    });
  });
  describe('проверка required', () => {
    it(`Отображается элемент ${cnFieldLabel('Star')}`, () => {
      renderComponent({ required: true });
      expect(getStar()).not.toBeNull();
    });
  });
  describe('проверка children', () => {
    it(`Отображается children`, () => {
      const children = 'children';

      renderComponent({ children });

      expect(getRender()).toHaveTextContent(children);
    });
  });
  describe('проверка icon', () => {
    it(`Отображается icon`, () => {
      renderComponent({
        icon: IconMock,
      });
      expect(getIcon()).toHaveTextContent(iconMockText);
    });
  });
  describe('проверка iconRef', () => {
    it(`iconRef присвоен`, () => {
      const ref = { current: null };
      renderComponent({
        icon: IconMock,
        iconRef: (el: HTMLElement) => setRef(ref, el),
      });
      expect(ref.current).toBeTruthy();
    });
  });
  describe('проверка size', () => {
    const sizes = ['s', 'm', 'l', 'xs'] as const;
    sizes.forEach((size) => {
      it(`Должен рендериться как ${cnText({
        size,
      })}`, () => {
        renderComponent({ size });

        expect(getRender()).toHaveClass(cnText({ size }));
      });
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
  describe('проверка other props', () => {
    const props = ['data-attr', 'role', 'id'] as const;

    props.forEach((prop) => {
      it(`присваивается  ${prop}=${prop}`, () => {
        renderComponent({ [prop]: prop });

        expect(getRender()).toHaveAttribute(prop, prop);
      });
    });
  });

  describe('проверка lineHeight', () => {
    it('Присваивается lineHeight="m"', () => {
      renderComponent();
      expect(getRender()).toHaveClass(cnText({ lineHeight: 'm' }));
    });
  });

  describe('проверка view', () => {
    it('Присваивается view="secondary"', () => {
      renderComponent();
      expect(getRender()).toHaveClass(cnText({ view: 'secondary' }));
    });
  });

  describe('проверка icon size', () => {
    const sizes = ['xs', 's', 'm', 'l'] as const;
    sizes.forEach((size) => {
      it(`Иконка имеет корректный отступ для size=${size}`, () => {
        renderComponent({ size, icon: IconMock });
        expect(getIcon()).toHaveClass(cnMixSpace({ mL: iconSpaceMap[size] }));
      });
    });
  });

  describe('проверка required', () => {
    it('Элемент * отображается, если required=true', () => {
      renderComponent({ required: true });
      expect(getStar()).toBeInTheDocument();
    });

    it('Элемент * не отображается, если required=false', () => {
      renderComponent({ required: false });
      expect(getStar()).toBeNull();
    });
  });
});
