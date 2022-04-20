import { Controller, Request, Route, Tags, Security, Put, Path } from 'tsoa';
import { RealEstate } from '../../../ecommerce/services/realEstate/realEstate.type';
import { MRequest } from '../../app';
import { MODERATION_STATUSES } from '../../../ecommerce/services/realEstate/constants';

const RealEstateService = require('../../../ecommerce/services/realEstate/realEstate.service');

@Route('admin/realEstate')
@Tags('Admin')
export class AdminRealEstateController extends Controller {
  /**
   * @summary Отклонить недвижимость
   */
  @Put('/{estateId}/status/to/reject')
  @Security('jwt', ['admin:updateAny'])
  async estateStatusRejected(
    @Request() req: MRequest,
    @Path() estateId: string,
  ): Promise<RealEstate> {
    return await RealEstateService.updateEstateStatus({
      estateId,
      estateStatus: MODERATION_STATUSES.REJECTED,
    });
  }

  /**
   * @summary Одобрить недвижимость
   */
  @Put('/{estateId}/status/to/approve')
  @Security('jwt', ['admin:updateAny'])
  async estateStatusApprove(
    @Request() req: MRequest,
    @Path() estateId: string,
  ): Promise<RealEstate> {
    return await RealEstateService.updateEstateStatus({
      estateId,
      estateStatus: MODERATION_STATUSES.APPROVED,
    });
  }
}
