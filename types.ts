export type Group = {
  id: string;
  title: string;
  order?: number;
};

export type Stand<Group extends string = string> = {
  id: string;
  title: string;
  group: Group;
  order?: number;
  status: 'depricated' | 'canary' | 'stable' | 'inWork';
  version: string;
};

export type Lib<GROUP extends Group> = {
  groups: readonly GROUP[];
  logo?: () => React.ReactElement | null;
  title: string;
  id: string;
  urlPath?: string;
};

export type CreatedStand = {
  stand: Stand;
  lib: Lib<Group>;
};

export type LibWithStands = Lib<Group> & {
  stands: Stand[];
};
