/**
 * Генерирует палитру цветов в формате HSLA
 * @param count - количество цветов в палитре
 * @returns массив цветов в формате { h: number; s: number; l: number; a: number }
 */
export const generateHslaPalette = (
  count: number,
): { h: number; s: number; l: number; a: number }[] => {
  if (count <= 0) {
    return [];
  }

  const palette = [];

  for (let i = 0; i < count; i++) {
    // Равномерно распределяем оттенки по цветовому кругу
    const hue = Math.round((360 / count) * i);
    palette.push({
      h: hue,
      s: Math.random() * 100,
      l: 50,
      a: Math.random(),
    });
  }

  return palette;
};
