const delSpace = (str: string) => str.replace(' ', '');

export const formatAccept = (accept: string | string[] | undefined) => {
  const formatting = Array.isArray(accept)
    ? accept.map(delSpace)
    : accept?.split(',').map(delSpace);

  return formatting?.length ? { '*': formatting } : undefined;
};
