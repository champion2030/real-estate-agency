import { AbstractModel, ID, IDs } from '../../../../interfaces';
import { CLOSET_TYPE, HOUSE_MATERIAL_TYPE, PROPERTY_TYPE } from '../../../../constants';

export interface RealEstate extends AbstractModel {
  _id?: ID | null;
  title?: string | null;
  agentId?: ID | null;
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
