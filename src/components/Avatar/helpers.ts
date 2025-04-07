export const MAX_COLOR_INDEX = 17;

export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * Math.floor(max));
};

export const getColorIndexForName = (
  name: string | undefined,
  maxIndex: number = MAX_COLOR_INDEX,
  monochrome?: boolean,
) => {
  if (monochrome) {
    return MAX_COLOR_INDEX + 1;
  }

  let index = 0;

  if (name) {
    index =
      name
        .split('')
        .map((c) => c.charCodeAt(0))
        .reduce((acc, code) => acc + code, 0) % maxIndex;
  } else {
    index = getRandomInt(maxIndex);
  }

  return index;
};

export const getInitialsForName = (name: string | undefined) => {
  if (!name) {
    return '';
  }

  const words = name.split(' ');
  const firstLetter = words[0] ? words[0][0] : '';
  const secondLatter = words[1] ? words[1][0] : '';

  return `${firstLetter.toUpperCase()}${secondLatter.toUpperCase()}`;
};
