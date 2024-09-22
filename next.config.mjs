/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Ignorar arquivos .map ao compilar
    config.module.rules.push({
      test: /\.map$/,
      use: 'ignore-loader',
    });

    return config;
  },
};

export default nextConfig;
