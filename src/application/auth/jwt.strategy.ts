import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { User } from '../../domain/entities/user';
import { JWT_SECRET } from './auth.consts';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: any, done: any): Promise<User> {
    if (!payload) {
      return done(new UnauthorizedException(), false);
    }

    return done(undefined, payload);
  }
}
