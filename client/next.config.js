const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const path = require("path");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        CMS_URI: "http://scorpio.local:4000",
        NEXTAUTH_SECRET: "xJdgA4Nbp6vSKuCWEDqhFwRZf3zUk2c5j8VHyQGTs9",
      },
      sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
      },
      images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'scorpio.local',
            port: '4000',
            pathname: '/media/**',
          },
        ],
      },
    };
  } else {
    return {
      env: {
        CMS_URI: "https://scorpio.local",
      },
      eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
        useFileSystemPublicRoutes: false,
      },
    };
  }
};
