import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private reflector: Reflector) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '123456789',
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async validate(payload: any) {
    return { userId: payload.user.id, email: payload.user.email };
  }
}
