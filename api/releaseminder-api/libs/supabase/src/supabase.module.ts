import {Module} from '@nestjs/common';
import {SupabaseService} from '@rm-supabase/supabase/services/supabase.service';

@Module({
  providers: [SupabaseService],
  exports: [SupabaseService],
})
export class SupabaseModule {}
