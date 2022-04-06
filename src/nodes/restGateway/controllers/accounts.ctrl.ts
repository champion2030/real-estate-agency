import {
  Controller,
  Get,
  Path,
  Request,
  Route,
  Security,
  Tags,
} from 'tsoa';
import { MRequest } from '../app';

@Route('accounts')
@Tags('Accounts')
export class AccountsController extends Controller {

  /**
   * @summary получить по id
   * @param id - _id сущности базы данных
   */
  @Get('{id}')
  // @Security('jwt', ['accounts:readAny', 'accountant:readAny'])
  async get(@Request() req: MRequest, @Path('id') id: string): Promise<any> {
    return {
      name: 'Some name'
    };
  }
}
