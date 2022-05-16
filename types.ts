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
  docs?: React.FC;
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

export type PreparedStand = CreatedStand & {
  id: string;
  path: string;
};

export type LibWithStands = Lib<Group> & {
  stands: Stand[];
};
