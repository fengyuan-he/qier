import useSWR from "swr";
import {ReactNode, useMemo} from "react";
import Report from "@/components/Report";
import {LinearProgress} from "@mui/material";
import {z, ZodTypeAny} from "zod";
import VError from "verror";

export default function Swr<Z extends ZodTypeAny>({url, value, children}: {
    url: string
    value: Z
    children: (res: z.infer<Z>) => ReactNode
}) {
    const schema = useMemo(() => z.object({
        value
    }).strict().or(z.object({
        reason: z.object({
            name: z.string(),
            message: z.string(),
            stack: z.string().optional()
        })
    }).strict()), [value])
    const {data, error, mutate} = useSWR(url, async () => {
        const result = schema.parse(await fetch(url).then((res) => res.json()))
        if ('reason' in result) {
            const {name, message, stack} = result.reason
            const reason = new Error(message)
            reason.name = name
            const temp = reason.stack
            reason.stack = stack
            const v = new VError(reason, '%s', url)
            v.stack = temp
            throw v
        }
        return result.value
    })
    if (error) return <Report error={error} onRetry={mutate}/>
    if (data === undefined) return <LinearProgress/>
    return children(data)
}