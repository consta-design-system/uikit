/**
 * Функция для глубокого сравнения двух объектов
 * @param obj1 Первый объект для сравнения
 * @param obj2 Второй объект для сравнения
 * @returns true, если объекты равны, иначе false
 */
export function deepEqual(obj1: any, obj2: any): boolean {
  // Проверка на строгое равенство (включая примитивы и одну и ту же ссылку)
  if (obj1 === obj2) {
    return true;
  }

  // Проверка на null или undefined
  if (obj1 == null || obj2 == null) {
    return obj1 === obj2;
  }

  // Проверка на разные типы
  if (typeof obj1 !== typeof obj2) {
    return false;
  }

  // Проверка на даты
  if (obj1 instanceof Date && obj2 instanceof Date) {
    return obj1.getTime() === obj2.getTime();
  }

  // Проверка на массивы
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) {
      return false;
    }
    for (let i = 0; i < obj1.length; i++) {
      if (!deepEqual(obj1[i], obj2[i])) {
        return false;
      }
    }
    return true;
  }

  // Проверка на объекты
  if (typeof obj1 === 'object' && typeof obj2 === 'object') {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // Проверка на одинаковое количество свойств
    if (keys1.length !== keys2.length) {
      return false;
    }

    // Рекурсивное сравнение всех свойств
    for (const key of keys1) {
      if (!keys2.includes(key)) {
        return false;
      }
      if (!deepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }
    return true;
  }

  // Для примитивов, которые не прошли строгую проверку равенства
  return obj1 === obj2;
}
