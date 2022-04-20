import { AbstractModel, ID, IDs } from '../../../../interfaces';
import { CLOSET_TYPE, HOUSE_MATERIAL_TYPE, PROPERTY_TYPE } from '../../../../constants';
import { MODERATION_STATUSES } from './constants';

export interface RealEstate extends AbstractModel {
  _id?: ID | null;
  title?: string | null;
  accountId?: ID | null;
  agentId?: ID | null;
  moderationStatus?: MODERATION_STATUSES;
  isActive?: boolean;
  description?: string | null;
  city?: ID | null;
  district?: ID | null;
  streetOrAvenue?: ID | null;
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

export interface Area {
  total?: number;
  living?: number;
  kitchen?: number;
}

export interface UpsertEstate
  extends Omit<RealEstate, 'agentId' | 'moderationStatus' | 'accountId'> {
  _id?: ID | null;
}
