import NextAuth from "next-auth"
import { authOptions } from "@/helper/helper"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }