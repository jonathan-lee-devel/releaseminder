import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Request} from 'express';
import {ParamsDictionary} from 'express-serve-static-core';
import {SupabaseAuthStrategy} from 'nestjs-supabase-auth';
import {ExtractJwt} from 'passport-jwt';
import {ParsedQs} from 'qs';

import {SupabaseConfig} from '../../../../../apps/api/src/config/supabase.config';

@Injectable()
export class SupabaseStrategy extends PassportStrategy(
  SupabaseAuthStrategy,
  'supabase',
) {
  public constructor(supabaseConfig: SupabaseConfig) {
    super({
      supabaseUrl: supabaseConfig.url,
      supabaseKey: supabaseConfig.publicKey,
      supabaseOptions: {},
      supabaseJwtSecret: supabaseConfig.jwtSecret,
      extractor: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any): Promise<any> {
    await super.validate(payload);
  }

  async authenticate(req: Request<ParamsDictionary, any, any, ParsedQs>) {
    super.authenticate(req);
  }
}
