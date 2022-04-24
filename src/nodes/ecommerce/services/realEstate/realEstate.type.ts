import { AbstractModel, ID, IDs } from '../../../../interfaces';
import {
  CITIES,
  CLOSET_TYPE,
  DISTRICTS,
  HOUSE_MATERIAL_TYPE,
  PROPERTY_TYPE,
  TYPE_OF_DEAL,
} from '../../../../constants';
import { MODERATION_STATUSES } from './constants';

export interface RealEstate extends UpsertEstate, AbstractModel {
  _id?: ID | null;
}

export interface Area {
  total?: number;
  living?: number;
  kitchen?: number;
}

export interface UpsertEstate {
  title?: string | null;
  accountId?: ID | null;
  agentId?: ID | null;
  moderationStatus?: MODERATION_STATUSES;
  isActive?: boolean;
  description?: string | null;
  city?: CITIES;
  district?: DISTRICTS;
  typeOfDeal?: TYPE_OF_DEAL;
  price?: number | null;
  photoId?: ID | null;
  morePhotoIds?: IDs | null;
  code?: string | null;
  area?: Area;
  landmark?: string | null;
  roomsNumber?: number | null;
  propertyType?: PROPERTY_TYPE;
  isCorner?: boolean;
  isBalcony?: boolean;
  isLoggia?: boolean;
  closet?: CLOSET_TYPE;
  floorNumber?: number | null;
  floorCount?: number | null;
  houseMaterial?: HOUSE_MATERIAL_TYPE;
}
