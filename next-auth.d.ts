import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role: string;
    permission: string;
  }

  interface Session {
    user: {
      id: string;
      role: string;
      permission: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string;
    permission: string;
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    role: string;
    permission: string;
  }
}