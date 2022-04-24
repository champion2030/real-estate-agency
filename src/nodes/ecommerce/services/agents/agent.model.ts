import mongoose, { Document, Schema, Model } from 'mongoose';
import { Agent } from './agent.type';
import { AGENT_ROLES } from '../../../../constants';

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
    publicContacts: {
      phones: [String],
      emails: [String],
      telegram: String,
    },
    description: {
      type: String,
    },
    role: {
      type: String,
      enum: Object.values(AGENT_ROLES),
      default: AGENT_ROLES.AGENT,
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

export let agentModel: Model<AgentDoc>;

export const AGENTS_COLLECTION = 'Agent';

try {
  agentModel = mongoose.model<AgentDoc>(AGENTS_COLLECTION);
} catch (error) {
  agentModel = mongoose.model<AgentDoc>(AGENTS_COLLECTION, agentSchema);
}
