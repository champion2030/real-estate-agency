import * as AWS from 'aws-sdk';
import { yandexObjectStorage } from '../../../../../../global.config';
import { Readable } from 'stream';

export class YandexStorage {
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

  async get(key: string): Promise<Readable> {
    return this.s3
      .getObject({
        Bucket: yandexObjectStorage.bucket,
        Key: key,
      })
      .createReadStream();
  }

  async upload(buffer: Buffer, key: string): Promise<any> {
    return this.s3
      .upload({
        Bucket: yandexObjectStorage.bucket,
        Key: key,
        Body: buffer,
        ContentType: this.contentType,
      })
      .promise();
  }

  public async delete(key: string): Promise<any> {
    return this.s3
      .deleteObject({
        Bucket: yandexObjectStorage.bucket,
        Key: key,
      })
      .promise();
  }
}

export const yandexStorage = new YandexStorage();
