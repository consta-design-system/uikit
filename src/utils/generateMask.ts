const escapeRegExp = (str: string) =>
  str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');

const replaceAll = (str: string, find: string, replace: string) =>
  str.replace(new RegExp(escapeRegExp(find), 'g'), replace);

export const generateSvgMask = (svg: string) => {
  let mask = svg.replace(/\s+/g, ' ');
  mask = replaceAll(mask, '%', '%25');
  mask = replaceAll(mask, '> <', '><');
  mask = replaceAll(mask, '; }', ';}');
  mask = replaceAll(mask, '<', '%3c');
  mask = replaceAll(mask, '>', '%3e');
  mask = replaceAll(mask, '"', "'");
  mask = replaceAll(mask, '#', '%23');
  mask = replaceAll(mask, '{', '%7b');
  mask = replaceAll(mask, '}', '%7d');
  mask = replaceAll(mask, '|', '%7c');
  mask = replaceAll(mask, '^', '%5e');
  mask = replaceAll(mask, '`', '%60');
  mask = replaceAll(mask, '@', '%40');
  return `url("data:image/svg+xml;charset=UTF-8,${mask}")`;
};
