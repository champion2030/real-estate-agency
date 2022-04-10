import mongoose from 'mongoose';
import {env, isHotReload, mongo} from "../../global.config";

require('events').EventEmitter.defaultMaxListeners = 25;

export const mongoConnect = async (): Promise<mongoose.Connection> => {
  if (mongoose.connection.readyState === 2 || mongoose.connection.readyState === 1) {
    return Promise.resolve(mongoose.connection);
  }

  return new Promise((resolve) => {
    mongoose.connect(mongo.uri, mongo.options, (err) => {
      if (err) {
        console.log('Mongo connection error:', err.message);
        // logger.error('Mongo connection error', err.message);
        process.exit(1);
      } else {
        if (env !== 'test') {
          mongoose.connection.on('connected', () => {
            // logger.info('Mongo connection Established');
            console.log('Mongo connection Established')
          });

          mongoose.connection.on('reconnected', () => {
            // logger.info('Mongo connection Reestablished');
            console.log('Mongo connection Reestablished');
          });

          mongoose.connection.on('disconnected', () => {
            if (!isHotReload) {
              console.log('Mongo connection disconnected');
              // logger.error('Mongo connection disconnected');
            } else {
              console.log('Mongo connection disconnected');
              // logger.debug('Mongo connection disconnected');
            }
          });

          mongoose.connection.on('close', () => {
            if (!isHotReload) {
              console.log('Mongo connection closed');
              // logger.error('Mongo connection closed');
            } else {
              console.log('Mongo connection closed');
              // logger.debug('Mongo connection closed');
            }
          });

          mongoose.connection.on('error', (error) => {
            console.log('Mongo ERROR: ' + error);
            // logger.debug('Mongo ERROR: ' + error);
          });
        }

        return resolve(mongoose.connection);
      }
    });
  });
};
