'use client'
import Frame from "@/components/Frame";
import {
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";

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
            url: 'pinggu'
        },
        {
            name: '分区入口',
            url: 'fenqu'
        },
        {
            name: '家庭支持',
            url: 'jiating'
        }
    ],
    [
        {
            name: '专技预约系统',
            url: 'zhuanji'
        },
        {
            name: '问答区',
            url: 'wenda'
        },
        {
            name: '辅助程序入口',
            url: 'fuzhu'
        }
    ],
    [
        {
            name: '教师专业发展',
            url: 'jiaoyu'
        },
        {
            name: '各地支持机构一览',
            url: 'gedi'
        },
        {
            name: '特色课程',
            url: 'kecheng'
        }
    ]
]

const imageData: {
    title: string
    subtitle: string
    src: string
}[] = [
    {
        title: 'a',
        subtitle: 'A',
        src: '/a.jpg'
    }
]

export default function Page() {
    return (
        <Frame>
            <Image
                alt="头图"
                src="/头图.png"
                width={0}
                height={0}
                sizes="100vw"
                style={{width: '100%', height: 'auto'}}
            />
            <ImageList>
                {imageData.map(({title, subtitle, src}) => (
                    <ImageListItem key={src}>
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
