import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import {
  createRoot,
  TestContext,
  testPopoverId,
  testRootId,
} from '##/utils/vitest';

import { cnLoader } from '../../LoaderDeprecated/LoaderDeprecated';
import { cnSelectCreateButton } from '../SelectCreateButton/SelectCreateButton';
import {
  SelectDropdown,
  selectDropdownForm,
} from '../SelectDropdown/SelectDropdown';

createRoot();
clearStack();
const testId = 'select-dropdown';

type Props = React.ComponentProps<typeof SelectDropdown>;

const defaultProps: Props = {
  size: 's',
  controlRef: { current: null },
  dropdownRef: { current: null },
  form: 'default',
  isOpen: true,
  renderItem: () => <div>Element</div>,
  visibleItems: [],
  getOptionProps: vi.fn(),
};

const renderComponent = (ctx: TestContext, props: Partial<Props>) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <SelectDropdown
            {...defaultProps}
            {...props}
            data-testid={testId}
            container={document.getElementById(testPopoverId(ctx))!}
          />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testPopoverId(ctx)} *[data-testid=${testId}]`,
  ) as Element | null;

const getSelectCreateButton = (ctx: TestContext) =>
  getRender(ctx)?.querySelector(`.${cnSelectCreateButton()}`) as Element | null;

const getIsLoader = (ctx: TestContext) =>
  getRender(ctx)?.querySelector(`.${cnLoader()}`) as Element | null;

describe.concurrent('Компонент SelectDropdown', () => {
  describe.concurrent('должен рендериться без ошибок', () => {
    selectDropdownForm.forEach((form) => {
      test(`для form = ${form}`, (ctx) =>
        context.start(async () => {
          expect(() => renderComponent(ctx, { form })).not.toThrow();
        }));
    });
  });

  describe.concurrent('проверка props', () => {
    test('проверка isLoading', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { isLoading: true });

        expect(getIsLoader(ctx)).toBeInTheDocument();
      }));
  });

  test('отображает OptionForCreate', (ctx) =>
    context.start(async () => {
      const label = 'Option for create';
      const visibleItems = [
        {
          label,
          __optionForCreate: true,
        },
      ];
      renderComponent(ctx, { visibleItems });

      expect(getSelectCreateButton(ctx)).toBeInTheDocument();
      expect(getRender(ctx)).toHaveTextContent(label);
    }));
});
