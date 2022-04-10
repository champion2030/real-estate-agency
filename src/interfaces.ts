import { ObjectId } from 'mongodb';

export interface AbstractModel {
  createdAt?: string | null | Date;
  updatedAt?: string | null | Date;
}

export type ID = string | ObjectId;
export type IDs = string[] | ObjectId[];

export interface AccountIDParams {
  accountId: ID;
}

export interface MongooseDeleteMany {
  ok?: number;
  n?: number;
  deletedCount?: number;
}

export interface MongooseUpdateOne {
  ok?: number;
  n?: number;
  nModified?: number;
}

export interface MongooseUpserted {
  index: number;
  _id: string;
}

export interface MongooseUpdateMany {
  n: number;
  nModified: number;
  opTime: {
    ts: string;
    t: number;
  };
  electionId: string;
  ok: number;
  $clusterTime: {
    clusterTime: string;
    signature: {
      hash: string;
      keyId: string;
    };
  };
  operationTime: string;
}
