import { yandexStorage } from '../lib/yandex-object-storage/YandexStorage';
import { FileDoc, fileModel } from '../files.model';
import { getFileBinary } from '../methods/getFile';
import { LogicError } from '../../../../../utils/LogicError';
import { FILE_NOT_FOUND } from '../../../../../errorCodes.config';
import { Readable } from 'stream';
import { ImageSize, resizeImage } from '../methods/resizeImage';
import { omitBy } from 'lodash';
import { imageCacheExpiration } from '../../../config';
import { imageRub } from '../../../../restGateway/middleware/redis';

export interface DownloadByIdFileParams {
  id: string;
  width: number;
  height: number;
}

export const downloadById = async (params: DownloadByIdFileParams): Promise<Readable> => {
  const { id, width, height } = params;
  const foundFile: FileDoc = await fileModel.findById(id);

  if (!foundFile) {
    throw new LogicError(FILE_NOT_FOUND, { id });
  }

  if (width || height) {
    // пытаеся достать изменённое изображение из кэша
    const cacheKey = 'files_service_cache_' + id + '_' + width + 'x' + height;
    let output = await imageRub.getBuffer(cacheKey);

    if (!output) {
      const fileBinary = await getFileBinary(id);
      const size: ImageSize = omitBy({
        width,
        height,
      });

      try {
        output = await resizeImage(fileBinary, size);
        await imageRub.setex(cacheKey, imageCacheExpiration, output);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }

    const stream = new Readable();
    // eslint-disable-next-line
    stream._read = () => {};
    stream.push(output);
    stream.push(null);

    return stream;
  }

  return yandexStorage.get(id);
};
