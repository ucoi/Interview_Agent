import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Keeps your local network development working
  allowedDevOrigins: ["192.168.8.*"],

  // FIXES THE VERCEL SERVER CRASH: Bypasses the firebase-admin bundling bug
  serverExternalPackages: ["firebase-admin"],
}

export default nextConfig
