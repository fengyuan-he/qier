import createMDX from "@next/mdx"

/** @type {import('next').NextConfig} */
const nextConfig = createMDX()({
    experimental: {
        mdxRs: true
    }
})

export default nextConfig
