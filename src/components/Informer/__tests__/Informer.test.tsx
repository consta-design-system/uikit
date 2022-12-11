import { IconLeaf } from '@consta/icons/IconLeaf';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { cnInformer, Informer, informerPropView } from '../Informer';

type InformerProps = React.ComponentProps<typeof Informer>;

const testId = cnInformer();

const renderComponent = (props: InformerProps = {}) => {
  return render(<Informer data-testid={testId} {...props} />);
};

function getRender() {
  return screen.getByTestId(testId);
}

function getIcon() {
  return getRender().querySelector(`.${cnInformer('Icon')}`);
}

describe('Компонент Informer', () => {
  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });
  describe('проверка props', () => {
    describe('проверка label', () => {
      it(`label отображается`, () => {
        const label = 'Label';

        renderComponent({ label });

        expect(getRender().textContent).toEqual(label);
      });
    });
    describe('проверка Title', () => {
      it(`Title отображается`, () => {
        const title = 'Title';

        renderComponent({ title });

        expect(getRender().textContent).toEqual(title);
      });
    });
    describe('проверка icon', () => {
      it(`иконка отображается`, () => {
        renderComponent({ icon: IconLeaf });

        expect(getIcon()).toHaveClass('IconLeaf');
      });
      it(`присвоился модификатор withIcon`, () => {
        renderComponent({ icon: IconLeaf });

        expect(getRender()).toHaveClass(cnInformer({ withIcon: true }));
      });
    });
    describe('проверка view', () => {
      informerPropView.forEach((view) => {
        it(`присваивает класс для view=${view}`, () => {
          renderComponent({ view });

          expect(getRender()).toHaveClass(cnInformer({ view }));
        });
      });
    });
  });
});
