import Redis from 'ioredis';
import { redis } from '../../../global.config';
import { imageCacheDBNumber } from '../../helpers/config';

export const imageRub = new Redis(`${redis.url}/${imageCacheDBNumber}`);
