import { Stand, CreatedStand, PreparedStand, LibWithStands } from '##/exportTypes';

const sort = (a: PreparedStand, b: PreparedStand) => {
  if (a.stand.order && b.stand.order) {
    return a.stand.order - b.stand.order;
  }
  if (a.stand.order) {
    return -1;
  }
  if (b.stand.order) {
    return 1;
  }
  if (a.stand.id < b.stand.id) {
    return -1;
  }
  if (a.stand.id > b.stand.id) {
    return 1;
  }
  return 0;
};

const addToLib = (stand: PreparedStand, lib: LibWithStands[]) => {
  const indexLib = lib.findIndex((item) => item.id === stand.lib.id);

  const standWithGroup = {
    ...stand.stand,
    standId: stand.id,
    group: stand.stand.group || 'Библиотеки компонентов',
  };

  if (indexLib !== -1) {
    lib[indexLib].stands.push(standWithGroup);
  } else {
    lib.push({
      ...stand.lib,
      stands: [standWithGroup],
    });
  }
};

export const prepareStands = (initStands: CreatedStand[], paths: string[]) => {
  let stands: Record<string, PreparedStand> = {};
  let libs: LibWithStands[] = [];

  initStands
    .map((item, index) => ({
      ...item,
      stand: {
        ...item.stand,
        otherVersion: initStands
          .filter((el) => el.stand.id === item.stand.id && el.stand.status !== item.stand.status)
          .map((el) => el.stand),
      },
      id: `${item.lib.id}-${item.stand.group}-${item.stand.id}-${item.stand.status}`
        .replace(/\W|_/g, '-')
        .toLowerCase(),
      path: paths[index],
    }))
    .sort(sort)
    .forEach((stand) => {
      stands[stand.id] = stand;
      addToLib(stand, libs);
    });

  return { stands, libs };
};
