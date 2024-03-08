module.exports = function override(config, env) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    constants: require.resolve('constants-browserify'),
    assert: require.resolve('assert/'),
    os: require.resolve('os-browserify/browser'),
  };
  config.ignoreWarnings = [
    {
      message:
        /Critical dependency: the request of a dependency is an expression/,
    },
  ];
  return config;
};
