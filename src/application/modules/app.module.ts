import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';

import { QuestionnairesModule } from './questionnaires.module';
import { AppController } from '../../io/controllers/app.controller';
import { UserModule } from './user.module';
import { APP_GUARD } from '@nestjs/core';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { User } from '../../domain/entities/user';

@Module({
  imports: [
    UserModule,
    QuestionnairesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: process.env.NODE_ENV !== 'production',
      playground: false,
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    MikroOrmModule.forFeature({
      entities: [User]
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlAuthGuard
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
