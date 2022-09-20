import './Select.variants.css';

import React, { useState } from 'react';
import { useBoolean, useSelect, useText } from '@consta/stand';

import { groups, Item, items, myData, myGroup } from '../__mocks__/data.mock';
import { cn } from '../../../utils/bem';

// import {
//   eventInterceptorMap,
//   EventInterceptorProvider,
// } from '../../EventInterceptor/EventInterceptor';

import {
  defaultPropForm,
  defaultPropSize,
  defaultPropView,
  propForm,
  propSize,
  propStatus,
  propView,
} from '../../SelectComponents/types';
import { Select } from '../Select';


const cnSelectVariants = cn('SelectVariants');

const Variants = () => {
  const example = useSelect('пример', ['обычный', 'с кастомным списком'],'обычный');
  const disabled = useBoolean('disabled', false);
  const size = useSelect('size', propSize, defaultPropSize);
  const view = useSelect('view', propView, defaultPropView);
  const form = useSelect('form', propForm, defaultPropForm);
  const required = useBoolean('required', false);
  const status = useSelect('status', ['', ...propStatus], '');
  const caption = useText('caption', 'Подпись');
  const label = useText('label', 'Заголовок');
  const labelPosition = useSelect('labelPosition', ['top', 'left'], 'top');
  const placeholder = useText('placeholder', 'Выберите цвет');
  const withGroups = useBoolean('withGroups', false);
  const isLoading = useBoolean('isLoading', false);

  const [value, setValue] = useState<Item | null | undefined>();
  if (example === 'обычный') {
  return (
    <Select
      size={size}
      disabled={disabled}
      view={view}
      form={form}
      required={required}
      status={status || undefined}
      placeholder={placeholder}
      items={items}
      isLoading={isLoading}
      value={value}
      onChange={({ value }) => setValue(value)}
      groups={withGroups ? groups : []}
      label={label}
      labelPosition={labelPosition}
      caption={caption}
    />
  );
 }


 if (example === 'с кастомным списком') {
   return (
     <Select
       size={size}
       disabled={disabled}
       view={view}
       required={required}
       form={form}
       status={status || undefined}
       placeholder={placeholder}
       items={myData}
       value={value}
       isLoading={isLoading}
       onChange={({ value }) => setValue(value)}
       groups={withGroups ? myGroup : []}
       renderItem={({ item, active, hovered, onClick, onMouseEnter }) => (
         <div
           className={cnSelectVariants('MyItem', { active, hovered })}
           role="option"
           tabIndex={0}
           aria-selected={active}
           aria-hidden="true"
           onMouseEnter={onMouseEnter}
           onClick={onClick}
         >
           {item.name}
         </div>
       )}
       renderValue={({ item }) => (
         <div>
           <span role="img" aria-label="Panda">
             🐼
           </span>{' '}
           – {item.name}
         </div>
       )}
       getGroupKey={(group) => group}
       getGroupLabel={(group) => group}
       getItemGroupKey={(item) => item.group}
       getItemKey={(item) => item.name}
       getItemLabel={(item) => item.name}
       label={label}
       labelPosition={labelPosition}
       caption={caption}
     />
   );
 }
}

export default Variants;
