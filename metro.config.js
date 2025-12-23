// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Optimize bundle size and loading speed
config.transformer = {
  ...config.transformer,
  minifierConfig: {
    keep_classnames: false,
    keep_fnames: false,
  },
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  }),
};

// Optimize resolver to reduce bundle size
config.resolver = {
  ...config.resolver,
  sourceExts: ['jsx', 'js', 'ts', 'tsx', 'json'],
};

// Increase timeout and optimize server for development
config.server = {
  ...config.server,
  port: 8081,
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      // Disable update checks
      if (req.url.includes('/updates') || req.url.includes('/manifest')) {
        return res.end(JSON.stringify({ status: 'no-updates' }));
      }
      return middleware(req, res, next);
    };
  },
};

module.exports = config;
