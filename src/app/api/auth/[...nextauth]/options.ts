import {AuthOptions} from "next-auth";
import Github from "next-auth/providers/github";
import env from "@/env";

export default {
    providers: [
        Github({
            clientId: env('GITHUB_ID'),
            clientSecret: env('GITHUB_SECRET')
        })
    ]
} as AuthOptions