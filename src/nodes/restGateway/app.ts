import methodOverride from 'method-override';
import express, { Express } from 'express';
import * as bodyParser from 'body-parser';
import swaggerUI from 'swagger-ui-express';
import userAgent from 'express-useragent';
import cookieParser from 'cookie-parser';
import createLocaleMiddleware from 'express-locale';
import { log } from '../../global.config';
import YAML from 'yamljs';
import morgan from 'morgan';
import cors from 'cors';
import { isShowDocs, restPort } from './config';
import { RegisterRoutes } from './routes';
import { removePropsDeep } from '../../utils/removePropsDeep';
import { errorHandler } from './middleware/errorHandler';
import { mongoDBConnect } from './middleware/mongoDB.connect';
import requestIp from 'request-ip';
import { setAccountId } from './middleware/setAccountId';

// ########################################################################
// controllers need to be referenced in order to get crawled by the generator
import './controllers/accounts.ctrl';
import './controllers/auth.ctrl';

export type MRequest = express.Request & {
  useragent: {
    isMobile?: boolean;
    isDesktop?: boolean;
    isBot?: boolean;
    browser?: string;
    version?: string;
    os?: string;
    platform?: string;
    source?: string;
  };
  locale: {
    source: string;
    language: string;
    region: string;
  };
  accountId?: string;
  clientIp?: string;
  getAccountId(): string | undefined;
};

const startSwagger = (app) => {
  try {
    const swaggerDoc = require('./swagger/swagger.json');

    swaggerDoc.servers[0].url = '/';

    app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

    const withoutSecurity = removePropsDeep(swaggerDoc, ['security', 'operationId']);

    const yaml = YAML.stringify(withoutSecurity);

    app.get('/swagger.yaml', (req, res) => {
      res.header('Content-Type', 'text/yaml');
      res.end(yaml);
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
};

const createApp = async () => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(
    bodyParser.json({
      limit: '50MB',
    }),
  );
  app.use(cors());
  app.use(cookieParser());
  app.use(methodOverride());
  app.use(userAgent.express());
  app.use(createLocaleMiddleware());

  if (log.level === 'debug') {
    app.use(morgan(`:method :url :status :res[content-length] - :response-time ms`));
  }

  await mongoDBConnect();

  app.use(setAccountId);
  app.use(requestIp.mw());

  if (isShowDocs) {
    startSwagger(app);
  }

  RegisterRoutes(app);

  app.use(errorHandler);

  return app;
};

createApp().then((app: Express) => {
  app.listen(restPort, () => {
    // eslint-disable-next-line no-console
    console.log(`🚀Server started on PORT ${restPort}`);
  });
});
