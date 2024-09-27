'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/supabase-server-client'

export async function login(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const parsedFormData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(parsedFormData)

  if (error) {
    console.log(error)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function redirectOrHandleOAuthError(error: unknown, url?: string) {
  if (error || !url) {
    console.log(error)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect(url)
}

export async function loginWithGoogle() {
  const supabase = createClient()

  const {data, error} = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000/auth/callback',
    }
  })

  await redirectOrHandleOAuthError(error, data.url ?? undefined);
}

export async function loginWithGithub() {
  const supabase = createClient()

  const {data, error} = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: 'http://localhost:3000/auth/callback',
    }
  })

  await redirectOrHandleOAuthError(error, data.url ?? undefined);
}

