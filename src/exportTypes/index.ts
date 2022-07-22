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
  logo?: (() => React.ReactElement | null) | string;
  order?: number;
  status: 'deprecated' | 'canary' | 'stable' | 'inWork';
  version: string;
  docs?: React.FC;
  figma?: string;
  github?: string;
  sandbox?: string;
  playground?: React.FC;
  description?: string;
  otherVersion?: Stand<Group>[];
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

export type PreparedStand = { stand: Stand; lib: LibWithStands } & {
  id: string;
  path: string;
};

export type LibWithStands = Lib<Group> & {
  stands: PreparedStand[];
};
