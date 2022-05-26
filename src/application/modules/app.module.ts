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
      dbName: 'questionnaire',
      type: 'postgresql',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
