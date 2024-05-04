/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "mango.blender.org",
      "uhdtv.io",
      "upload.wikimedia.org",
      "res.cloudinary.com",
      "parsi-times.com",
      "firebasestorage.googleapis.com", 
      "www.google.com",
      "media.timeout.com", 
    ],
  },
};

module.exports = nextConfig;
