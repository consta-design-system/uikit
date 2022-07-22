type Result = {
  id: string;
  label: string;
};

const SEPARATOR = '\\';

const SYMBOLS =
  /\?|{|}|[|]|\s|\'|\"|;|:|\||\\|\/|\!|@|#|\$|%|\^|,|\.|&|\*|-|_|=|\+|\`|\~|<|§|>|\(|\)/g;

export const typographyHeaderConverter = (header: string): Result => {
  const array = header.split(SEPARATOR);
  const strId = array[1];
  return {
    id:
      strId === '' || !strId
        ? header.replace(SYMBOLS, '-').toLowerCase()
        : strId,
    label: array[0],
  };
};
