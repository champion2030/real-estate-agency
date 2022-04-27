import { AbstractModel, ID } from '../../../../interfaces';

export interface File extends AbstractModel {
  _id?: ID | null;
  accountId?: ID | null;
  filename?: string | null;
  mimetype?: string | null;
}
