import 'tsconfig-paths/register';
import express from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import { Routes } from '@/interfaces/routes.interface';
import errorMiddleware from './lib/middlewares/error.middleware';
import config from './config';

const { port, mongoConnectionUrl } = config;

class App {
  public app: express.Application;

  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = port;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`=================================`);
      console.log(`🚀 App listening on the port ${this.port}`);
      console.log(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
    try {
      const conn = await connect(mongoConnectionUrl);
      console.log(`Mongo db connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
