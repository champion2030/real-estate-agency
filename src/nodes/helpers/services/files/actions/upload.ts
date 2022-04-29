import { Readable } from 'stream';
import { yandexStorage } from '../lib/yandex-object-storage/YandexStorage';
import { FileDoc, fileModel } from '../files.model';
import { ObjectId } from 'mongodb';
import { getFileBinaryFromStream } from '../methods/getFile';

export interface UploadFileParams {
  type: string;
  filename: string;
  owner: string;
}

export const upload = async (fileStream: Readable, params: UploadFileParams): Promise<string> => {
  const { type, filename, owner } = params;
  const { _id: fileId }: FileDoc = await fileModel.create({
    owner: new ObjectId(owner),
    filename,
    mimetype: type,
  });

  const fileBinary: Buffer = await getFileBinaryFromStream(fileStream);

  await yandexStorage.upload(fileBinary, fileId);

  return fileId;
};
