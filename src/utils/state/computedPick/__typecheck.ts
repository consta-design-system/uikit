import { atom } from '@reatom/core';
import { computedPick } from './computedPick';

type TestObj = {
  optional?: string;
};

const testAtom = atom<TestObj>({});
const picked = computedPick(testAtom, ['optional']);

// Проверим тип computed
const computedFunc: typeof picked.optional = picked.optional;
type Computed = typeof picked.optional;
type Value = ReturnType<Computed>;

// Если Value не включает undefined, будет ошибка при присваивании
let test: Value = undefined; // ожидаем ошибку, если Value не undefined
