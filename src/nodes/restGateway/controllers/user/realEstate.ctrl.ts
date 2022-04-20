import { Controller, Request, Route, Tags, Security, Post, Body, Put, Path } from 'tsoa';
import { RealEstate, UpsertEstate } from '../../../ecommerce/services/realEstate/realEstate.type';
import { MRequest } from '../../app';
import { MODERATION_STATUSES } from '../../../ecommerce/services/realEstate/constants';

const RealEstateService = require('../../../ecommerce/services/realEstate/realEstate.service');

@Route('user/realEstate')
@Tags('User')
export class UserRealEstateController extends Controller {
  /**
   * @summary Добавить недавижимость для текущего пользователя
   * @param req
   * @param estate - данные для создания
   */
  @Post('/')
  @Security('jwt', ['user:createAny'])
  async createEstateByUser(
    @Request() req: MRequest,
    @Body() estate: UpsertEstate,
  ): Promise<RealEstate> {
    return await RealEstateService.createEstateDraftByUser({ accountId: req.accountId, estate });
  }

  /**
   * @summary Обновить недавижимость для текущего пользователя
   * @param req
   * @param estateId - _id недвижимости для обновления
   * @param estate - данные для обновления
   */
  @Put('/{estateId}')
  @Security('jwt', ['user:updateAny'])
  async updateEstateByUser(
    @Request() req: MRequest,
    @Path('estateId') estateId: string,
    @Body() estate: UpsertEstate,
  ): Promise<RealEstate> {
    return await RealEstateService.updateEstateDraftByUser({
      estateId,
      estate,
    });
  }

  /**
   * @summary Послать недвижимость на модерацию
   */
  @Put('/{estateId}/status/to/moderation')
  @Security('jwt', ['user:updateAny'])
  async estateStatusToModeration(
    @Request() req: MRequest,
    @Path() estateId: string,
  ): Promise<RealEstate> {
    return await RealEstateService.updateEstateStatus({
      estateId,
      estateStatus: MODERATION_STATUSES.MODERATION,
    });
  }
}
