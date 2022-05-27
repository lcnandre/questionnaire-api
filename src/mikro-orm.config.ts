/* istanbul ignore file */
import { LoadStrategy } from '@mikro-orm/core';
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

const config: MikroOrmModuleOptions = {
  type: 'postgresql',
  host: parseConnectionString(process.env.DATABASE_URL, 'host'),
  port: +parseConnectionString(process.env.DATABASE_URL, 'port'),
  user: parseConnectionString(process.env.DATABASE_URL, 'user'),
  password: parseConnectionString(process.env.DATABASE_URL, 'password'),
  dbName: parseConnectionString(process.env.DATABASE_URL, 'database'),
  driverOptions: {
    connection: { ssl: { rejectUnauthorized: false } },
  },
  entities: ['./dist/domain/entities/**/!(*.spec).js'],
  entitiesTs: ['./src/domain/entities/**/!(*.spec).ts'],
  debug: process.env.NODE_ENV !== 'production',
  loadStrategy: LoadStrategy.JOINED,
  highlighter: new SqlHighlighter(),
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    disableForeignKeys: false,
    path: './dist/application/migrations',
    pathTs: './src/application/migrations',
  },
  seeder: {
    path: './dist/application/seeders',
    pathTs: './src/application/seeders',
    glob: '!(*.spec).{js,ts}'
  }
};

function parseConnectionString(connectionStr: string, path: string): string {
  const regex = new RegExp(/postgres\:\/\/(?<user>.+)\:(?<password>.+)\@(?<host>.+)\:(?<port>.+)\/(?<database>.+)/g);
  const matches = regex.exec(connectionStr);
  return matches.groups[path].trim();
}

export default config;
