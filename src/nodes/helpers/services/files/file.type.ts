import { AbstractModel, ID } from '../../../../interfaces';

export interface File extends AbstractModel {
  _id?: ID | null;
  owner?: ID | null;
  filename?: string | null;
  mimetype?: string | null;
}
