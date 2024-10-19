'use client'
import Frame from "@/components/Frame";
import {List, ListItemButton, ListItemText} from "@mui/material";
import {useRouter} from "next/navigation";

interface ItemProps {
    name: string
    url: string
}

function Item({name, url}: ItemProps) {
    const {push} = useRouter()
    return (
        <ListItemButton onClick={() => push(`./${url}`)}>
            <ListItemText>{name}</ListItemText>
        </ListItemButton>
    )
}

const array: ItemProps[] = [
    {
        name: '理论研究和政策指导',
        url: 'zhengce'
    },
    {
        name: '九大分区入口',
        url: 'jiuda'
    },
    {
        name: '专技预约与反馈',
        url: 'zhuanji'
    },
    {
        name: '特色课程指导',
        url: 'zhidao'
    },
    {
        name: '经验分享区',
        url: 'jingyan'
    },
    {
        name: '家长课堂',
        url: 'jiazhang'
    },
    {
        name: '问答区',
        url: 'wenda'
    },
    {
        name: '家庭互助讨论组',
        url: 'huzhu'
    }
]

export default function Page() {
    return (
        <Frame>
            <List>
                {array.map((value, index) => <Item {...value} key={index}/>)}
            </List>
        </Frame>
    )
}
