import { Controller, Request, Route, Tags, Security, Put, Path, Body } from 'tsoa';
import { RealEstate, UpsertEstate } from '../../../ecommerce/services/realEstate/realEstate.type';
import { MRequest } from '../../app';

const RealEstateService = require('../../../ecommerce/services/realEstate/realEstate.service');

@Route('admin/realEstate')
@Tags('Admin')
export class AdminRealEstateController extends Controller {
  /**
   * @summary Обновить недвижимость админом
   */
  @Put('/{estateId}')
  @Security('jwt', ['realEstate:updateAny'])
  async updateByAdmin(
    @Request() req: MRequest,
    @Path('estateId') estateId: string,
    @Body() estate?: UpsertEstate,
  ): Promise<RealEstate> {
    return await RealEstateService.updateByAdmin({ estateId, estate });
  }
}
