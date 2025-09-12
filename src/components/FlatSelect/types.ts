import { IconComponent } from '@consta/icons/Icon';
import React from 'react';

import { FieldPropSize, FieldPropView } from '##/components/FieldComponents';
import { Direction } from '##/components/Popover';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

export type RenderItemProps<ITEM> = {
  item: ITEM;
  active: boolean;
  hovered: boolean;
  onClick: (e: React.MouseEvent) => void;
  onMouseEnter: (e: React.MouseEvent) => void;
  ref: React.Ref<HTMLDivElement>;
};

export type FlatSelectItemDefault = {
  label: string;
  id: string | number;
  groupId?: string | number;
  disabled?: boolean;
};

export type FlatSelectGroupDefault = {
  label: string;
  id: string | number;
};

export type FlatSelectPropGetItemLabel<ITEM> = (item: ITEM) => string;
export type FlatSelectPropGetItemKey<ITEM> = (item: ITEM) => string | number;
export type FlatSelectPropGetItemGroupKey<ITEM> = (
  item: ITEM,
) => string | number | undefined;
export type FlatSelectPropGetItemDisabled<ITEM> = (
  item: ITEM,
) => boolean | undefined;
export type FlatSelectPropGetGroupKey<GROUP> = (
  group: GROUP,
) => string | number;
export type FlatSelectPropGetGroupLabel<GROUP> = (group: GROUP) => string;

export type FlatSelectPropOnChange<ITEM, MULTIPLE extends boolean> = (
  value: (MULTIPLE extends true ? ITEM[] : ITEM) | null,
  props: {
    e: React.SyntheticEvent;
  },
) => void;
export type FlatSelectPropValue<ITEM, MULTIPLE extends boolean> =
  | (MULTIPLE extends true ? ITEM[] : ITEM)
  | null
  | undefined;

export type FlatSelectPropRenderItem<ITEM> = (
  props: RenderItemProps<ITEM>,
) => React.ReactNode | null;

export type FlatSelectPropRenderValue<ITEM, MULTIPLE> = MULTIPLE extends true
  ? (props: {
      value: ITEM[];
      getRemove: (
        item: ITEM,
      ) => (e: React.SyntheticEvent<Element, Event>) => void;
    }) => React.ReactNode | null
  : (props: { value: ITEM }) => React.ReactNode | null;

export type FlatSelectPropOnCreate = (
  label: string,
  props: { e: React.SyntheticEvent },
) => void;

export type FlatSelectAllItem = {
  groupKey: string | number;
  __optionSelectAll: true;
};

export type Group<ITEM, GROUP> = {
  items: ITEM[];
  key: string | number;
  group?: GROUP;
};

export type CountedGroup<ITEM, GROUP> = Omit<Group<ITEM, GROUP>, 'items'> & {
  items: Array<FlatSelectAllItem | ITEM>;
};

