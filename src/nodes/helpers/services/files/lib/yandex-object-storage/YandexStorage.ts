import * as AWS from 'aws-sdk';
import { yandexObjectStorage } from '../../../../../../global.config';
import { Readable } from 'stream';

class YandexStorage {
  public readonly s3: AWS.S3;

  private readonly endpoint = 'https://s3.yandexcloud.net';
  private readonly contentType = 'multipart/form-data';

  constructor() {
    this.s3 = new AWS.S3({
      endpoint: new AWS.Endpoint(this.endpoint),
      accessKeyId: yandexObjectStorage.accessKey,
      secretAccessKey: yandexObjectStorage.secretAccessKey,
      region: yandexObjectStorage.region,
      computeChecksums: true,
    });
  }

  public get(key: string): Readable {
    return this.s3
      .getObject({
        Bucket: yandexObjectStorage.bucket,
        Key: key,
      })
      .createReadStream();
  }

  public upload(buffer: Buffer, key: string) {
    return new Promise((resolve, reject) => {
      this.s3.upload(
        {
          Bucket: yandexObjectStorage.bucket,
          Key: key,
          Body: buffer,
          ContentType: this.contentType,
        },
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        },
      );
    });
  }

  public delete(key: string) {
    return this.s3.deleteObject({
      Bucket: yandexObjectStorage.bucket,
      Key: key,
    });
  }
}

export const yandexStorage = new YandexStorage();
