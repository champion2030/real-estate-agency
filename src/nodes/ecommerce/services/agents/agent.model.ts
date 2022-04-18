import mongoose, { Document, Schema, Model } from 'mongoose';
import { Agent } from './agent.type';

const agentSchema = new Schema(
  {
    accountId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    email: {
      type: String,
      text: true,
      lowercase: true,
      trim: true,
      unique: true,
      required: true,
    },
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    firstName: {
      type: String,
      text: true,
    },
    middleName: {
      type: String,
      text: true,
    },
    secondName: {
      type: String,
      text: true,
    },
    imageId: {
      type: Schema.Types.ObjectId,
    },
    rate: {
      rating: {
        type: Number,
        default: 0,
      },
      voteTimes: {
        type: Number,
        default: 0,
      },
    },
    publicContacts: {
      phones: [String],
      emails: [String],
    },
    locations: {
      cities: {
        type: [Schema.Types.ObjectId],
      },
      districts: {
        type: [Schema.Types.ObjectId],
      },
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

agentSchema.index({ phone: 1 }, { unique: true });
agentSchema.index({ email: 1 }, { unique: true });
agentSchema.index({ secondName: 'text', firstName: 'text', middleName: 'text' });

export interface AgentDoc extends Document, Omit<Agent, '_id'> {}

export let schemaModel: Model<AgentDoc>;

export const AGENTS_COLLECTION = 'Agent';

try {
  schemaModel = mongoose.model<AgentDoc>(AGENTS_COLLECTION);
} catch (error) {
  schemaModel = mongoose.model<AgentDoc>(AGENTS_COLLECTION, agentSchema);
}
