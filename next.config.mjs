/** @type {import('next').NextConfig} */
const nextConfig = {
  // TODO: Set ignoreBuildErrors to 'false' once the initial deployment is stable 
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Note: ESLint ignores are now handled via the CLI or .eslintignore, 
  // removing the 'eslint' key fixes the "Unrecognized key" warning.
};

export default nextConfig;