import NextAuth, { DefaultSession } from "next-auth"
import Cognito from "next-auth/providers/cognito"

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id_token: string
    } & DefaultSession["user"]
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Cognito({ authorization: { params: { scope: "openid profile email phone" } } })],
    callbacks: {
        jwt({ token, user, account }) {
            if (user) token.id = user.id
            if (account?.id_token) token.id_token = account.id_token
            return token
        },
        session: ({ session, token }) => ({
            ...session,
            user: {
                ...session.user,
                id: token.sub,
                id_token: token.id_token
            },
        }),
    },
})