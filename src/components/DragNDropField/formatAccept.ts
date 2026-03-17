const delSpace = (str: string) => str.replace(' ', '');

export const formatAccept = (accept: string | string[] | undefined) => {
  const formatting = Array.isArray(accept)
    ? accept.map((str) => delSpace(str).toLowerCase())
    : accept?.split(',').map((str) => delSpace(str).toLowerCase());

  return formatting?.length ? { '*': formatting } : undefined;
};
