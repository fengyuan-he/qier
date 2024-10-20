'use client'
import {createContext, ReactNode, useContext} from "react";
import useSWR, {SWRResponse} from "swr";
import {z} from "zod";
import app from "@/app";

const schema = z.object({
    name: z.string(),
    image: z.string(),
    master: z.boolean()
}).strict().optional()
const fetcher = app(schema)
const context = createContext<SWRResponse<z.infer<typeof schema>> | undefined>(undefined)

export default function UserProvider({children}: {
    children: ReactNode
}) {
    return <context.Provider value={useSWR('/api/auth', fetcher)}>{children}</context.Provider>
}

export function useUser() {
    const swr = useContext(context)
    if (!swr) throw new Error('useUser must be used within the provider')
    return swr
}