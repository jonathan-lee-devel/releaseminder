import {Module} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

import {SupabaseStorageService} from './services/supabase-storage/supabase-storage.service';

@Module({
  providers: [ConfigService, SupabaseStorageService],
  exports: [SupabaseStorageService],
})
export class SupabaseStorageModule {}
