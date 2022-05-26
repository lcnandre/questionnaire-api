/* istanbul ignore file */
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AppController } from '../../io/controllers/app.controller';
import { AppService } from '../services/app.service';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      entities: ['./dist/domain/entities'],
      entitiesTs: ['./src/domain/entities'],
      type: 'postgresql',
      host: 'ec2-54-165-184-219.compute-1.amazonaws.com',
      dbName: 'd6na20247k2ihv',
      user: 'lfynpxamyasleo',
      password: '2b14a32f18cc2d4343805d2da0ef37755fe97b206f54e50035e212b708427b4b',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
