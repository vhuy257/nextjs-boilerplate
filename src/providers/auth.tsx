"use client"
import { SessionProvider } from "next-auth/react";

type AuthProps = {
  children?: React.ReactNode;
  session?: any
}

export const NextAuthProvider = ({ children, session }: AuthProps) => {  
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
};