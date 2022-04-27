import { Route, Controller, Tags, Post, Request } from 'tsoa';
import { MRequest } from '../app';
import { Readable } from 'stream';
import multer from 'multer';
import { LogicError } from '../../../utils/LogicError';
import { FILE_NOT_CREATED } from '../../helpers/errorConfig';

@Route('files')
@Tags('Files')
export class FilesController extends Controller {
  private handleAllFiles(req: MRequest): Promise<void> {
    const multerFields = multer().any();

    return new Promise((resolve, reject) => {
      multerFields(req, undefined, async (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }

  /**
   * @summary Загрузить файл на сервер в формате blob
   */
  @Post('blob')
  public async uploadFile(@Request() req: MRequest): Promise<string> {
    await this.handleAllFiles(req);
    const file = req.files[0];

    const stream = new Readable();

    // eslint-disable-next-line no-underscore-dangle
    stream._read = () => {};
    stream.push(file.buffer);
    stream.push(null);

    try {
      // const fileId: string = await FilesService.upload(stream, {
      //   meta: {
      //     type: file.mimetype || '',
      //     filename: file.originalname || '',
      //     owner: req.accountId,
      //   },
      // });
      //
      // // eslint-disable-next-line no-console
      // console.log(`file.blob.upload id: ${fileId}`);
      //
      // return fileId;
      return;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('cant upload files', err);

      throw new LogicError(FILE_NOT_CREATED, err.message);
    }
  }
}
