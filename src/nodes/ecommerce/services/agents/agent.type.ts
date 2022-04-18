import { AbstractModel, ID, IDs } from '../../../../interfaces';

export interface Agent extends AbstractModel {
  _id: ID;
  accountId: ID;
  email: string;
  phone: string;
  firstName: string;
  middleName: string;
  secondName: string;
  imageId?: string | null;
  isActive: boolean;
  rate?: AgentRate;
  publicContacts?: PublicContacts;
  locations: Locations;
}

export interface AgentRate {
  voteTimes?: number;
  rating?: number;
}

export interface PublicContacts {
  phones?: IDs;
  emails?: IDs;
}

export interface Locations {
  cities?: IDs;
  districts?: IDs;
}
