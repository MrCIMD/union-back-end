// Modules
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '../../config/config.module';
import { Configuration } from '../../config/config.keys';
// Controllers
import { AuthController } from './auth.controller';
// Services
import { AuthService } from './auth.service';
import { ConfigService } from '../../config/config.service';
// Entities
import { User } from '../../entities';
// Strategies
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          secret: config.get(Configuration.APP_SECRET_KEY),
          signOptions: { expiresIn: 60 * 60 },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ConfigService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule { }
