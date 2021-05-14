import { Module } from '@nestjs/common';
// Service
import { ConfigService } from "./common/config/config.service";
// Config keys
import { Configuration } from "./common/config/config.keys";
// Modules
import { ConfigModule } from "./common/config/config.module";

@Module({
  imports: [
    ConfigModule
  ],
})
export class AppModule {
  static PORT: number | string;
  static HTTP: string;
  static HOST: string;

  constructor(private readonly _config: ConfigService) {
    AppModule.PORT = this._config.get(Configuration.APP_PORT);
    AppModule.HTTP = this._config.get(Configuration.APP_HTTP_PROTOCOL);
    AppModule.HOST = this._config.get(Configuration.APP_HOST);
  }
}
