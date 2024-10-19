'use client'

import Frame from "@/components/Frame";
import {Card, CardHeader, Grid2} from "@mui/material";

interface ItemProps {
    name: string
}

function Item({name}: ItemProps) {
    return (
        <Card>
            <CardHeader title={name}/>
        </Card>
    )
}

const array: ItemProps[] = [
    {
        name: '听力障碍'
    },
    {
        name: '视力障碍'
    },
    {
        name: '智力障碍'
    },
    {
        name: '自闭症'
    },
    {
        name: '情绪行为'
    },
    {
        name: '注意缺陷障碍',
    },
    {
        name: '语言障碍',
    },
    {
        name: '肢体残疾',
    },
    {
        name: '多重障碍'
    }
]

export default function Page() {
    return (
        <Frame name="九大分区入口">
            <Grid2 sx={{my: 2}} container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                {array.map((value, index) => (
                    <Grid2 key={index} size={{xs: 2, sm: 4, md: 4}}>
                        <Item {...value}/>
                    </Grid2>
                ))}
            </Grid2>
        </Frame>
    )
}