import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Request} from 'express';
import {ParamsDictionary} from 'express-serve-static-core';
import {UNAUTHORIZED} from 'nestjs-supabase-auth';
import {ExtractJwt} from 'passport-jwt';
import {ParsedQs} from 'qs';

import {SupabaseConfig} from '../../../../../apps/api/src/config/supabase.config';
import {SupabaseAuthStrategy} from '../passport/passport-supabase.strategy';

@Injectable()
export class SupabaseJwtStrategy extends PassportStrategy(
  SupabaseAuthStrategy,
  'supabase-jwt',
) {
  public constructor(
    supabaseConfig: SupabaseConfig,
    private readonly jwtService: JwtService,
  ) {
    super({
      supabaseUrl: supabaseConfig.url,
      supabaseKey: supabaseConfig.publicKey,
      supabaseOptions: {},
      supabaseJwtSecret: supabaseConfig.jwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: supabaseConfig.jwtSecret,
      extractor: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any): Promise<any> {
    await super.validate(payload);
  }

  async authenticate(req: Request<ParamsDictionary, any, any, ParsedQs>) {
    const accessToken = this.extractor(req);
    if (!accessToken) {
      this.fail(UNAUTHORIZED, 401);
      return;
    }
    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(accessToken);
    } catch (error) {
      this.logger.error(error);
      this.fail(UNAUTHORIZED, 401);
      return;
    }
    await this.validate(payload);
  }
}
