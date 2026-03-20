const delSpace = (str: string) => str.replace(' ', '');

const toCaseInsensitiveVariant = (value: string) => {
  const normalized = delSpace(value);
  const lower = normalized.toLowerCase();
  const upper = normalized.toUpperCase();

  return lower === upper ? [normalized] : [lower, upper];
};

export const formatAccept = (accept: string | string[] | undefined) => {
  const raw = Array.isArray(accept)
    ? accept
    : accept?.split(',').map((str) => delSpace(str));

  const formatting = raw
    ?.flatMap((str) => toCaseInsensitiveVariant(str))
    .filter(Boolean)
    .filter((value, index, arr) => arr.indexOf(value) === index);

  return formatting?.length ? { '*': formatting } : undefined;
};
