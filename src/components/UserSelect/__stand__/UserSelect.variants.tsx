import './UserSelect.variants.css';

import React, { useState } from 'react';
import { useBoolean, useSelect, useText } from '@consta/stand';

import {
  groups,
  Item,
  items,
  myGroup,
  MyItem,
  myItems } from '../__mocks__/data.mock';
import { cn } from '../../../utils/bem';

import {
  defaultPropForm,
  defaultPropSize,
  defaultPropView,
  propForm,
  propStatus,
  propView,
} from '../../SelectComponents/types';
import { Text } from '../../Text/Text';
import { UserSelect } from '../UserSelect';

const Variants = () => {
  const example = useSelect('пример', ['обычный', 'с рендером'], 'обычный');
  const disabled = useBoolean('disabled', false);
  const size = useSelect('size', ['m', 's', 'l'], defaultPropSize);
  const view = useSelect('view', propView, defaultPropView);
  const form = useSelect('form', propForm, defaultPropForm);
  const status = useSelect('status', ['', ...propStatus], '');
  const caption = useText('caption', 'Подпись');
  const required = useBoolean('required', false);
  const label = useText('label', 'Заголовок');
  const labelPosition = useSelect('labelPosition', ['top', 'left'], 'top');
  const placeholder = useText('placeholder', 'Подсказка');
  const withGroups = useBoolean('withGroups', false);
  const isLoading = useBoolean('isLoading', false);

const cnUserSelectVariants = cn('UserSelectVariants');

  const [value, setValue] = useState<Item | null>(null);
  const [valueMultiple, setValueMultiple] = useState<Item[] | null>(null);

  const searchFunction = (item: MyItem, searchValue: string): boolean => {
    const searchOfName =
      item.name.toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase()) !== -1;

    if (searchOfName) {
      return searchOfName;
    }

    const searchOfEmail =
      item.email?.toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase()) !== -1;

    if (searchOfEmail) {
      return searchOfEmail;
    }

    return item.position?.toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase()) !== -1;
  };


  const multiple = useBoolean('multiple', false);

  if (example === 'обычный') {
  if (multiple) {
    return (
      <UserSelect
        className={cnUserSelectVariants()}
        key="multiple"
        size={size}
        required={required}
        disabled={disabled}
        view={view}
        form={form}
        status={status || undefined}
        placeholder={placeholder}
        items={items}
        isLoading={isLoading}
        value={valueMultiple}
        onChange={({ value }) => setValueMultiple(value)}
        groups={withGroups ? groups : []}
        multiple
        label={label}
        labelPosition={labelPosition}
        caption={caption}
      />
    );
  }

  return (
    <UserSelect
      key="not-multiple"
      size={size}
      disabled={disabled}
      view={view}
      form={form}
      required={required}
      placeholder={placeholder}
      items={items}
      status={status || undefined}
      value={value}
      isLoading={isLoading}
      onChange={({ value }) => setValue(value)}
      groups={withGroups ? groups : []}
      multiple={false}
      label={label}
      labelPosition={labelPosition}
      caption={caption}
    />
  );
}


//WithRender
if (example === 'с рендером') {
    return (
      <UserSelect
        size={size}
        disabled={disabled}
        view={view}
        status={status || undefined}
        form={form}
        required={required}
        placeholder={placeholder}
        items={myItems}
        value={value}
        onChange={({ value }) => setValue(value)}
        groups={withGroups ? myGroup : []}
        renderItem={({ item, active, hovered, onClick, onMouseEnter }) => (
          <div
            className={cnUserSelectVariants('MyItem', { active, hovered })}
            role="option"
            tabIndex={0}
            aria-selected={active}
            aria-hidden="true"
            onMouseEnter={onMouseEnter}
            onClick={onClick}
          >
            {item.name}
            <Text view="secondary" size="xs">
              {item.email}
            </Text>
            <Text view="secondary" size="xs">
              {item.position}
            </Text>
          </div>
        )}
        renderValue={({ item }) => (
          <div className={cnUserSelectVariants('MyValue')}>
            <span role="img" aria-label="Panda">
              🐼
            </span>
            &nbsp;— {item.name}
          </div>
        )}
        getGroupKey={(group) => group}
        getGroupLabel={(group) => group}
        getItemGroupKey={(item) => item.group}
        getItemKey={(item) => item.name}
        getItemLabel={(item) => item.name}
        getItemAvatarUrl={(item) => item.avatarUrl}
        getItemSubLabel={(item) => item.email}
        searchFunction={searchFunction}
        label={label}
        isLoading={isLoading}
        labelPosition={labelPosition}
        caption={caption}
      />
    );
  }
// if (example === 'with create') {
// // WithCreate
//     const [list, setList] = useState<Item[]>(items);
//
//     return (
//       <UserSelect
//         size={size}
//         disabled={disabled}
//         view={view}
//         required={required}
//         form={form}
//         status={status || undefined}
//         placeholder={placeholder}
//         items={list}
//         value={value}
//         isLoading={isLoading}
//         onChange={({ value }) => setValue(value)}
//         groups={withGroups ? groups : []}
//         onCreate={({ label }) => setList([{ label, id: `${label}_${list.length + 1}` }, ...list])}
//         label={label}
//         labelPosition={labelPosition}
//         caption={caption}
//       />
//     );
//   }
}

export default Variants;
