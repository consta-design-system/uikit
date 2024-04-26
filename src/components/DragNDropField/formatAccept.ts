const delSpace = (str: string) => str.replace(' ', '');

export const formatAccept = (accept: string | string[] | undefined) => {
  const formating = Array.isArray(accept)
    ? accept.map(delSpace)
    : accept?.split(',').map(delSpace);

  return formating?.length ? { '*': formating } : undefined;
};
