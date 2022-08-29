import express from 'express';

class App {
  public express: express.Application;

  private port = 5000;

  constructor() {
    this.express = express();
    this.startServer();
  }

  private startServer(): void {
    this.express.listen(this.port, () => {
      console.log(`🚀  Server started on port ${this.port}`);
    });
  }
}

export default new App().express;
