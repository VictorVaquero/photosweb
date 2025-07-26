import { auth } from "@/auth";
import PhotoList from "../components/photoList";
import { SignIn, SignOut, UserAvatar } from "./_login";

export default async function Home() {
  const session = await auth()

  return (
    <div>
      <header className="p-4 flex flex-row justify-between items-center">
        <h2 className="text-2xl">Photos</h2>
        {!session || !session?.user ? <SignIn /> : <><SignOut /><UserAvatar /></>}
      </header>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <PhotoList />
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
      </div>

    </div>
  );
}
