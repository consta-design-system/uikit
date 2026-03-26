import { clearStack, context, sleep, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { animateTimeout } from '##/mixs/MixPopoverAnimate';
import {
  createRoot,
  TestContext,
  testPopoverId,
  testRootId,
} from '##/utils/vitest';

import { dateTimePropView } from '../../DateTime/helpers';
import { DatePicker, datePickerPropType } from '../DatePicker';
import {
  getAdditionalControls,
  getDropdown,
  getRender,
  inputFocus,
  outsideClick,
  testId,
} from './helpers';

createRoot();
clearStack();

type DateTimeProps = React.ComponentProps<typeof DatePicker>;

const renderComponent = (ctx: TestContext, props: DateTimeProps = {}) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <DatePicker
            {...props}
            data-testid={testId}
            dropdownContainer={document.getElementById(testPopoverId(ctx))!}
          />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

describe.concurrent('Компонент DatePicker', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      const render = () => renderComponent(ctx);

      expect(render).not.toThrow();
    }));

  datePickerPropType.forEach((type) => {
    dateTimePropView.forEach((dateTimeView) => {
      test(`должен рендериться без ошибок при type="${type}" dateTimeView="${dateTimeView}"`, (ctx) =>
        context.start(async () => {
          const render = () => renderComponent(ctx, { type, dateTimeView });

          expect(render).not.toThrow();
        }));
    });
  });

  datePickerPropType.forEach((type) => {
    dateTimePropView.forEach((dateTimeView) => {
      test(`className присваивается при type="${type}" dateTimeView="${dateTimeView}"`, (ctx) =>
        context.start(async () => {
          const className = 'className';

          renderComponent(ctx, { className });

          expect(getRender(ctx)).toHaveClass(className);
        }));
    });
  });

  datePickerPropType.forEach((type) => {
    dateTimePropView.forEach((dateTimeView) => {
      test(`dropDown открывается и закрывается при type="${type}" dateTimeView="${dateTimeView}"`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx);

          inputFocus(ctx);

          await wrap(sleep(animateTimeout));
          expect(getDropdown(ctx)).toBeInTheDocument();

          outsideClick(ctx);

          await wrap(sleep(animateTimeout));
          expect(getDropdown(ctx)).not.toBeInTheDocument();
        }));
    });
  });

  const content = 'renderAdditionalControls';

  const renderAdditionalControls = {
    node: <div>{content}</div>,
    function: () => <div>{content}</div>,
  };

  Object.keys(renderAdditionalControls).forEach((renderType) => {
    datePickerPropType.forEach((type) => {
      dateTimePropView.forEach((view) => {
        test(`проверка renderAdditionalControls, рендер при type="${type}" view="${view}" renderAdditionalControlsType="${renderType}"`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, {
              renderAdditionalControls:
                renderAdditionalControls[
                  renderType as keyof typeof renderAdditionalControls
                ],
            });

            inputFocus(ctx);

            await wrap(sleep(animateTimeout));

            expect(getAdditionalControls(ctx)).toHaveTextContent(content);
          }));
      });
    });
  });
});
