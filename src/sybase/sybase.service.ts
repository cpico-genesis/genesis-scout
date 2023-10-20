var Sybase = require('sybase');
import { Logger } from '@nestjs/common';

export class SybaseService {
  private readonly logger = new Logger(SybaseService.name);

  private db = new Sybase(
    process.env.HOST,
    process.env.PORT,
    process.env.BASE,
    process.env.USER,
    process.env.PWD,
  );

  constructor() {
    this.db.connect((err) => {
      if (err) {
        this.logger.error('Something went wrong while connecting to Sybase');
        throw new Error(err);
      }
      this.logger.log('Connected to Sybase' + process.env.BASE);
    });
  }

  async query(sql: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.query(sql, function (err, data) {
        if (err) {
          this.logger.error('Something went wrong while connecting to Sybase');
          reject(err);
          throw new Error(err);
        }
        resolve(data);
      });
    });
  }
}
