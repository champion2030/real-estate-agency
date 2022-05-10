import mongoose from 'mongoose';
import { env, isHotReload, mongo } from '../../global.config';
import logger from '../logger';

require('events').EventEmitter.defaultMaxListeners = 25;

export const mongoConnect = async (): Promise<mongoose.Connection> => {
  if (mongoose.connection.readyState === 2 || mongoose.connection.readyState === 1) {
    return Promise.resolve(mongoose.connection);
  }

  return new Promise((resolve) => {
    mongoose.connect(mongo.uri, mongo.options, (err) => {
      if (err) {
        logger.error('Mongo connection error', err.message);
        process.exit(1);
      } else {
        if (env !== 'test') {
          mongoose.connection.on('connected', () => {
            logger.info('Mongo connection Established');
          });

          mongoose.connection.on('reconnected', () => {
            logger.info('Mongo connection Reestablished');
          });

          mongoose.connection.on('disconnected', () => {
            if (!isHotReload) {
              logger.error('Mongo connection disconnected');
            } else {
              logger.debug('Mongo connection disconnected');
            }
          });

          mongoose.connection.on('close', () => {
            if (!isHotReload) {
              logger.error('Mongo connection closed');
            } else {
              logger.debug('Mongo connection closed');
            }
          });

          mongoose.connection.on('error', (error) => {
            logger.debug('Mongo ERROR: ' + error);
          });
        }

        return resolve(mongoose.connection);
      }
    });
  });
};
