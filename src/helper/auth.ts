import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import { NextAuthOptions, getServerSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
// import prisma from "@/prisma/prisma";

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const config = {
  providers: [
    CredentialsProvider({   
        id: "loginCustom",
        name: 'Credentials',    
        credentials: {
            email: {},
            password: {}
        },    
        authorize(credentials) {          
            if (credentials?.email !== "demo@gmail.com" && credentials?.password !== "test") {
                throw new Error("Wrong username or password!!");
            }

            const user = {
                id: "1",
                email: "demo@gmail.com",
            }

            return {
                id: user.id,
                email: user.email,
            }                
        }
    }),
  ], // rest of your config
} satisfies NextAuthOptions

// Use it in server contexts
export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
  return getServerSession(...args, config)
}