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
    agent: {
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
