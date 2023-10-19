import { connect } from 'odbc';
import { Logger } from '@nestjs/common';

export class SybaseService {
  private connection_uri = `DSN=${process.env.BASE};UID=${process.env.USER};PWD=${process.env.PWD}`;
  private readonly logger = new Logger(SybaseService.name);

  constructor() {}

  async query(sql: string): Promise<any> {
    const connection = await connect(this.connection_uri);
    console.log(this.connection_uri)
    console.log('Connected to Sybase', connection);
    const result = await connection.query(sql);
    await connection.close();
    return result;
  }
}
