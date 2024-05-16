import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(req: Request, payload) {
    const refreshToken = req.get('authorization').replace('Bearer', '').trim();

    return {
      id: payload.id,
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      refreshToken,
    };
  }
}
