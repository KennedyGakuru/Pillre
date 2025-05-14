const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// ✅ Add polyfills for Node.js modules used by `ws` in supabase-js
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  lodash: require.resolve('lodash'), // Optional, if you need it
  stream: require.resolve('stream-browserify'),
  crypto: require.resolve('crypto-browserify'),
  http: require.resolve('@tradle/react-native-http'),
  https: require.resolve('https-browserify'),
  zlib: require.resolve('browserify-zlib'),
  events: require.resolve('events'),
  net: null,
  tls: null,
  fs: null,
};

module.exports = withNativeWind(config, { input: './global.css' });
