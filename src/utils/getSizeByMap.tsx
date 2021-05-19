export function getSizeByMap<COMPONENT_SIZE extends string | number, SIZE>(
  map: Record<COMPONENT_SIZE, SIZE>,
  componentSize: COMPONENT_SIZE,
  size?: SIZE,
): SIZE {
  if (size) {
    return size;
  }
  return map[componentSize];
}
