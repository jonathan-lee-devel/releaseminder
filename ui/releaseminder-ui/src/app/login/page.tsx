import {Button} from "@/components/ui/button";
import Link from "next/link";
import {login, signup} from "@/app/login/actions";

export default function LoginPage() {
  return (
    <div
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">\
        <div className="w-full max-w-xs">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                E-mail
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email" name={'email'} type="text" placeholder="E-mail"/>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password" name={'password'} type="password" placeholder="******************"/>
            </div>
            <div className="flex items-center justify-between">
              <Button variant={'default'} formAction={login}>Sign In</Button>
              <Button variant={'default'} formAction={signup}>Sign Up</Button>
              <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
