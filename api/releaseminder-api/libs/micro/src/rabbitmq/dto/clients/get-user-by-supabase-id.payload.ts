import {AuthUser} from '@supabase/supabase-js';

export type GetUserBySupabaseIdPayload = {
  requestingUser: AuthUser;
  supabaseId: string;
};
