import mongoose, { Document, Schema, Model } from 'mongoose';
import { File } from './file.type';

const filesSchema = new Schema(
  {
    accountId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    filename: {
      type: String,
    },
    mimetype: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

filesSchema.index({ accountId: 1 });

export interface FileDoc extends Document, Omit<File, '_id'> {}

export let fileModel: Model<FileDoc>;

export const FILES_COLLECTION = 'File';

try {
  fileModel = mongoose.model<FileDoc>(FILES_COLLECTION);
} catch (error) {
  fileModel = mongoose.model<FileDoc>(FILES_COLLECTION, filesSchema);
}
