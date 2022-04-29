import { Readable } from 'stream';
import { yandexStorage } from '../lib/yandex-object-storage/YandexStorage';

export async function getFileBinaryFromStream(readStream: Readable): Promise<Buffer> {
  const downloadStream = readStream;

  return new Promise((resolve) => {
    const bytes = [];

    downloadStream.on('data', function (chunk) {
      bytes.push(chunk);
    });
    downloadStream.once('end', function () {
      resolve(Buffer.concat(bytes));
    });
    downloadStream.once('error', function () {
      resolve(Buffer.alloc(0));
    });
  });
}

export async function getFileBinary(fileId: string): Promise<Buffer> {
  const downloadStream = await yandexStorage.get(fileId);

  return new Promise((resolve) => {
    const bytes = [];

    downloadStream.on('data', function (chunk) {
      bytes.push(chunk);
    });
    downloadStream.once('end', function () {
      resolve(Buffer.concat(bytes));
    });
    downloadStream.once('error', function () {
      resolve(Buffer.alloc(0));
    });
  });
}
