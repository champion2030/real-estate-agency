import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Put,
  Query,
  Request,
  Route,
  Security,
  Tags,
} from 'tsoa';
import { RealEstate, UpsertEstate } from '../../../ecommerce/services/realEstate/realEstate.type';
import { MRequest } from '../../app';
import { MODERATION_STATUSES } from '../../../ecommerce/services/realEstate/constants';
import {
  CITIES,
  DISTRICTS,
  HOUSE_MATERIAL_TYPE,
  PROPERTY_TYPE,
  TYPE_OF_DEAL,
} from '../../../../constants';
import { ListResponse } from '../../../../interfaces';

const RealEstateService = require('../../../ecommerce/services/realEstate/realEstate.service');

@Route('user/realEstate')
@Tags('User')
export class UserRealEstateController extends Controller {
  /**
   * @summary Добавить недавижимость
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
   * @summary Обновить недавижимость по _id
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

  /**
   * @summary Получить список недвижимости ( пользовательский метод )
   * @param req
   * @param page - номер страницы
   * @param pageSize - количество элментов на страницу
   * @param sort - сортировка по полю
   * @param accountId - недвижимость конкретного пользователя
   * @param agentId
   * @param moderationStatus - статус модерации
   * @param isActive
   * @param city
   * @param district
   * @param typeOfDeal
   * @param priceFrom
   * @param priceTo
   * @param code
   * @param roomsNumber
   * @param propertyType
   * @param isCorner
   * @param isBalcony
   * @param isLoggia
   * @param houseMaterial
   */
  @Get()
  async listOfEstatesByUser(
    @Request() req: MRequest,
    @Query() page?: number,
    @Query() pageSize?: number,
    @Query() sort?: string,
    @Query() accountId?: string,
    @Query() agentId?: string,
    @Query() moderationStatus?: MODERATION_STATUSES,
    @Query() isActive?: boolean,
    @Query() city?: CITIES,
    @Query() district?: DISTRICTS,
    @Query() typeOfDeal?: TYPE_OF_DEAL,
    @Query() priceFrom?: number,
    @Query() priceTo?: number,
    @Query() code?: string,
    @Query() roomsNumber?: number,
    @Query() propertyType?: PROPERTY_TYPE,
    @Query() isCorner?: boolean,
    @Query() isBalcony?: boolean,
    @Query() isLoggia?: boolean,
    @Query() houseMaterial?: HOUSE_MATERIAL_TYPE,
  ): Promise<ListResponse<RealEstate[]>> {
    return await RealEstateService.getListOfEstates({
      page,
      pageSize,
      sort,
      accountId,
      agentId,
      moderationStatus: MODERATION_STATUSES.APPROVED,
      isActive: true,
      city,
      district,
      typeOfDeal,
      priceFrom,
      priceTo,
      code,
      roomsNumber,
      propertyType,
      isCorner,
      isBalcony,
      isLoggia,
      houseMaterial,
    });
  }
}
