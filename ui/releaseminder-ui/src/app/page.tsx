import {createClient} from "@/lib/supabase/supabase-server-client";
import {redirect} from "next/navigation";

export default async function Home() {
  const supabase = createClient()
  const {data, error} = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-5xl font-bold">ReleaseMinder</h1>
        <div className={'flex align-middle items-center justify-center'}>
          <p>Hello {data.user.email}</p>
        </div>
      </main>
    </div>
  );
}
