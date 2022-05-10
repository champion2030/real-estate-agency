import { AbstractModel, ID, IDs } from '../../../../interfaces';
import { ROLES } from '../../../../roles.config';

export interface Account extends AbstractModel {
  _id: ID;
  email: string;
  phone: string;
  firstName: string;
  middleName: string;
  secondName: string;
  imageId?: string | null;
  password: string;
  role: ROLES;
  isAgent: boolean;
  isActive: boolean;
  favorites?: IDs;
}

export interface AccountInfo {
  email?: string | null;
  phone?: number | null;
  firstName?: string | null;
  secondName?: string | null;
  middleName?: string | null;
  imageId?: string | null;
}
