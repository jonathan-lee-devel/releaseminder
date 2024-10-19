import {DynamicModule, Logger, Module, Provider} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {drizzle} from 'drizzle-orm/node-postgres';
import {Pool} from 'pg';

interface DbModuleOptions {
  logger: Logger;
  serviceName: string;
  schema: any;
  connectionUrl?: string;
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [],
  exports: [],
})
export class DbModule {
  static register({
    logger,
    serviceName,
    schema,
    connectionUrl,
  }: DbModuleOptions): DynamicModule {
    const providers: Provider[] = [
      {
        provide: `${serviceName}_DATABASE_CONNECTION`,
        useFactory: (configService: ConfigService) => {
          const pool = new Pool({
            connectionString:
              connectionUrl ??
              configService.getOrThrow<string>(`${serviceName}_DATABASE_URL`),
          });
          logger.log(
            `Connected to ${
              connectionUrl ??
              configService.getOrThrow<string>(`${serviceName}_DATABASE_URL`)
            }`,
          );
          return drizzle(pool, {schema: {...schema}});
        },
        inject: [ConfigService],
      },
    ];
    return {
      module: DbModule,
      providers,
      exports: providers,
    };
  }
}
