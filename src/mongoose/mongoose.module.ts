import { Module } from '@nestjs/common';
import { MongooseService } from './mongoose.service';
import { MongooseModule as MongooseNestjs } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseNestjs.forRoot(process.env.MONGO_URI),
  ],
  providers: [MongooseService],
})
export class MongooseModule {}
