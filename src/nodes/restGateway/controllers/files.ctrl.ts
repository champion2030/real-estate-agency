import { Route, Controller, Tags, Post, Request, Get, Path, Query, Delete } from 'tsoa';
import { MRequest } from '../app';
import { Readable } from 'stream';
import multer from 'multer';
import { LogicError } from '../../../utils/LogicError';
import { FILE_NOT_CREATED } from '../../helpers/errorConfig';

const FilesService = require('../../helpers/services/files/files.service');

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
      const fileId: string = await FilesService.upload(stream, {
        type: file.mimetype || '',
        filename: file.originalname || '',
        owner: req.accountId,
      });

      // eslint-disable-next-line no-console
      console.log(`file.blob.upload id: ${fileId}`);

      return fileId;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('cant upload files', err);

      throw new LogicError(FILE_NOT_CREATED, err.message);
    }
  }

  /**
   * @summary загрузить изображение с сервера по id с указанием размера
   * @param id _id изображения
   * @param req - объект запроса
   * @param width - ширина изображение
   * @param height - длина изображения
   */
  @Get('{id}/image/resize')
  async getResized(
    @Request() req: MRequest,
    @Path('id') id: string,
    @Query('width') width?: number,
    @Query('height') height?: number,
  ): Promise<any> {
    const fileStream: Readable = await FilesService.downloadById({
      id,
      width,
      height,
    });

    fileStream.pipe(req.res);
    await new Promise<void>((resolve) => {
      fileStream.on('end', () => {
        req.res.end();
        resolve();
      });
    });

    return;
  }

  /**
   * @summary удалить файл с сервера по id
   * @param id id файла
   * @param req - объект запроса
   */
  @Delete('{id}')
  async delete(@Request() req: MRequest, @Path('id') id: string): Promise<any> {
    return await FilesService.deleteFileById(id);
  }
}
