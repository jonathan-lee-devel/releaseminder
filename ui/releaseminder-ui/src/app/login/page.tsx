import {login, signup} from "@/app/login/actions";
import SocialLogin from "@/app/components/login/SocialLogin";

export default async function LoginPage() {
  return (
    <div className="font-[sans-serif]">
      <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
          <div>
            <h2 className="lg:text-5xl text-4xl font-extrabold lg:leading-[55px] text-gray-800">
              Seamless Login for Exclusive Access
            </h2>
            <p className="text-sm mt-6 text-gray-800">Immerse yourself in a hassle-free login journey with our
              intuitively designed login form. Effortlessly access your account.</p>
          </div>

          <form className="max-w-md md:ml-auto w-full">
            <h3 className="text-gray-800 text-3xl font-extrabold mb-8">
              Sign In / Sign Up
            </h3>

            <div className="space-y-4">
              <div>
                <input name="email" type="email" autoComplete="email"
                       className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
                       placeholder="Email address"/>
              </div>
              <div>
                <input name="password" type="password" autoComplete="current-password"
                       className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
                       placeholder="Password"/>
              </div>
            </div>

            <div className="!mt-8">
              <button formAction={login} type="button"
                      className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                Sign In
              </button>
            </div>
            <div className="!mt-8">
              <button formAction={signup} type="button"
                      className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                Sign Up
              </button>
            </div>
            <div>
              <SocialLogin/>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
