import {Injectable, OnModuleInit} from '@nestjs/common';
import {createClient, SupabaseClient} from '@supabase/supabase-js';

import {SupabaseConfig} from '../../../../../../apps/api/src/config/supabase.config';

@Injectable()
export class SupabaseStorageService implements OnModuleInit {
  private supabase: SupabaseClient;

  constructor(private readonly supabaseConfig: SupabaseConfig) {}

  onModuleInit() {
    this.supabase = createClient(
      this.supabaseConfig.url,
      this.supabaseConfig.secretKey,
    );
  }
}
