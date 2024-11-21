'use client'
import Frame from "@/components/Frame";
import {
    Box,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import Lunbo from "@/components/Lunbo";
import {useRouter} from "next/navigation";

interface ItemProps {
    name: string
    url: string
}

function Item({name, url}: ItemProps) {
    return (
        <TableCell sx={{fontSize: 20}} align="center">
            <Link href={url}>{name}</Link>
        </TableCell>
    )
}

const rows: ItemProps[][] = [
    [
        {
            name: '评估',
            url: '/pinggu'
        },
        {
            name: '分区入口',
            url: '/fenqu'
        },
        {
            name: '家庭支持',
            url: '/jiating'
        }
    ],
    [
        {
            name: '专技预约系统',
            url: '/zhuanji'
        },
        {
            name: '问答区',
            url: '/wenda'
        },
        {
            name: '辅助程序入口',
            url: '/fuzhu'
        }
    ],
    [
        {
            name: '教师专业发展',
            url: '/jiaoyu'
        },
        {
            name: '各地支持机构一览',
            url: '/gedi'
        },
        {
            name: '特色课程',
            url: '/kecheng'
        }
    ]
]

const imageData: {
    title: string
    subtitle: string
    src: string
    file: string
}[] = [
    {
        title: "听觉代偿型听力辅助智能眼镜设计与推广",
        subtitle: "常东旭",
        src: "/听觉代偿型听力辅助智能眼镜设计与推广.png",
        file: "/听觉代偿型听力辅助智能眼镜设计与推广_常东旭.pdf"
    },
    {
        title: "多动症患儿心理行为干预的临床效果分析",
        subtitle: "程立欣",
        src: "/多动症患儿心理行为干预的临床效果分析.png",
        file: "/多动症患儿心理行为干预的临床效果分析_程立欣.pdf"
    },
    {
        title: "孤独症谱系障碍和注意缺陷多动障碍共患与鉴别研究进展",
        subtitle: "段彩灵",
        src: "/孤独症谱系障碍和注意缺陷多动障碍共患与鉴别研究进展.png",
        file: "/孤独症谱系障碍和注意缺陷多动障碍共患与鉴别研究进展_段彩灵.pdf"
    },
    {
        title: "师范专业认证背景下课程目标达成情况分析评价改革研究——以《特殊儿童测量与评估》课程为例",
        subtitle: "宋健",
        src: "/师范专业认证背景下课程目标达成情况分析评价改革研究——以《特殊儿童测量与评估》课程为例.png",
        file: "/师范专业认证背景下课程目标达成情况分析评价改革研究——以《特殊儿童测量与评估》课程为例_宋健.pdf"
    },
    {
        title: "新时代背景下特殊教育学校职业教育模式的探索",
        subtitle: "陈莎茵",
        src: "/新时代背景下特殊教育学校职业教育模式的探索.png",
        file: "/新时代背景下特殊教育学校职业教育模式的探索_陈莎茵.pdf"
    },
    {
        title: "智力障碍学生书面语句法偏误原因与对策分析",
        subtitle: "征文维",
        src: "/智力障碍学生书面语句法偏误原因与对策分析.png",
        file: "/智力障碍学生书面语句法偏误原因与对策分析_征文维.pdf"
    },
]

export default function Page() {
    const {push} = useRouter()
    return (
        <Frame>
            <Box position="relative">
                <Lunbo items={["/头图.png", "/头图1.png"]}/>
                <Typography
                    position="absolute"
                    bottom={0}
                    left="50%"
                    sx={{transform: "translateX(-50%)"}}
                >
                    特殊人群有力量 专业人士更科学 教育师资更进步
                </Typography>
            </Box>
            <ImageList>
                {imageData.map(({title, subtitle, src, file}) => (
                    <ImageListItem key={src} onClick={() => push(file)} sx={{cursor: 'pointer'}}>
                        <Image
                            src={src}
                            alt={title}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{width: '100%', height: 'auto'}}
                        />
                        <ImageListItemBar title={title} subtitle={subtitle}/>
                    </ImageListItem>
                ))}
            </ImageList>
            <TableContainer>
                <Table>
                    <TableBody>
                        {rows.map((value, index) => (
                            <TableRow key={index}>
                                {value.map(value => <Item key={value.url} {...value}/>)}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Frame>
    )
}
