import {getServerSession} from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/app/prisma";

export default async function auth() {
    const session = await getServerSession(options)
    if (!session) return null
    const {user} = session
    if (!user) return null
    const {name} = user
    if (!name) return null
    return prisma.user.upsert({
        where: {
            name
        },
        update: {},
        create: {
            name,
            master: false
        },
        select: {
            master: true
        }
    })
}