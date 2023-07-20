export const fabricIndex = (start = -1) => {
  let index: number = start;

  return () => {
    index += 1;

    return index;
  };
};
