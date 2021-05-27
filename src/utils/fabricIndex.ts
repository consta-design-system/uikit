export const fabricIndex = (start = 0) => {
  let index: number = start;

  return () => {
    index += 1;

    return index;
  };
};
