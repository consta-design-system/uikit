import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';

import { cnButton } from '../../Button/Button';
import { cnUser } from '../../User/User';
import { cnHeaderLogin, HeaderLogin } from '../Login/HeaderLogin';

type HeaderLoginProps = React.ComponentProps<typeof HeaderLogin>;

const testId = cnHeaderLogin();

const renderComponent = (props: HeaderLoginProps) => {
  return render(<HeaderLogin data-testid={testId} {...props} />);
};

function getRender() {
  return screen.getByTestId(testId);
}

describe('Компонент HeaderLogin', () => {
  it('должен рендериться без ошибок', () => {
    expect(() => renderComponent({})).not.toThrow();
  });
  describe('проверка props', () => {
    describe('проверка className', () => {
      it(`Дополнительный className присваевается`, () => {
        const className = 'className';

        renderComponent({ className });
        expect(getRender()).toHaveClass(className);
      });
    });
    describe('проверка authorized', () => {
      it(`при authorized=true выводится компонент User`, () => {
        renderComponent({ authorized: true });
        expect(getRender()).toHaveClass(cnUser());
      });
      it(`при authorized=false выводится компонент Button`, () => {
        renderComponent({ authorized: false });
        expect(getRender()).toHaveClass(cnButton());
      });
    });
    describe('проверка onClick', () => {
      it(`onClick срабатывает`, () => {
        const handleClick = jest.fn();

        renderComponent({ onClick: handleClick });

        const element = getRender();

        fireEvent.click(element);

        expect(handleClick).toHaveBeenCalledTimes(1);
      });
    });
  });
});
