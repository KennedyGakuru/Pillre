const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Optional: Only if you're aliasing lodash for a real reason
config.resolver.extraNodeModules = {
  lodash: require.resolve('lodash'),
};

// Don't try to polyfill `stream`, `crypto`, etc.

module.exports = withNativeWind(config, { input: './global.css' });
