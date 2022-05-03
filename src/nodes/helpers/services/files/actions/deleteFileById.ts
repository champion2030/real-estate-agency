import { yandexStorage } from '../lib/yandex-object-storage/YandexStorage';
import { FileDoc, fileModel } from '../files.model';
import { LogicError } from '../../../../../utils/LogicError';
import { FILE_NOT_FOUND } from '../../../../../errorCodes.config';
import { ObjectId } from 'mongodb';

export const deleteFileById = async (fileId: string): Promise<any> => {
  const foundFile: FileDoc = await fileModel.findById(fileId);

  if (!foundFile) {
    throw new LogicError(FILE_NOT_FOUND, { fileId });
  }

  await fileModel.findOneAndDelete({ _id: new ObjectId(fileId) });

  await yandexStorage.delete(fileId);
};
