import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  serverExternalPackages: ["firebase-admin", "jwks-rsa", "jose"],
  allowedDevOrigins: ["192.168.8.*"],
}

export default nextConfig
