module.exports = {
    webpack: {
      configure: (config) => {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          path: require.resolve('path-browserify'),
          os: require.resolve('os-browserify/browser'),
          crypto: require.resolve('crypto-browserify'),
        };
        return config;
      },
    },
  };
  