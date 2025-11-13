import { render, screen } from '@testing-library/react';
import React from 'react';

import { Picture } from '../Picture';
import { PictureProps, PicturePropSrc } from '../types';

const testId = 'Picture';

const getRender = () => screen.queryByTestId(testId);

const renderComponent = (props: PictureProps) => {
  return render(<Picture {...props} data-testid={testId} />);
};

describe('Компонент Picture', () => {
  it('должен рендериться без ошибок', () => {
    renderComponent({ src: 'https://example.com/image.jpg' });
    expect(getRender()).toBeInTheDocument();
  });

  describe('проверка src', () => {
    it('должен не рендериться если src пустой', () => {
      const src = '';
      renderComponent({ src });

      const img = getRender();
      expect(img).not.toBeInTheDocument();
    });

    it('присваивает src изображению', () => {
      const src = 'https://example.com/image.jpg';
      renderComponent({ src });

      const img = getRender();
      expect(img).toHaveAttribute('src', src);
    });

    it('рендерит изображение из объекта с несколькими ключами', () => {
      const src: PicturePropSrc = {
        'gpnDefault--0--1x': 'https://example.com/image-1x.jpg',
        'gpnDefault--0--2x': 'https://example.com/image-2x.jpg',
      };
      renderComponent({ src });

      const expectedSrcSet =
        'https://example.com/image-1x.jpg 1x,https://example.com/image-2x.jpg 2x';

      const img = getRender();
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', src['gpnDefault--0--1x']);
      expect(img).toHaveAttribute('srcSet', expectedSrcSet);
    });
  });

  it('присваивает alt изображению', () => {
    const alt = 'Описание изображения';
    renderComponent({ src: 'https://example.com/image.jpg', alt });

    const img = getRender();
    expect(img).toHaveAttribute('alt', alt);
  });

  it('присваивает дополнительный className', () => {
    const className = 'custom-class';
    renderComponent({ src: 'https://example.com/image.jpg', className });

    expect(getRender()).toHaveClass(className);
  });

  it('присваивает ref', () => {
    const ref = React.createRef<HTMLImageElement>();
    renderComponent({
      src: 'https://example.com/image.jpg',
      ref,
    });

    expect(ref.current).toBe(getRender());
  });
});
