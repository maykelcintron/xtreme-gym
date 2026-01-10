import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import prisma  from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import { UserAuthSchema } from './schema/user';
import { PrismaAdapter } from '@auth/prisma-adapter';
  
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
  },
  // @ts-ignore
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      async authorize(credentials) {
        UserAuthSchema.safeParse(credentials);

        const parsedCredentials = UserAuthSchema.safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        const user = await prisma.user.findUnique( { where: { email: email.toLowerCase() } } );

        if (!user) return null;

        if (!await bcrypt.compareSync(password, user.password!)) return null;

        const {password: _, ...rest} = user;
        
        return rest;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Si el usuario se acaba de loguear, pasamos su ID al token
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Pasamos los datos del token a la sesión para que estén disponibles en el cliente
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    }
  }
};

export const { signIn, signOut, auth, handlers: { GET, POST } } = NextAuth(authConfig);