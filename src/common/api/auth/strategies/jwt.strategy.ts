import { InjectRepository } from '@nestjs/typeorm';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';

import { IJwt } from '../interface';
import { ConfigService } from '../../../config/config.service';
import { User } from '../../../entities';
import { Configuration } from '../../../config/config.keys';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _config: ConfigService,
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: _config.get(Configuration.APP_SECRET_KEY),
    });
  }

  public async validate(jwt: IJwt) {
    const { email } = jwt;
    const user = await this.repository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException();
    }

    return jwt;
  }
}
