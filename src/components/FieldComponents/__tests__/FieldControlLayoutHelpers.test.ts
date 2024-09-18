import {
  fieldPropDisabled,
  fieldPropFocused,
  fieldPropForm,
  fieldPropHovered,
  fieldPropStatus,
  fieldPropView,
} from '../__mocks__/variants';
import {
  getBgColor,
  getBorderColor,
  getBorderRadius,
  getBorderStyle,
  getPadding,
  getSlots,
} from '../FieldControlLayout/helpers';

const getBorderStyleResultMap = {
  'default-clear': 'none',
  'default-default': 'solid solid solid solid',
  'defaultClear-clear': 'none',
  'defaultClear-default': 'solid none solid solid',
  'defaultBrick-clear': 'none',
  'defaultBrick-default': 'solid solid solid solid',
  'brick-clear': 'none',
  'brick-default': 'solid solid solid solid',
  'brickDefault-clear': 'none',
  'brickDefault-default': 'solid solid solid solid',
  'brickClear-clear': 'none',
  'brickClear-default': 'solid none solid solid',
  'brickRound-clear': 'none',
  'brickRound-default': 'solid solid solid solid',
  'round-clear': 'none',
  'round-default': 'solid solid solid solid',
  'roundClear-clear': 'none',
  'roundClear-default': 'solid none solid solid',
  'roundBrick-clear': 'none',
  'roundBrick-default': 'solid solid solid solid',
  'clearRound-clear': 'none',
  'clearRound-default': 'solid solid solid none',
  'clearDefault-clear': 'none',
  'clearDefault-default': 'solid solid solid none',
  'clearBrick-clear': 'none',
  'clearBrick-default': 'solid solid solid none',
  'clear-clear': 'none',
  'clear-default': 'solid none solid none',
};

const getPaddingResultMap = {
  'default-clear': '1px 0px 1px 0px',
  'default-default':
    '0px var(--field-control-layout-space) 0px var(--field-control-layout-space)',
  'defaultClear-clear': '1px 0px 1px 0px',
  'defaultClear-default':
    '0px var(--field-control-layout-space) 0px var(--field-control-layout-space)',
  'defaultBrick-clear': '1px 0px 1px 0px',
  'defaultBrick-default':
    '0px var(--field-control-layout-space) 0px var(--field-control-layout-space)',
  'brick-clear': '1px 0px 1px 0px',
  'brick-default':
    '0px var(--field-control-layout-space) 0px var(--field-control-layout-space)',
  'brickDefault-clear': '1px 0px 1px 0px',
  'brickDefault-default':
    '0px var(--field-control-layout-space) 0px var(--field-control-layout-space)',
  'brickClear-clear': '1px 0px 1px 0px',
  'brickClear-default':
    '0px var(--field-control-layout-space) 0px var(--field-control-layout-space)',
  'brickRound-clear': '1px 0px 1px 0px',
  'brickRound-default':
    '0px calc(var(--field-control-layout-space) * 1.6) 0px var(--field-control-layout-space)',
  'round-clear': '1px 0px 1px 0px',
  'round-default':
    '0px calc(var(--field-control-layout-space) * 1.6) 0px calc(var(--field-control-layout-space) * 1.6)',
  'roundClear-clear': '1px 0px 1px 0px',
  'roundClear-default':
    '0px var(--field-control-layout-space) 0px calc(var(--field-control-layout-space) * 1.6)',
  'roundBrick-clear': '1px 0px 1px 0px',
  'roundBrick-default':
    '0px var(--field-control-layout-space) 0px calc(var(--field-control-layout-space) * 1.6)',
  'clearRound-clear': '1px 0px 1px 0px',
  'clearRound-default':
    '0px calc(var(--field-control-layout-space) * 1.6) 0px var(--field-control-layout-space)',
  'clearDefault-clear': '1px 0px 1px 0px',
  'clearDefault-default':
    '0px var(--field-control-layout-space) 0px var(--field-control-layout-space)',
  'clearBrick-clear': '1px 0px 1px 0px',
  'clearBrick-default':
    '0px var(--field-control-layout-space) 0px var(--field-control-layout-space)',
  'clear-clear': '1px 0px 1px 0px',
  'clear-default':
    '0px var(--field-control-layout-space) 0px var(--field-control-layout-space)',
};

