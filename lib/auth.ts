import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "./users-db";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (
          typeof credentials?.email !== "string" ||
          typeof credentials.password !== "string"
        ) {
          return null;
        }
        const userAccount = await getUserByEmail(credentials.email);

        if (userAccount != null) {
          const validAccount: boolean = await bcrypt.compare(
            credentials.password,
            userAccount.password,
          );
          if (validAccount) {
            return {
              id: String(userAccount.id),
              name: userAccount.name,
              email: userAccount.email,
            };
          } else return null;
        } else return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
});
