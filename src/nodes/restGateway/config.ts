import dotenv from 'dotenv';
import { dropRight } from 'lodash';
import path from 'path';
import globalConfig from "../../global.config";

dotenv.config({ path: '.env' });

export const restPort = process.env.REST_PORT || 3000;

export const rootDir = dropRight(__dirname.split(path.sep), 2).join(path.sep);

export const isShowDocs = process.env.IS_SHOW_DOCS === 'true';
export const isShowAgendaDash = process.env.IS_SHOW_AGENDA_DASH === 'true';

export default {
  ...globalConfig,
  restPort,
  rootDir,
  isShowDocs,
  isShowAgendaDash,
};
