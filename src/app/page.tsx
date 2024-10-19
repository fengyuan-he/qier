'use client'
import Frame from "@/components/Frame";
import {List, ListItemButton, ListItemText} from "@mui/material";
import {useRouter} from "next/navigation";

export default function Page() {
    const {push} = useRouter()
    return (
        <Frame>
            <List>
                <ListItemButton onClick={() => push('./wenda')} disabled>
                    <ListItemText>问答区</ListItemText>
                </ListItemButton>
                <ListItemButton onClick={() => push('./jiuda')}>
                    <ListItemText>九大分区入口</ListItemText>
                </ListItemButton>
                <ListItemButton onClick={() => push('./huzhu')} disabled>
                    <ListItemText>家庭互助讨论组</ListItemText>
                </ListItemButton>
                <ListItemButton onClick={() => push('./zhengce')} disabled>
                    <ListItemText>理论研究和政策指导</ListItemText>
                </ListItemButton>
                <ListItemButton onClick={() => push('./jingyan')} disabled>
                    <ListItemText>经验分享区</ListItemText>
                </ListItemButton>
                <ListItemButton onClick={() => push('./zhuanji')} disabled>
                    <ListItemText>专技预约与反馈</ListItemText>
                </ListItemButton>
                <ListItemButton onClick={() => push('./zhidao')} disabled>
                    <ListItemText>特色课程指导</ListItemText>
                </ListItemButton>
                <ListItemButton onClick={() => push('./jiazhang')} disabled>
                    <ListItemText>家长课堂</ListItemText>
                </ListItemButton>
            </List>
        </Frame>
    )
}
