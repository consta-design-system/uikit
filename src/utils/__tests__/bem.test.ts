import bem from '../bem';

const b = bem('my-block');

test('Просто блок без параметров', () => {
  const actual = b();
  expect(actual).toEqual('my-block');
});

test('Блок с модификаторами', () => {
  const actual = b({ x: 'y', color: 'red', good: true, bad: false });
  expect(actual).toEqual('my-block my-block_x_y my-block_color_red my-block_good');
});

test('Блок с модификаторами и миксинами', () => {
  const actual = b({ x: 'y', color: 'red', good: true, bad: false }, 'my-mixin my-mixin_a_b');
  expect(actual).toEqual(
    'my-block my-block_x_y my-block_color_red my-block_good my-mixin my-mixin_a_b',
  );
});

test('Элемент', () => {
  const actual = b('my-element');
  expect(actual).toEqual('my-block__my-element');
});

test('Элемент с модификаторами', () => {
  const actual = b('my-element', { x: 'y', color: 'red', good: true, bad: false });
  expect(actual).toEqual(
    'my-block__my-element my-block__my-element_x_y my-block__my-element_color_red my-block__my-element_good',
  );
});

test('Элемент с модификаторами и миксинами', () => {
  const actual = b(
    'my-element',
    { x: 'y', color: 'red', good: true, bad: false },
    'my-mixin my-mixin_a_b',
  );
  expect(actual).toEqual(
    'my-block__my-element my-block__my-element_x_y my-block__my-element_color_red my-block__my-element_good my-mixin my-mixin_a_b',
  );
});

test('Элемент c пустым миксином', () => {
  const actual = b('my-element', undefined);
  expect(actual).toEqual('my-block__my-element');
});

test('Элемент c миксином пустой строкой', () => {
  const actual = b('my-element', '');
  expect(actual).toEqual('my-block__my-element');
});

test('1 аргумент undefined', () => {
  const actual = b(undefined);
  expect(actual).toEqual('my-block');
});

test('2 аргумента undefined', () => {
  const actual = b(undefined, undefined);
  expect(actual).toEqual('my-block');
});

test('3 аргумента undefined', () => {
  const actual = b(undefined, undefined, undefined);
  expect(actual).toEqual('my-block');
});

test('1 аргумент пустая строка', () => {
  const actual = b('');
  expect(actual).toEqual('my-block');
});

test('2 аргумента пустая строка', () => {
  const actual = b('', '');
  expect(actual).toEqual('my-block');
});

test('3 аргумента пустая строка', () => {
  const actual = b('', '', '');
  expect(actual).toEqual('my-block');
});
