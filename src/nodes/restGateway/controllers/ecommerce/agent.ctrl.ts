import { Body, Controller, Get, Put, Query, Request, Route, Security, Tags } from 'tsoa';
import { MRequest } from '../../app';
import { Agent, UpdateAgentParams } from '../../../ecommerce/services/agents/agent.type';
import { MODERATION_STATUSES } from '../../../ecommerce/services/realEstate/constants';
import {
  CITIES,
  DISTRICTS,
  HOUSE_MATERIAL_TYPE,
  PROPERTY_TYPE,
  TYPE_OF_DEAL,
} from '../../../../constants';
import { AgentDoc } from '../../../ecommerce/services/agents/agent.model';
import { ListResponse } from '../../../../interfaces';
import { RealEstate } from '../../../ecommerce/services/realEstate/realEstate.type';

const AgentService = require('../../../ecommerce/services/agents/agents.service');
const RealEstateService = require('../../../ecommerce/services/realEstate/realEstate.service');

@Route('agent')
@Tags('Agent')
export class AgentController extends Controller {
  /**
   * @summary Получить информацию о текущем агенте
   */
  @Get('/info')
  @Security('jwt', ['agent:readAny'])
  async getAgentInfo(@Request() req: MRequest): Promise<Agent> {
    return await AgentService.getAgentByAccount(req.accountId);
  }

  /**
   * @summary Обновить информацию о текущем агенте
   */
  @Put('/info')
  @Security('jwt', ['agent:updateAny'])
  async updateAgentInfo(
    @Request() req: MRequest,
    @Body() model?: UpdateAgentParams,
  ): Promise<Agent> {
    return await AgentService.updateByAgent({ accountId: req.accountId, ...model });
  }

  /**
   * @summary Получить список недвижимости прикреплённой за агентом
   * @param req
   * @param page - номер страницы
   * @param pageSize - количество элментов на страницу
   * @param sort - сортировка по полю
   * @param accountId - недвижимость конкретного пользователя
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
  @Get('/realEstate/list')
  @Security('jwt', ['agent:readAny'])
  async getAgentEstateList(
    @Request() req: MRequest,
    @Query() page?: number,
    @Query() pageSize?: number,
    @Query() sort?: string,
    @Query() accountId?: string,
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
    const agentAccount: AgentDoc = await AgentService.getAgentByAccount(req.accountId);

    return await RealEstateService.getListOfEstates({
      page,
      pageSize,
      sort,
      accountId,
      agentId: agentAccount._id.toString(),
      moderationStatus,
      isActive,
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