/**
 * @property {ITEM[]} items - Массив элементов, отображаемых в списке выбора.
 * @property {(value: (MULTIPLE extends true ? ITEM[] : ITEM) | null, props: { e: React.SyntheticEvent }) => void} onChange - Функция обратного вызова, срабатывающая при изменении выбора.
 * @property {boolean} [disabled] - Указывает, отключен ли компонент.
 * @property {'default' | 'brick' | 'round'} [form] - Вариант стиля компонента ('default', 'brick' или 'round').
 * @property {string} [placeholder] - Текст-заполнитель для поля ввода.
 * @property {FieldPropSize} [size] - Размер компонента.
 * @property {boolean} [isLoading] - Указывает, находится ли компонент в состоянии загрузки.
 * @property {React.Ref<HTMLDivElement>} [listRef] - Ref для контейнера выпадающего списка.
 * @property {(props: RenderItemProps<ITEM>) => React.ReactNode | null} [renderItem] - Пользовательская функция отрисовки элементов.
 * @property {React.FocusEventHandler<HTMLInputElement>} [onInputFocus] - Функция обратного вызова, срабатывающая при фокусе на поле ввода.
 * @property {React.FocusEventHandler<HTMLInputElement>} [onInputBlur] - Функция обратного вызова, срабатывающая при потере фокуса поля ввода.
 * @property {(label: string, props: { e: React.SyntheticEvent }) => void} [onCreate] - Функция обратного вызова, срабатывающая при создании нового элемента.
 * @property {React.Ref<HTMLInputElement>} [inputRef] - Ref для поля ввода.
 * @property {boolean} [input] - Указывает, включено ли поле ввода.
 * @property {string} [inputValue] - Контролируемое значение поля ввода.
 * @property {string} [inputDefaultValue] - Значение поля ввода по умолчанию.
 * @property {(value: string) => void} [onInput] - Функция обратного вызова, срабатывающая при изменении значения ввода.
 * @property {((label: string | undefined) => React.ReactNode) | React.ReactNode} [labelForCreate] - Метка или функция отрисовки для опции создания.
 * @property {string} [labelForEmptyItems] - Метка, отображаемая, когда нет элементов.
 * @property {MULTIPLE} [multiple] - Указывает, включен ли множественный выбор.
 * @property {FlatSelectPropValue<ITEM, MULTIPLE>} [value] - Текущее выбранное значение(я).
 * @property {GROUP[]} [groups] - Массив групп для элементов.
 * @property {(item: ITEM) => string} [getItemLabel] - Функция для получения метки элемента.
 * @property {(item: ITEM) => string | number} [getItemKey] - Функция для получения уникального ключа элемента.
 * @property {(item: ITEM) => string | number | undefined} [getItemGroupKey] - Функция для получения ключа группы элемента.
 * @property {(item: ITEM) => boolean | undefined} [getItemDisabled] - Функция для проверки, отключен ли элемент.
 * @property {(group: GROUP) => string} [getGroupLabel] - Функция для получения метки группы.
 * @property {(group: GROUP) => string | number} [getGroupKey] - Функция для получения уникального ключа группы.
 * @property {boolean} [virtualScroll] - Указывает, включена ли виртуальная прокрутка.
 * @property {(length: number) => void} [onScrollToBottom] - Функция обратного вызова, срабатывающая при прокрутке до конца списка.
 * @property {(isOpen: boolean) => void} [onOpen] - Функция обратного вызова, срабатывающая при открытии или закрытии выпадающего списка.
 * @property {boolean} [open] - Контролирует состояние открытия выпадающего списка.
 * @property {string} [listClassName] - Дополнительный CSS-класс для выпадающего списка.
 * @property {ReadonlyArray<React.RefObject<HTMLElement>>} [ignoreOutsideClicksRefs] - Массив рефов, игнорируемых при определении кликов вне области.
 * @property {boolean} [clearButton] - Указывает, включена ли кнопка очистки.
 * @property {IconComponent} [iconClear] - Компонент иконки для кнопки очистки.
 * @property {IconComponent} [iconLeft] - Компонент иконки, отображаемой слева от поля ввода.
 * @property {MULTIPLE extends true ? boolean : never} [selectAll] - Указывает, включена ли опция "выбрать все" (доступна только при множественном выборе).
 * @property {string} [selectAllLabel] - Метка для опции "выбрать все".
 * @property {React.ReactNode} footer - Содержимое футера выпадающего списка.
 * @property {FieldPropView} [view] - Стиль отображения компонента.
 * @property {boolean} [bordered] - Указывает, есть ли у компонента граница.
 * @property {React.RefObject<HTMLElement>} [anchorRef] - Ref для элемента-якоря, используемого для позиционирования выпадающего списка.
 * @property {Direction} [direction] - Предпочтительное направление для выпадающего списка.
 * @property {Direction} [spareDirection] - Резервное направление для выпадающего списка.
 * @property {Direction[]} [possibleDirections] - Массив возможных направлений для выпадающего списка.
 */

export type FlatSelectPropsInit<
  ITEM = FlatSelectItemDefault,
  GROUP = FlatSelectGroupDefault,
  MULTIPLE extends boolean = false,
