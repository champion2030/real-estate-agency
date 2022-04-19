import { AbstractModel, ID, IDs } from '../../../../interfaces';

export interface Agent extends AbstractModel {
  _id?: ID | null;
  accountId?: ID | null;
  email?: string | null;
  phone?: string | null;
  firstName?: string | null;
  middleName?: string | null;
  secondName?: string | null;
  imageId?: string | null;
  isActive?: boolean;
  publicContacts?: PublicContacts;
  description?: string | null;
}

export interface PublicContacts {
  phones?: IDs;
  emails?: IDs;
  telegram?: string;
}

export interface UpdateAgentParams {
  email?: string | null;
  phone?: string | null;
  firstName?: string | null;
  middleName?: string | null;
  secondName?: string | null;
  imageId?: string | null;
  isActive?: boolean;
  publicContacts?: PublicContacts;
  description?: string | null;
}
