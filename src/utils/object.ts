export const isEmpty = (obj: {}) => {
  // eslint-disable-next-line guard-for-in
  for (const _ in obj) {
    return false;
  }
  return true;
};