> = PropsWithHTMLAttributesAndRef<
  {
    items: ITEM[];
    onChange: FlatSelectPropOnChange<ITEM, MULTIPLE>;
    disabled?: boolean;
    form?: 'default' | 'brick' | 'round';
    placeholder?: string;
    size?: FieldPropSize;
    isLoading?: boolean;
    listRef?: React.Ref<HTMLDivElement>;
    renderItem?: FlatSelectPropRenderItem<ITEM>;
    onInputFocus?: React.FocusEventHandler<HTMLInputElement>;
    onInputBlur?: React.FocusEventHandler<HTMLInputElement>;
    onCreate?: FlatSelectPropOnCreate;
    inputRef?: React.Ref<HTMLInputElement>;
    input?: boolean;
    inputValue?: string;
    inputDefaultValue?: string;
    onInput?: (value: string) => void;
    labelForCreate?:
      | ((label: string | undefined) => React.ReactNode)
      | React.ReactNode;
    labelForEmptyItems?: string;
    multiple?: MULTIPLE;
    value?: FlatSelectPropValue<ITEM, MULTIPLE>;
    groups?: GROUP[];
    getItemLabel?: FlatSelectPropGetItemLabel<ITEM>;
    getItemKey?: FlatSelectPropGetItemKey<ITEM>;
    getItemGroupKey?: FlatSelectPropGetItemGroupKey<ITEM>;
    getItemDisabled?: FlatSelectPropGetItemDisabled<ITEM>;
    getGroupLabel?: FlatSelectPropGetGroupLabel<GROUP>;
    getGroupKey?: FlatSelectPropGetGroupKey<GROUP>;
    virtualScroll?: boolean;
    onScrollToBottom?: (length: number) => void;
    onOpen?: (isOpen: boolean) => void;
    open?: boolean;
    listClassName?: string;
    ignoreOutsideClicksRefs?: ReadonlyArray<React.RefObject<HTMLElement>>;
    clearButton?: boolean;
    iconClear?: IconComponent;
    iconLeft?: IconComponent;
    selectAll?: MULTIPLE extends true ? boolean : never;
    selectAllLabel?: string;
    footer?: React.ReactNode;
    view?: FieldPropView;
    bordered?: boolean;
    anchorRef?: React.RefObject<HTMLElement>;
    direction?: Direction;
    spareDirection?: Direction;
    possibleDirections?: Direction[];
  },
  HTMLDivElement
>;

/**
 * Props for the FlatSelect component.
 *
 * This type defines the props for the FlatSelect component, which is a customizable select component.
 * It allows for single or multiple selection, and supports grouping of items.
 * The component can be customized by providing custom item and group types.
 *
 * @template ITEM The type of the items in the select. Defaults to FlatSelectItemDefault.
 * @template GROUP The type of the groups in the select. Defaults to FlatSelectGroupDefault.
 * @template MULTIPLE Whether the select allows multiple selection. Defaults to false.
 */
export type FlatSelectProps<
  ITEM = FlatSelectItemDefault,
  GROUP = FlatSelectGroupDefault,
  MULTIPLE extends boolean = false,
> = FlatSelectPropsInit<ITEM, GROUP, MULTIPLE> &
  (ITEM extends { label: FlatSelectItemDefault['label'] }
    ? {}
    : { getItemLabel: FlatSelectPropGetItemLabel<ITEM> }) &
  (ITEM extends { id: FlatSelectItemDefault['id'] }
    ? {}
    : { getItemKey: FlatSelectPropGetItemKey<ITEM> }) &
  (GROUP extends { label: FlatSelectGroupDefault['label'] }
    ? {}
    : { getGroupLabel: FlatSelectPropGetGroupLabel<GROUP> }) &
  (GROUP extends { id: FlatSelectGroupDefault['id'] }
    ? {}
    : { getGroupKey: FlatSelectPropGetGroupKey<GROUP> });

export type FlatSelectComponent = <
  ITEM = FlatSelectItemDefault,
  GROUP = FlatSelectGroupDefault,
  MULTIPLE extends boolean = false,
>(
  props: FlatSelectProps<ITEM, GROUP, MULTIPLE>,
) => React.ReactNode | null;
