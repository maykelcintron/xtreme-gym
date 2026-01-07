import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import prisma  from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import { UserAuthSchema } from './schema/user';
 
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        UserAuthSchema.safeParse(credentials);

        const parsedCredentials = UserAuthSchema.safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        console.log({ email, password });

        const user = await prisma.user.findUnique( { where: { email } } );

        if (!user) return null;

        if (!await bcrypt.compareSync(password, user.password)) return null;

        const {password: _, ...rest} = user;
        
        return rest;
      },
    }),
  ],
};

export const { signIn, signOut, auth } = NextAuth(authConfig);