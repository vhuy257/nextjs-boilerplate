import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { NextAuthOptions, getServerSession } from "next-auth";
import { API_URL } from "@/constant/constant";
import CredentialsProvider from "next-auth/providers/credentials";
import ky from "ky";
import { QueryClient } from "@tanstack/react-query";

export const kyCustom = ky.create({ prefixUrl: API_URL.BASE_URL })

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            id: "loginCustom",
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                try {
                    const res: any = await kyCustom.post(API_URL.AUTH_LOGIN, {
                            json: {
                                email: credentials?.email,
                                password: credentials?.password,
                            },
                    }).json();
                    
                    return {
                        id: res?.userId,
                        email: credentials?.email,
                        accessToken: res?.accessToken
                    }
                } catch (error: any) {
                    const errorJson = await error.response.json();
                    throw new Error(errorJson?.message);
                }
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
        error: "/",
    },   
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                const u = user as unknown as any;
                return {
                    ...token,
                    accessToken: u.accessToken,
                };
            }

            return token;
        },
        session({ session, token }: any) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    accessToken: token.accessToken,
                },
            };
        }
    }   
};

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}

export const queryClient = new QueryClient()
