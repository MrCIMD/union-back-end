// Modules
import { ConfigModule } from '../config/config.module';
import { ConnectionOptions } from 'typeorm';
// Services
import { ConfigService } from '../config/config.service';
// Enum
import { Configuration } from '../config/config.keys';
import { TypeOrmModule } from "@nestjs/typeorm";

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
      return {
        name: config.get(Configuration.TYPEORM_DATABASE),
        type: config.get(Configuration.TYPEORM_CONNECTION),
        host: config.get(Configuration.TYPEORM_HOST),
        port: config.get(Configuration.TYPEORM_PORT),
        username: config.get(Configuration.TYPEORM_USERNAME),
        password: config.get(Configuration.TYPEORM_PASSWORD),
        database: config.get(Configuration.TYPEORM_DATABASE),
        synchronize: config.get(Configuration.TYPEORM_SYNCHRONIZE) === 'true',
        entities: [__dirname + '/../../**/entities/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        cli: {
          migrationsDir: __dirname + '/migrations/',
        },
      } as ConnectionOptions;
    },
  }),
];
