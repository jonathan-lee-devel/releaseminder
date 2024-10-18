import {AuthUser} from '@supabase/supabase-js';

export type GetUserByEmailPayload = {
  requestingUser: AuthUser;
  email: string;
};
