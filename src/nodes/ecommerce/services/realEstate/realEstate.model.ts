import mongoose, { Document, Schema, Model } from 'mongoose';
import { CLOSET_TYPE, HOUSE_MATERIAL_TYPE, PROPERTY_TYPE } from '../../../../constants';
import { RealEstate } from './realEstate.type';
import { MODERATION_STATUSES } from './constants';

const realEstateSchema = new Schema(
  {
    title: {
      type: String,
      text: true,
    },
    agentId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    moderationStatus: {
      type: String,
      enum: Object.values(MODERATION_STATUSES),
      default: MODERATION_STATUSES.DRAFT,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      text: true,
    },
    city: {
      type: Schema.Types.ObjectId,
    },
    district: {
      type: Schema.Types.ObjectId,
    },
    streetOrAvenue: {
      type: Schema.Types.ObjectId,
    },
    price: {
      type: Number,
    },
    photoId: {
      type: Schema.Types.ObjectId,
    },
    morePhotoIds: {
      type: [Schema.Types.ObjectId],
    },
    code: {
      type: String,
    },
    area: {
      total: {
        type: Number,
      },
      living: {
        type: Number,
      },
      kitchen: {
        type: Number,
      },
    },
    // ориентир
    landmark: {
      String,
    },
    roomsNumber: {
      type: Number,
    },
    // тип недвижимости
    propertyType: {
      type: String,
      enum: Object.values(PROPERTY_TYPE),
    },
    // угловая
    isCorner: {
      type: Boolean,
    },
    isBalcony: {
      type: Boolean,
    },
    // лоджия
    isLoggia: {
      type: Boolean,
    },
    // санузел
    closet: {
      type: String,
      enum: Object.values(CLOSET_TYPE),
    },
    // этаж
    floorNumber: {
      type: Number,
    },
    // количество этажей
    floorCount: {
      type: Number,
    },
    // торг
    isHaggle: {
      type: Boolean,
      default: false,
    },
    houseMaterial: {
      type: String,
      enum: Object.values(HOUSE_MATERIAL_TYPE),
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

realEstateSchema.index({ createdAt: -1 });
realEstateSchema.index({ price: 1 });
realEstateSchema.index({ title: 'text' });

export interface RealEstateDoc extends Document, Omit<RealEstate, '_id'> {}

export let realEstateModel: Model<RealEstateDoc>;

export const REAL_ESTATES_COLLECTION = 'RealEstate';

try {
  realEstateModel = mongoose.model<RealEstateDoc>(REAL_ESTATES_COLLECTION);
} catch (error) {
  realEstateModel = mongoose.model<RealEstateDoc>(REAL_ESTATES_COLLECTION, realEstateSchema);
}
