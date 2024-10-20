import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import type {Metadata} from "next";
import {ReactNode} from "react";
import {description, title} from "@/values";
import UserProvider from "@/components/UserProvider";

export const metadata: Metadata = {title, description}

export default function RootLayout({children}: Readonly<{
    children: ReactNode
}>) {
    return (
        <html lang="zh-CN">
        <body>
        <UserProvider>
            {children}
        </UserProvider>
        </body>
        </html>
    );
}
