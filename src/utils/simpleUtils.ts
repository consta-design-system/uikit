function moveElement<T>(array: T[], oldIndex: number, newIndex: number) {
  if (Number.isNaN(newIndex) || newIndex < 0 || newIndex > array.length) {
    throw new Error('Некорректный аргумент newIndex');
  }

  if (Number.isNaN(oldIndex) || oldIndex < 0 || oldIndex > array.length) {
    throw new Error('Некорректный аргумент oldIndex');
  }

  if (oldIndex === newIndex) {
    throw new Error('newIndex равен oldIndex');
  }

  return newIndex < oldIndex
    ? [
        ...array.slice(0, newIndex),
        array[oldIndex],
        ...array.slice(newIndex, oldIndex),
        ...array.slice(oldIndex + 1),
      ]
    : [
        ...array.slice(0, oldIndex),
        ...array.slice(oldIndex + 1, newIndex),
        array[oldIndex],
        ...array.slice(newIndex),
      ];
}

function formatNumber(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export { moveElement, formatNumber };
