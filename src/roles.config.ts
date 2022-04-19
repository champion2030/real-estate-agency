export enum ROLES {
  ADMIN = 'admin',
  AGENT = 'agent',
  USER = 'user',
}

export const grantsObject = {
  admin: {
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
  },

  agent: {
    accounts: {
      'read:any': ['*'],
      'update:own': ['*'],
    },
    agents: {
      'read:any': ['*'],
      'update:own': ['*'],
    },
  },

  user: {
    accounts: {
      'read:any': ['*'],
      'update:own': ['*'],
    },
    agents: {
      'read:any': ['*'],
    },
  },
};
