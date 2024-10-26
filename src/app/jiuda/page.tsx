'use client'

import Frame from "@/components/Frame";
import {Card, CardContent, CardHeader, Grid2, Link, Stack} from "@mui/material";
import {ReactNode} from "react";
import SpLD from "@/markdown/SpLD.md";
import ID from "@/markdown/ID.md";
import ASD from "@/markdown/ASD.md";
import ADHD from "@/markdown/ADHD.md";
import PD from "@/markdown/PD.md";
import HI from "@/markdown/HI.md";
import VI from "@/markdown/VI.md";
import SLI from "@/markdown/SLI.md";
import MI from "@/markdown/MI.md";

interface ItemProps {
    name: string
    description: ReactNode
}

function Item({name, description}: ItemProps) {
    return (
        <Card id={name}>
            <CardHeader title={name}/>
            <CardContent>{description}</CardContent>
        </Card>
    )
}

const array: ItemProps[] = [
    {
        name: '特殊学习障碍 (SpLD)',
        description: <SpLD/>
    },
    {
        name: '智力障碍 (ID)',
        description: <ID/>
    },
    {
        name: '孤独症（自闭症）谱系障碍 (ASD)',
        description: <ASD/>
    },
    {
        name: '注意缺陷/多动障碍 (AD/HD)',
        description: <ADHD/>
    },
    {
        name: '肢体伤残 (PD)',
        description: <PD/>
    },
    {
        name: '听力障碍 (HI)',
        description: <HI/>
    },
    {
        name: '视觉障碍 (VI)',
        description: <VI/>
    },
    {
        name: '言语障碍 (SLI)',
        description: <SLI/>
    },
    {
        name: '精神病 (MI)',
        description: <MI/>
    }
]

export default function Page() {
    return (
        <Frame name="九大分区入口">
            <Grid2 sx={{my: 2}} container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                {array.map(({name}) => (
                    <Grid2 key={name} size={{xs: 4}}>
                        <Link href={`#${name}`}>{name}</Link>
                    </Grid2>
                ))}
            </Grid2>
            <Stack spacing={2} my={3}>
                {array.map((value) => <Item key={value.name} {...value}/>)}
            </Stack>
        </Frame>
    )
}