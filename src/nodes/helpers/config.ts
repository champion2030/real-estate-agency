import dotenv from 'dotenv';
import globalConfig from '../../global.config';

dotenv.config({ path: '.env' });

export const imageCacheDBNumber = parseInt(process.env.IMAGE_CACHE_DB, 10) || 3;

export const imageCacheExpiration =
  parseInt(process.env.IMAGE_CACHE_EXPIRATION, 10) || 5 * 24 * 60 * 60;

export default {
  ...globalConfig,
};
