import { get } from 'lodash';
import { MRequest } from '../app';
import express from 'express';
import {
  ErrorResponse,
  mongooseErrorResponse,
  tsoaSyntaxErrorResponse,
  tsoaValidateErrorResponse,
  typeErrorResponse,
  unknownErrorResponse,
} from '../../../utils/responses';

export const errorHandler = async function (
  error: any,
  req: MRequest,
  res: express.Response,
  next: express.NextFunction,
) {
  const errorName = error.name || get(error, 'constructor.name', null);
  let response: ErrorResponse;

  switch (errorName) {
    case 'MongoError':
    case 'CastError':
      response = mongooseErrorResponse(error);
      break;
    case 'SyntaxError':
      response = tsoaSyntaxErrorResponse(error);
      break;
    case 'ValidateError':
      response = tsoaValidateErrorResponse(error);
      break;
    case 'TypeError':
      response = typeErrorResponse(error);
      break;
    default:
      response = unknownErrorResponse(error);
      break;
  }

  res.status(response.statusCode || 500);
  res.json(response);
};
