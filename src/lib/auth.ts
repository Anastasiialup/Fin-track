/* eslint-disable no-param-reassign */
import { compare } from 'bcryptjs';
import { eq } from 'drizzle-orm';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from '../../database/drizzle';
import { users } from '../../database/schema';

type UserType = {
  id: string;
  email: string;
  username: string;
};

declare module 'next-auth' {
  /* eslint-disable-next-line */
  interface Session extends UserType {}
  /* eslint-disable-next-line */
  interface User extends UserType {}
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email.toString()))
          .limit(1);

        if (user.length === 0) return null;

        const isPasswordValid = await compare(credentials.password.toString(), user[0].password!);
        if (!isPasswordValid) return null;

        return {
          id: user[0].id.toString(),
          email: user[0].email.toString(),
          username: user[0].username.toString(),
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.username = token.username as string;

      return session;
    },
  },
});
