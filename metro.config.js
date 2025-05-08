const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

// Get the default Expo config
const config = getDefaultConfig(__dirname);

// Add the lodash alias
config.resolver.extraNodeModules = {
  lodash: require.resolve('lodash'),
};

// Apply NativeWind config (ensure styles are processed)
module.exports = withNativeWind(config, { input: './global.css' });


