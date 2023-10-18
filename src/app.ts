import express, {Application, Request, Response, NextFunction, Router} from 'express';
import optimist from 'optimist';
import cors from 'cors';
import path from 'path';
import http, {Server} from 'http';
import {registerRoutes} from './routes.js';
import { DbService } from './core/utils/db.service.js';
import { config } from './core/config/config.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// process.env.AWS_ACCESS_KEY_ID = config.aws.key;
// process.env.AWS_SECRET_ACCESS_KEY = config.aws.secretKey;

const router = Router();
const appArguments = optimist.argv;
const app: Application = express();

const port: number | string = process.env.PORT || config.httpPort;

runHttpServer();

function runHttpServer(): Server {
  configureExpress(appArguments.mode);
  configureCors();
  configureRouter();
  DbService.configureDatabase(appArguments.db);
  registerRoutes(router);

  return http.createServer(app).listen(port);
}

function configureCors(): void {
  app.use((_req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.use(cors({ origin: 'http://localhost:3000'}));

  app.set('trust proxy', true);
}

function configureExpress(serverMode: string): void {
  switch (serverMode) {
    case 'dev':
      app.use(express.static(__dirname.replace('build\\src', 'frontend')));
      app.use(express.static(__dirname.replace('build\\src', 'generated')));
      console.log(`[SERVER]: Development enabled. Server running on port ${port}`);
      break;
    case 'prod':
      //app.use(express.static(__dirname.replace('dist', '') + '/app-client'));
      console.log(`[SERVER]: Development enabled. Server running on port ${port}`);
      break;
    default:
      console.log(`[SERVER]: Development enabled. Server running on port ${port}`);
      break;
  }
}

function configureRouter(): void {

  app.get('/app', function(_req, res) {
    res.sendFile(path.join(__dirname.replace('build\\src', 'frontend'), '/index.html'));
  });

  app.get('/generated', function(_req, res) {
    res.sendFile(path.join(__dirname.replace('build\\src', 'generated'), '/generated-page.html'));
  });

  app.use(`/api`, router);
  router.use(express.json({limit: '50mb'}));
  router.use(express.urlencoded({extended: true}));
}
