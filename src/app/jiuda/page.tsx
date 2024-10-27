'use client'

import Frame from "@/components/Frame";
import {Button, Card, CardContent, CardHeader, Grid2, Stack} from "@mui/material";
import {ReactNode} from "react";
import SpLD from "@/markdown/SpLD.mdx";
import ID from "@/markdown/ID.mdx";
import ASD from "@/markdown/ASD.mdx";
import ADHD from "@/markdown/ADHD.mdx";
import PD from "@/markdown/PD.mdx";
import HI from "@/markdown/HI.mdx";
import VI from "@/markdown/VI.mdx";
import SLI from "@/markdown/SLI.mdx";
import MI from "@/markdown/MI.mdx";
import {
    DoNotStep,
    ExtensionOff,
    HearingDisabled,
    NoBackpack,
    PersonOff,
    PowerOff,
    RemoveDone,
    SpeakerNotesOff,
    VisibilityOff
} from "@mui/icons-material";
import {useRouter} from "next/navigation";

interface ItemProps {
    name: string
    description: ReactNode
    icon: ReactNode
}

function Item({name, description, icon}: ItemProps) {
    return (
        <Card id={name}>
            <CardHeader title={name} avatar={icon}/>
            <CardContent>{description}</CardContent>
        </Card>
    )
}

const array: ItemProps[] = [
    {
        name: '特殊学习障碍 (SpLD)',
        description: <SpLD/>,
        icon: <NoBackpack/>
    },
    {
        name: '智力障碍 (ID)',
        description: <ID/>,
        icon: <ExtensionOff/>
    },
    {
        name: '孤独症（自闭症）谱系障碍 (ASD)',
        description: <ASD/>,
        icon: <PersonOff/>
    },
    {
        name: '注意缺陷/多动障碍 (AD/HD)',
        description: <ADHD/>,
        icon: <PowerOff/>
    },
    {
        name: '肢体伤残 (PD)',
        description: <PD/>,
        icon: <DoNotStep/>
    },
    {
        name: '听力障碍 (HI)',
        description: <HI/>,
        icon: <HearingDisabled/>
    },
    {
        name: '视觉障碍 (VI)',
        description: <VI/>,
        icon: <VisibilityOff/>
    },
    {
        name: '言语障碍 (SLI)',
        description: <SLI/>,
        icon: <SpeakerNotesOff/>
    },
    {
        name: '精神病 (MI)',
        description: <MI/>,
        icon: <RemoveDone/>
    }
]

export default function Page() {
    const {push} = useRouter()
    return (
        <Frame name="九大分区入口">
            <Grid2 sx={{my: 2}} container>
                {array.map(({name, icon}) => (
                    <Grid2 key={name} size={{xs: 12, sm: 6, md: 4}}>
                        <Button startIcon={icon} onClick={() => push(`#${name}`)}>{name}</Button>
                    </Grid2>
                ))}
            </Grid2>
            <Stack spacing={2} my={3}>
                {array.map((value) => <Item key={value.name} {...value}/>)}
            </Stack>
        </Frame>
    )
}