export const isEq = <K extends string, V extends unknown>(
  state: Record<K, V>,
  newState: Record<K, V>,
) => {
  for (const key in newState) {
    if (state[key] !== newState[key]) {
      return false;
    }
  }
  return true;
};
