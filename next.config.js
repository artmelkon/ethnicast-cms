const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        CMS_URI: "http://scorpio.local:3000",
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
