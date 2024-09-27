import { createClient } from '@/lib/supabase/supabase-server-client'
import { redirect } from 'next/navigation'

export async function GET() {
  const supabase = createClient()

  await supabase.auth.signOut()

  redirect('/login')
}
