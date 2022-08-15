import React from 'react';

// import {
//   items,
//   itemsGen,
//   itemsGen2,
//   itemsHead,
//   itemsHead2,
//   itemsNeg,
//   itemsNeg2,
// } from '../../../__mocks__/data.mock';
// import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
// import { cnDocsExample } from '../../../../../uiKit/components/DocsExample/DocsExample';
// import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
// import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
// import { Button } from '../../../../Button/Button';
// import { CheckboxGroup } from '../../../CheckboxGroup';
//
// type Item = {
//   name: string;
//   disabled?: boolean;
// };

export function CheckboxGroupExampleName() {
  //
  return (
    <div />
    // <StoryBookExample className={cnDocsDecorator('Section')}>
    //   <p className={cnDocsExample('Caption')}>
    //     <b>Выберите номер</b>
    //   </p>
    //   <CheckboxGroup
    //     value={value}
    //     items={items}
    //     getLabel={(item) => item.name}
    //     getDisabled={(item) => item.disabled}
    //     onChange={({ value }) => setValue(value)}
    //     name="CheckboxGroup"
    //   />
    // </StoryBookExample>
  );
}

export function CheckboxGroupExampleHead() {
  //  const [value, setValue] = React.useState<Item | null>(null);

  return (
    <div />
    // <div
    //   className={cnDocsDecorator('Section', [wp.tplGrid({ 'ratio': '1-1', 'col-gap': 'full' })])}
    // >
    //   <div className={cnDocsExample()}>
    //     <p className={cnDocsExample('Caption')}>
    //       <b>Где деньги?</b>
    //     </p>
    //     <div className={wp.decorator({ distribute: 'left' })}>
    //       <CheckboxGroup
    //         value={value}
    //         items={itemsHead}
    //         getLabel={(item) => item.name}
    //         getDisabled={(item) => item.disabled}
    //         onChange={({ value }) => setValue(value)}
    //         name="CheckboxGroup"
    //       />
    //     </div>
    //     <p className={cnDocsExample('Status', { view: 'wrong' })}>Неправильно</p>
    //   </div>
    //   <div className={cnDocsExample()}>
    //     <p className={cnDocsExample('Caption')}>
    //       <b>Где деньги?</b>
    //     </p>
    //     <div className={wp.decorator({ distribute: 'left' })}>
    //       <CheckboxGroup
    //         value={value}
    //         items={itemsHead2}
    //         getLabel={(item) => item.name}
    //         getDisabled={(item) => item.disabled}
    //         onChange={({ value }) => setValue(value)}
    //         name="CheckboxGroup"
    //       />
    //     </div>
    //     <p className={cnDocsExample('Status', { view: 'right' })}>Правильно</p>
    //   </div>
    // </div>
  );
}

export function CheckboxExampleGroupHead3() {
  // const [value, setValue] = React.useState<Item[] | null>(null);

  return (
    <div />
    // <StoryBookExample className={cnDocsDecorator('Section')}>
    //   <p className={cnDocsExample('Caption')}>
    //     <b>Выберите места для хранения денег</b>
    //   </p>
    //   <CheckboxGroup
    //     value={value}
    //     items={itemsHead}
    //     getLabel={(item) => item.name}
    //     getDisabled={(item) => item.disabled}
    //     onChange={({ value }) => setValue(value)}
    //     name="CheckboxGroup"
    //   />
    // </StoryBookExample>
  );
}

export function CheckboxGroupExampleNeg() {
  // const [value, setValue] = React.useState<Item | null>(null);

  return (
    <div />
    // <div
    //   className={cnDocsDecorator('Section', [wp.tplGrid({ 'ratio': '1-1', 'col-gap': 'full' })])}
    // >
    //   <div className={cnDocsExample()}>
    //     <div className={wp.decorator({ distribute: 'left' })}>
    //       <CheckboxGroup
    //         value={value}
    //         items={itemsNeg}
    //         getLabel={(item) => item.name}
    //         getDisabled={(item) => item.disabled}
    //         onChange={({ value }) => setValue(value)}
    //         name="CheckboxGroup"
    //       />
    //     </div>
    //     <p className={cnDocsExample('Status', { view: 'wrong' })}>Неправильно</p>
    //   </div>
    //   <div className={cnDocsExample()}>
    //     <div className={wp.decorator({ distribute: 'left' })}>
    //       <CheckboxGroup
    //         value={value}
    //         items={itemsNeg2}
    //         getLabel={(item) => item.name}
    //         getDisabled={(item) => item.disabled}
    //         onChange={({ value }) => setValue(value)}
    //         name="CheckboxGroup"
    //       />
    //     </div>
    //     <p className={cnDocsExample('Status', { view: 'right' })}>Правильно</p>
    //   </div>
    // </div>
  );
}

export function CheckboxGroupExampleGeneral() {
  //  const [value, setValue] = React.useState<Item | null>(null);

  return (
    <div />
    // <div
    //   className={cnDocsDecorator('Section', [wp.tplGrid({ 'ratio': '1-1', 'col-gap': 'full' })])}
    // >
    //   <div className={cnDocsExample()}>
    //     <p className={cnDocsExample('Caption')}>
    //       <b>Каких булок ещё съесть</b>
    //     </p>
    //     <div className={wp.decorator({ distribute: 'left' })}>
    //       <CheckboxGroup
    //         value={value}
    //         items={itemsGen}
    //         getLabel={(item) => item.name}
    //         getDisabled={(item) => item.disabled}
    //         onChange={({ value }) => setValue(value)}
    //         name="CheckboxGroup"
    //       />
    //     </div>
    //     <p className={cnDocsExample('Status', { view: 'wrong' })}>Неправильно</p>
    //   </div>
    //   <div className={cnDocsExample()}>
    //     <p className={cnDocsExample('Caption')}>
    //       <b>Каких булок ещё съесть</b>
    //     </p>
    //     <div className={wp.decorator({ distribute: 'left' })}>
    //       <CheckboxGroup
    //         value={value}
    //         items={itemsGen2}
    //         getLabel={(item) => item.name}
    //         getDisabled={(item) => item.disabled}
    //         onChange={({ value }) => setValue(value)}
    //         name="CheckboxGroup"
    //       />
    //     </div>
    //     <div className={wp.decorator({ 'distribute': 'left', 'indent-t': 'm' })}>
    //       <Button label="Пропустить этот шаг" view="ghost" />
    //     </div>
    //     <p className={cnDocsExample('Status', { view: 'right' })}>Правильно</p>
    //   </div>
    // </div>
  );
}
