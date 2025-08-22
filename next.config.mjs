// next.config.mjs (ESM)
/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["snapper-concrete-really.ngrok-free.app"],
  experimental: {
    // other experimental flags
  },
};
webpack: (config) => {
  config.watchOptions = {
    ...config.watchOptions,
    ignored: [
      ...(config.watchOptions?.ignored || []),
      "**/pagefile.sys",
      "**/hiberfil.sys",
      "**/swapfile.sys",
    ],
  };
  return config;
};

export default nextConfig;
