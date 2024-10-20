import {Configuration, Value} from '@itgorillaz/configify/dist';
import {IsNotEmpty} from 'class-validator';

@Configuration()
export class SupabaseConfig {
  @IsNotEmpty()
  @Value('SUPABASE_URL')
  url: string;

  @IsNotEmpty()
  @Value('SUPABASE_PUBLIC_KEY')
  publicKey: string;

  @IsNotEmpty()
  @Value('SUPABASE_JWT_SECRET')
  jwtSecret: string;

  @IsNotEmpty()
  @Value('SUPABASE_SECRET_KEY')
  secretKey: string;
}
