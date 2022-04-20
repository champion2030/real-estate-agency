export enum ROLES {
  ADMIN = 'admin',
  AGENT = 'agent',
  USER = 'user',
}

export const grantsObject = {
  admin: {
    admin: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*'],
    },
    accounts: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*'],
    },
    agents: {
      'read:any': ['*'],
      'update:any': ['*'],
      'create:any': ['*'],
      'delete:any': ['*'],
    },
    realEstate: {
      'read:any': ['*'],
      'update:any': ['*'],
      'create:any': ['*'],
      'delete:any': ['*'],
    },
    user: {
      'read:any': ['*'],
      'update:any': ['*'],
      'create:any': ['*'],
    },
  },

  agent: {
    agent: {
      'read:any': ['*'],
      'update:any': ['*'],
      'create:any': ['*'],
      'delete:any': ['*'],
    },
    accounts: {
      'read:any': ['*'],
      'update:any': ['*'],
    },
    realEstate: {
      'read:any': ['*'],
      'update:any': ['*'],
      'create:any': ['*'],
      'delete:any': ['*'],
    },
  },

  user: {
    user: {
      'read:any': ['*'],
      'update:any': ['*'],
      'create:any': ['*'],
    },
  },
};
