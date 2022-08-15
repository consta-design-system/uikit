import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { cnTagBase } from '../../TagBase/TagBase';
import {
  cnSelectValueTag,
  SelectValueTag,
} from '../SelectValueTag/SelectValueTag';

type Props = React.ComponentProps<typeof SelectValueTag>;

const defaultProps: Props = {
  size: 's',
  label: 'Default label',
};

const renderComponent = (props: Partial<Props> = {}) => {
  return render(<SelectValueTag {...defaultProps} {...props} />);
};

const getTag = (base: HTMLElement) =>
  base.querySelector(`.${cnTagBase()}`) as Element;
const getTagCancelButton = (base: HTMLElement) =>
  getTag(base).querySelector(`.${cnTagBase('CancelButton')}`) as Element;

const clickCancelButton = (base: HTMLElement) => {
  fireEvent.click(getTagCancelButton(base));
};

describe('Компонент SelectValueTag', () => {
  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  describe('проверка props', () => {
    it('проверка label', () => {
      const label = 'Test label';
      const { container } = renderComponent({ label });
      expect(container).toHaveTextContent(label);
    });

    describe('проверка size', () => {
      (['s', 'm', 'l'] as const).forEach((size) => {
        it(`присваивает класс для size = ${size}`, () => {
          const { container } = renderComponent({ size });
          expect(getTag(container)).toHaveClass(cnSelectValueTag({ size }));
        });
      });
    });

    it('проверка handleRemove', () => {
      const handleRemove = jest.fn();
      const { container } = renderComponent({ handleRemove });

      clickCancelButton(container);

      expect(handleRemove).toBeCalled();
    });
  });
});
