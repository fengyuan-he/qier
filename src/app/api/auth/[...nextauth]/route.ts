import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import env from "@/env";

const handler = NextAuth({
    providers: [
        Github({
            clientId: env('GITHUB_ID'),
            clientSecret: env('GITHUB_SECRET')
        })
    ]
})

export {handler as GET, handler as POST}