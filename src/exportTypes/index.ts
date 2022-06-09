export type Group = {
  id: string;
  title: string;
  order?: number;
};

export type Stand<Group extends string = string> = {
  id: string;
  title: string;
  group: Group;
  image?: (() => React.ReactElement | null) | string;
  logo?:  (() => React.ReactElement | null) | string;
  description?: string;
  order?: number;
  standId?: string;
  status: 'depricated' | 'canary' | 'stable' | 'inWork';
  version: string;
  docs?: React.FC;
};

export type Lib<GROUP extends Group> = {
  groups: readonly GROUP[];
  title: string;
  id: string;
  logo?: (() => React.ReactElement | null) | string;
  image?: (() => React.ReactElement | null) | string;
  group?: string;
  description?: string;
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
