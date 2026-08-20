/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      // 어드민 배너 이미지 업로드(Server Action)를 위해 기본 1MB 제한을 상향합니다.
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
