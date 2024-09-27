'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/supabase-server-client'
import {Provider} from '@supabase/auth-js'

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

async function signInWithOAuthProvider(provider: Provider) {
  const supabase = createClient()

  const {data, error} = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: 'http://localhost:3000/auth/callback',
    }
  })

  if (error || !data.url) {
    console.log(error)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect(data.url)
}

export async function loginWithGoogle() {
  await signInWithOAuthProvider('google')
}

export async function loginWithGithub() {
  await signInWithOAuthProvider('github')
}

