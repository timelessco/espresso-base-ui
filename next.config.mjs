/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      // beforeFiles runs before the public/ static file is matched, so a
      // `?preset=` request is served dynamically while the plain
      // /r/button.json URL still serves the static registry file.
      beforeFiles: [
        {
          source: "/r/button.json",
          has: [{ type: "query", key: "preset" }],
          destination: "/api/registry/button",
        },
        {
          // Theme preset (no static file) — always served dynamically.
          source: "/r/theme.json",
          destination: "/api/registry/theme",
        },
      ],
    }
  },
}

export default nextConfig
