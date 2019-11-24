// const withSass = require('@zeit/next-sass')


// let config = withSass(
//   {
//     sassModules: true,
//     webpack: (config, { isServer }) => {
//       // Fixes npm packages that depend on fs module
//       if (!isServer) {
//         config.node = {
//           fs: 'empty',
//           net: 'empty'
//         }
//         config.target = 'node';
//       }
  
//       return config
//     }
//   });

// module.exports = config


module.exports = {
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on fs module
    if (!isServer) {
      config.node = {
        fs: 'empty',
        net: 'empty'
      }
      // config.target = 'node'
    } else {
      // config.target = 'web'
    }

    return config
  }
}