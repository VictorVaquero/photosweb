import { auth, signIn, signOut } from "@/auth"

export function SignIn() {
    return (
        <form
            action={async () => {
                "use server"
                await signIn("cognito")
            }}
        >
            <button type="submit">Signin</button>
        </form>
    )
}


export function SignOut() {
    return (
        <form
            action={async () => {
                "use server"
                await signOut()
            }}
        >
            <button type="submit">Sign Out</button>
        </form>
    )
}

export async function UserAvatar() {
    const session = await auth()
    if (!session?.user) return null

    //<Image src={session.user.image} alt="User Avatar" />
    return (
        <div>
            {session.user.name}
        </div>
    )
}