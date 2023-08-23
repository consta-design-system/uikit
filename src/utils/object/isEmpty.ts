export const isEmpty = (obj: {}) => {
  // eslint-disable-next-line guard-for-in, no-unreachable-loop
  for (const _ in obj) {
    return false;
  }
  return true;
};
