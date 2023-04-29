const webpack = require('webpack'); 
module.exports = function override(config) { 
		const fallback = config.resolve.fallback || {}; 
		Object.assign(fallback, { 
    	"crypto": require.resolve("crypto-browserify"), 
      "stream": require.resolve("stream-browserify"), 
      "assert": require.resolve("assert"), 
      "http": require.resolve("stream-http"), 
      "https": require.resolve("https-browserify"), 
      "os": require.resolve("os-browserify"), 
      "url": require.resolve("url"),
      "util": require.resolve("util/"),
      "buffer": require.resolve("buffer/"),
      "child_process": false,
      "dgram": false,
      "net": false,
      }) 
   config.resolve.fallback = fallback; 
   config.plugins = (config.plugins || []).concat([ 
   	new webpack.ProvidePlugin({ 
    	process: 'process/browser', 
      Buffer: ['buffer', 'Buffer'] 
    }) 
   ]).concat([new webpack.NormalModuleReplacementPlugin(/node:/, (resource) => {
    resource.request = resource.request.replace(/^node:/, "");
  }),]) 
   return config; }