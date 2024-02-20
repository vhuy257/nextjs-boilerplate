import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import { NextAuthOptions, getServerSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    },
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
    ],
    secret: process.env.NEXTAUTH_SECRET,      
    pages: {
        signIn: '/login',
        error: '/'
    },  
    callbacks: {
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    ...token
                },
            };
        },
        jwt: ({ token, user }) => {
            if (user) {
                const u = user as unknown as any;
                
                return {
                    ...token,
                    ...u
                };
            }

            return token;
        },
    },
}

// Use it in server contexts
export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
  return getServerSession(...args, authOptions)
}