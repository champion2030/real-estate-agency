import dotenv from 'dotenv';
import * as os from 'os';
import { ObjectId } from 'mongodb';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

dotenv.config({ path: '.env' });

// seconds
const days30s = 2592000;
const days60s = days30s * 2;

export const LOG_ENV = process.env.LOG_ENV || 'local';
export const env = process.env.NODE_ENV || 'development';
export const { pid } = process;
export const nodeName = process.env.NODE_NAME || `node-${os.hostname()}`;
export const nodeID = `${nodeName}-${LOG_ENV}-${pid.toString()}-${new ObjectId().toString()}`;

export const mongo = {
  uri: process.env.MONGO_URI || 'mongodb://localhost:27017/',
  options: {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: true,
    dbName: process.env.MONGO_DB_NAME || 'test',
    user: process.env.MONGO_USER || 'root',
    pass: process.env.MONGO_PASSWORD || 'root',
  },
};

export const isHotReload = process.argv.indexOf('--hot') !== -1;

export const log: any = {
  level: process.env.LOG_LEVEL || 'error',
  isPrettyPrint: process.env.PRETTY_PRINT === 'true',
};

export const jwt = {
  secret: process.env.JWT_SECRET || 'super secret',
  accessExpires: parseInt(process.env.JWT_ACCESS_EXPIRES, 10) || days30s,
  refreshExpires: parseInt(process.env.JWT_REFRESH_EXPIRES, 10) || days60s,
};

const globalConfig = {
  pid,
  nodeID,
  env,
  mongo,
  log,
  jwt,
  isHotReload,
};

export default globalConfig;
