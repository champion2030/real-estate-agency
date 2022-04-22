import { Controller, Request, Route, Tags, Security, Put, Path, Body, Get, Query } from 'tsoa';
import { RealEstate, UpsertEstate } from '../../../ecommerce/services/realEstate/realEstate.type';
import { MRequest } from '../../app';
import { ListResponse } from '../../../../interfaces';
import { MODERATION_STATUSES } from '../../../ecommerce/services/realEstate/constants';
import { HOUSE_MATERIAL_TYPE, PROPERTY_TYPE } from '../../../../constants';

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

  /**
   * @summary получить список всей недвижимости в системе
   * @param req
   * @param page номер страницы
   * @param pageSize кол-во элементов на странице
   * @param sort сортировка (filed или -field)
   * @param accountId _id клиента
   * @param agentId _id агента
   * @param moderationStatus статус
   * @param isActive
   * @param citiId id города
   * @param districtId id района
   * @param streetOrAvenueId id улицы, проспекта
   * @param priceFrom
   * @param priceTo
   * @param code код
   * @param roomsNumber количество комнат
   * @param propertyType
   * @param isCorner
   * @param isBalcony
   * @param isLoggia
   * @param houseMaterial
   */
  @Get()
  @Security('jwt', ['realEstate:readAny'])
  async list(
    @Request() req: MRequest,
    @Query() page?: number,
    @Query() pageSize?: number,
    @Query() sort?: string,
    @Query() accountId?: string,
    @Query() agentId?: string,
    @Query() moderationStatus?: MODERATION_STATUSES,
    @Query() isActive?: boolean,
    @Query() citiId?: string,
    @Query() districtId?: string,
    @Query() streetOrAvenueId?: string,
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
      moderationStatus,
      isActive,
      citiId,
      districtId,
      streetOrAvenueId,
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
