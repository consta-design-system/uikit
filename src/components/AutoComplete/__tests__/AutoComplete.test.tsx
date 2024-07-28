import { act, fireEvent, render, screen } from '@testing-library/react';
import React, { useState } from 'react';
import { config } from 'react-transition-group';

import { AutoComplete } from '../AutoComplete';
import { AutoCompleteItemDefault, AutoCompleteProps } from '../types';

const testId = 'auto-complete-test-id';

const items: AutoCompleteItemDefault[] = [
  { id: 'one', label: 'Один' },
  { id: 'two', label: 'одиннадцать' },
];

type WithPartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

const TestComponent = ({
  value: initialValue,
  ...rest
}: WithPartial<AutoCompleteProps<'text'>, 'items' | 'onChange'>) => {
  const [value, setValue] = useState<string | null | undefined>(initialValue);

  return (
    <AutoComplete
      data-testid={testId}
      items={items}
      value={value}
      onChange={setValue}
      {...rest}
    />
  );
};

function renderComponent(
  props?: WithPartial<AutoCompleteProps<'text'>, 'items'>,
) {
  const result = render(<TestComponent {...props} />);
  const rerender = (props?: WithPartial<AutoCompleteProps<'text'>, 'items'>) =>
    result.rerender(<TestComponent {...props} />);
  return { ...result, rerender };
}

describe('AutoComplete', () => {
  beforeAll(() => {
    config.disabled = true;
  });

  test('Рендерится без ошибок', () => {
    renderComponent();

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  test('При наличие значения по умолчанию, dropdown скрыт', () => {
    renderComponent({ value: items[0].label });

    const dropdown = screen.queryByRole('listbox');

    expect(dropdown).not.toBeInTheDocument();
  });

  test('При выборе элемента из списка, dropdown скрывается', () => {
    renderComponent({ value: 'о' });
    expect(screen.queryByRole('listbox')).toBeInTheDocument();

    const firstVariant = screen.getByText('Один');
    act(() => {
      fireEvent.click(firstVariant);
    });

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
