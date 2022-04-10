import { nanoid } from 'nanoid'
import * as bcrypt from 'bcrypt'

export const createPassword = (password: string) => {
  const prefix = nanoid(8);
  const salt = bcrypt.genSaltSync(10);
  const bcryptHash = bcrypt.hashSync(password, salt);

  return prefix + bcryptHash;
};

export const checkPassword = (password: string, hash: string) => {
  const prefix = hash.substring(0, 8);

  const bcryptHash = bcrypt.compareSync(password, hash);

  return hash === prefix + bcryptHash;
};
