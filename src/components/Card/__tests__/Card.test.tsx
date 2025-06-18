import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from '@testing-library/react';
import * as React from 'react';

import { cnMixCard } from '##/mixs/MixCard/MixCard';
import { AsTags } from '##/utils/types/AsTags';
import { PropsWithAsAttributes } from '##/utils/types/PropsWithAsAttributes';

import { Card, CardProps } from '../Card';

const testId = 'Card';

const getRender = () => screen.getByTestId(testId);

type Render<Props, DefaultTag extends AsTags = 'div'> = <
  As extends AsTags = DefaultTag,
>(
  props: PropsWithAsAttributes<Props, As> & React.RefAttributes<Element>,
) => RenderResult;

const renderComponent: Render<CardProps> = (props) => {
  return render(<Card data-testid={testId} {...props} />);
};

const sizes = ['xs', 's', 'm', 'l', 'xl', '2xl', '3xl', '4xl', '5xl'] as const;
const statuses = ['alert', 'success', 'warning'] as const;
const forms = ['round', 'square'] as const;

describe('компонент Card', () => {
  it('должен рендериться без ошибок', () => {
    renderComponent({});
    expect(getRender()).toBeInTheDocument();
  });

  it('имеет корректный className', () => {
    renderComponent({});
    expect(getRender()).toHaveClass('Card');
  });

  it('должен рендериться с переданным children', () => {
    renderComponent({ children: 'Test children' });
    expect(getRender()).toHaveTextContent('Test children');
  });

  describe('проверка verticalSpace', () => {
    sizes.forEach((verticalSpace) => {
      it(`должен рендериться с классом ${cnMixCard({ verticalSpace })}`, () => {
        renderComponent({ verticalSpace });
        expect(getRender()).toHaveClass(cnMixCard({ verticalSpace }));
      });
    });
  });

  describe('проверка horizontalSpace', () => {
    sizes.forEach((horizontalSpace) => {
      it(`должен рендериться с классом ${cnMixCard({
        horizontalSpace,
      })}`, () => {
        renderComponent({ horizontalSpace });
        expect(getRender()).toHaveClass(cnMixCard({ horizontalSpace }));
      });
    });
  });

  describe('проверка status', () => {
    statuses.forEach((status) => {
      it(`должен рендериться с классом ${cnMixCard({ status })}`, () => {
        renderComponent({ status });
        expect(getRender()).toHaveClass(cnMixCard({ status }));
      });
    });
  });

  describe('проверка form', () => {
    forms.forEach((form) => {
      it(`должен рендериться с классом ${cnMixCard({ form })}`, () => {
        renderComponent({ form });
        expect(getRender()).toHaveClass(cnMixCard({ form }));
      });
    });
  });

  describe('проверка border', () => {
    it('должен рендериться с классом border', () => {
      renderComponent({ border: true });
      expect(getRender()).toHaveClass(cnMixCard({ border: true }));
    });
  });

  describe('проверка shadow', () => {
    it('должен рендериться с классом shadow', () => {
      renderComponent({ shadow: true });
      expect(getRender()).toHaveClass(cnMixCard({ shadow: true }));
    });
  });

  describe('проверка onClick', () => {
    it('должен вызываться колбэк onClick', () => {
      const onClick = jest.fn();
      renderComponent({ onClick });
      fireEvent.click(getRender());
      expect(onClick).toHaveBeenCalled();
    });
  });

  describe('проверка ref', () => {
    it('должен присваиваться ref', () => {
      const ref = React.createRef<HTMLDivElement>();
      renderComponent({ ref });
      expect(ref.current).toBe(getRender());
    });
  });

  describe('проверка className', () => {
    it('должен присваиваться className', () => {
      renderComponent({ className: 'test-class' });
      expect(getRender()).toHaveClass('test-class');
    });
  });

  describe('проверка style', () => {
    it('должен присваиваться style', () => {
      renderComponent({ style: { backgroundColor: 'red' } });
      expect(getRender()).toHaveStyle('background-color: red');
    });
  });

  describe('проверка as', () => {
    it('должен присваиваться as', () => {
      renderComponent({ as: 'div' });
      expect(getRender()).toBeInstanceOf(HTMLDivElement);
    });
  });
});