const getBorderRadiusResultMap = {
  'default-clear': '0px 0px 0px 0px',
  'default-default':
    'var(--control-radius) var(--control-radius) var(--control-radius) var(--control-radius)',
  'defaultClear-clear': '0px 0px 0px 0px',
  'defaultClear-default': 'var(--control-radius) 0px 0px var(--control-radius)',
  'defaultBrick-clear': '0px 0px 0px 0px',
  'defaultBrick-default': 'var(--control-radius) 0px 0px var(--control-radius)',
  'brick-clear': '0px 0px 0px 0px',
  'brick-default': '0px 0px 0px 0px',
  'brickDefault-clear': '0px 0px 0px 0px',
  'brickDefault-default': '0px var(--control-radius) var(--control-radius) 0px',
  'brickClear-clear': '0px 0px 0px 0px',
  'brickClear-default': '0px 0px 0px 0px',
  'brickRound-clear': '0px 0px 0px 0px',
  'brickRound-default':
    '0px calc(var(--field-control-layout-height) / 2) calc(var(--field-control-layout-height) / 2) 0px',
  'round-clear': '0px 0px 0px 0px',
  'round-default':
    'calc(var(--field-control-layout-height) / 2) calc(var(--field-control-layout-height) / 2) calc(var(--field-control-layout-height) / 2) calc(var(--field-control-layout-height) / 2)',
  'roundClear-clear': '0px 0px 0px 0px',
  'roundClear-default':
    'calc(var(--field-control-layout-height) / 2) 0px 0px calc(var(--field-control-layout-height) / 2)',
  'roundBrick-clear': '0px 0px 0px 0px',
  'roundBrick-default':
    'calc(var(--field-control-layout-height) / 2) 0px 0px calc(var(--field-control-layout-height) / 2)',
  'clearRound-clear': '0px 0px 0px 0px',
  'clearRound-default':
    '0px calc(var(--field-control-layout-height) / 2) calc(var(--field-control-layout-height) / 2) 0px',
  'clearDefault-clear': '0px 0px 0px 0px',
  'clearDefault-default': '0px var(--control-radius) var(--control-radius) 0px',
  'clearBrick-clear': '0px 0px 0px 0px',
  'clearBrick-default': '0px 0px 0px 0px',
  'clear-clear': '0px 0px 0px 0px',
  'clear-default': '0px 0px 0px 0px',
};

const getBorderColorResultMap = {
  'true-true-alert-true': 'transparent',
  'true-true-success-true': 'transparent',
  'true-true-warning-true': 'transparent',
  'true-true-alert-false': 'var(--color-control-bg-border-focus)',
  'true-true-success-false': 'var(--color-control-bg-border-focus)',
  'true-true-warning-false': 'var(--color-control-bg-border-focus)',
  'true-false-alert-true': 'transparent',
  'true-false-success-true': 'transparent',
  'true-false-warning-true': 'transparent',
  'true-false-alert-false': 'var(--color-control-bg-border-focus)',
  'true-false-success-false': 'var(--color-control-bg-border-focus)',
  'true-false-warning-false': 'var(--color-control-bg-border-focus)',
  'false-true-alert-true': 'transparent',
  'false-true-success-true': 'transparent',
  'false-true-warning-true': 'transparent',
  'false-true-alert-false': 'var(--color-control-bg-border-default-hover)',
  'false-true-success-false': 'var(--color-control-bg-border-default-hover)',
  'false-true-warning-false': 'var(--color-control-bg-border-default-hover)',
  'false-false-alert-true': 'transparent',
  'false-false-success-true': 'transparent',
  'false-false-warning-true': 'transparent',
  'false-false-alert-false': 'var(--color-bg-alert)',
  'false-false-success-false': 'var(--color-bg-success)',
  'false-false-warning-false': 'var(--color-bg-warning)',
};

const getBgColorResultMap = {
  'clear-true': undefined,
  'clear-false': undefined,
  'default-true': 'var(--color-control-bg-disable)',
  'default-false': 'var(--color-bg-default)',
};

const getSlotsResultMap = [['1'], [0], ['0'], [], [], ['1', '1', 0, '0']];

describe('FieldControlLayout helpers getBorderStyle', () => {
  fieldPropForm.forEach((from) => {
    fieldPropView.forEach((view) => {
      it(`form = ${from}; view = ${view};`, () => {
        const result = getBorderStyle(from, view);
        expect(result).toEqual(getBorderStyleResultMap[`${from}-${view}`]);
      });
    });
  });
});

describe('FieldControlLayout helpers getPadding', () => {
  fieldPropForm.forEach((from) => {
    fieldPropView.forEach((view) => {
      it(`form = ${from}; view = ${view};`, () => {
        const result = getPadding(from, view);
        expect(result).toEqual(getPaddingResultMap[`${from}-${view}`]);
      });
    });
  });
});

describe('FieldControlLayout helpers getBorderRadius', () => {
  fieldPropForm.forEach((from) => {
    fieldPropView.forEach((view) => {
      it(`form = ${from}; view = ${view};`, () => {
        const result = getBorderRadius(from, view);
        expect(result).toEqual(getBorderRadiusResultMap[`${from}-${view}`]);
      });
    });
  });
});

describe('FieldControlLayout helpers getBorderColor', () => {
  fieldPropFocused.forEach((focused) => {
    fieldPropHovered.forEach((hovered) => {
      fieldPropDisabled.forEach((disabled) => {
        fieldPropStatus.forEach((status) => {
          it(`focused = ${focused}; hovered = ${hovered}; status = ${status}; disabled = ${disabled};`, () => {
            const result = getBorderColor(focused, hovered, status, disabled);
            expect(result).toEqual(
              getBorderColorResultMap[
                `${focused}-${hovered}-${status}-${disabled}`
              ],
            );
          });
        });
      });
    });
  });
});

describe('FieldControlLayout helpers getBgColor', () => {
  fieldPropView.forEach((view) => {
    fieldPropDisabled.forEach((disabled) => {
      it(`view = ${view}; disabled = ${disabled};`, () => {
        const result = getBgColor(view, disabled);
        expect(result).toEqual(getBgColorResultMap[`${view}-${disabled}`]);
      });
    });
  });
});

describe('FieldControlLayout helpers getSlots', () => {
  ['1', 0, '0', null, false, ['1', null, false, '1', 0, '0']].forEach(
    (side, index) => {
      it(`side = ${side}`, () => {
        const result = getSlots(side);
        expect(result).toEqual(getSlotsResultMap[index]);
      });
    },
  );
});
