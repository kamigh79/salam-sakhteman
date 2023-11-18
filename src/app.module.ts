import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    HttpModule,
    RedisModule,
    UserModule,
    MongooseModule.forRoot(process.env.MONGO_DB_URI, {
      dbName: process.env.MONGO_DB_DATABASE,
      connectionFactory: (connection) => {
        if (connection.readyState) {
          console.log('Mongo database connected successfully.');
        }

        return connection;
      },
    }),
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
