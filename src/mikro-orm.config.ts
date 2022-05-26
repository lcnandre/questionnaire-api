/* istanbul ignore file */
import { LoadStrategy } from '@mikro-orm/core';
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

const config: MikroOrmModuleOptions = {
  type: 'postgresql',
  host: 'ec2-54-165-184-219.compute-1.amazonaws.com',
  user: 'lfynpxamyasleo',
  password: '2b14a32f18cc2d4343805d2da0ef37755fe97b206f54e50035e212b708427b4b',
  dbName: 'd6na20247k2ihv',
  driverOptions: {
    connection: { ssl: { rejectUnauthorized: false } },
  },
  entities: ['./dist/domain/entities/**/*.js'],
  entitiesTs: ['./src/domain/entities/**/*.ts'],
  debug: process.env.NODE_ENV !== 'production',
  loadStrategy: LoadStrategy.JOINED,
  highlighter: new SqlHighlighter(),
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    disableForeignKeys: false,
    path: './dist/application/migrations',
    pathTs: './src/application/migrations',
  },
};

export default config;
