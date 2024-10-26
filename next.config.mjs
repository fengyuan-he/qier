import createMDX from "@next/mdx"

/** @type {import('next').NextConfig} */
const nextConfig = createMDX()({
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    experimental: {
        mdxRs: true
    }
})

export default nextConfig
