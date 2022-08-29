import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import usersRouter from './routes/users.routes';
import { connectToDatabase } from './database';
import errorHandler from './middlewares/error-handler.middleware';
import logger from './utils/log.util';

class App {
  public express: express.Application;

  private port = process.env.PORT;

  constructor() {
    this.express = express();
    this.express.use(express.json());
    this.express.use(cors());
    this.handleConnectionToDatabase();
    this.routes();
    this.middlewares();
  }

  private middlewares(): void {
    this.express.use(errorHandler);
  }

  private handleConnectionToDatabase(): void {
    connectToDatabase()
      .then(() => {
        logger.info('📦  Connected to database!');
        this.startServer();
      })
      .catch((error) => {
        logger.error('❌  Error when initializing the database.');
        logger.error(error);
      });
  }

  private routes(): void {
    this.express.use(usersRouter);
  }

  private startServer(): void {
    this.express.listen(this.port, () => {
      logger.info(`🚀  Server started on port ${this.port}.`);
    });
  }
}

export default new App().express;
