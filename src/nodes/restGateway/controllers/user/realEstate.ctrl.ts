import { Controller, Request, Route, Tags, Security, Post, Body, Put, Path } from 'tsoa';
import { RealEstate, UpsertEstate } from '../../../ecommerce/services/realEstate/realEstate.type';
import { MRequest } from '../../app';

const RealEstateService = require('../../../ecommerce/services/realEstate/realEstate.service');

@Route('user/realEstate')
@Tags('User')
export class UserRealEstateController extends Controller {
  /**
   * @summary Добавить недавижимость текущего пользователя
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
   * @summary Обновить недавижимость текущего пользователя
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
   * @summary Вернуть недвижимость в статус черновика
   */
  @Put('/{estateId}/status/to/draft')
  @Security('jwt', ['user:updateAny'])
  async estateStatusToDraft(
    @Request() req: MRequest,
    @Path('estateId') estateId: string,
  ): Promise<RealEstate> {
    return await RealEstateService.estateToDraft(estateId, req.accountId);
  }

  /**
   * @summary Послать недвижимость на модерацию
   */
  @Put('/{estateId}/status/to/moderation')
  @Security('jwt', ['user:updateAny'])
  async estateStatusToModeration(
    @Request() req: MRequest,
    @Path('estateId') estateId: string,
  ): Promise<RealEstate> {
    return await RealEstateService.estateToModeration(estateId, req.accountId);
  }
}
