export function getByMap<KEY extends string | number, VALUE>(
  map: Record<KEY, VALUE>,
  key: KEY,
  value?: VALUE,
): VALUE {
  if (value) {
    return value;
  }
  return map[key];
}
