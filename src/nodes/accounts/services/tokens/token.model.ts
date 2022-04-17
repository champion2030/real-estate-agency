import mongoose, { Model, Document } from 'mongoose';
import { AbstractModel } from 'src/interfaces';

export interface Token extends AbstractModel {
  _id?: string | null;
  accountId: string;
  token?: string;
  os: string;
  source: string;
  browser: string;
}

const tokenSchema = new mongoose.Schema(
  {
    accountId: {
      type: String,
      required: true,
    },
    os: {
      type: String,
    },
    source: {
      type: String,
    },
    browser: {
      type: String,
    },
    token: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

tokenSchema.index({ accountId: 1, token: 1 });

export interface TokenDoc extends Omit<Token, '_id'>, Document {}

export let tokenModel: Model<TokenDoc>;

export const TOKEN_COLLECTION = 'Token';

try {
  tokenModel = mongoose.model<TokenDoc>(TOKEN_COLLECTION);
} catch (error) {
  tokenModel = mongoose.model<TokenDoc>(TOKEN_COLLECTION, tokenSchema);
}
