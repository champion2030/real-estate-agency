import * as bcrypt from 'bcrypt';

const salt = 'V1StGXR8_Z5jdHi6B-myT';

export const createPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(salt + password, 12);
};

export const checkPassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(salt + password, hash);
};
