import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { NextAuthOptions } from "next-auth";
import { config } from "./auth";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    ...config,
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
};
