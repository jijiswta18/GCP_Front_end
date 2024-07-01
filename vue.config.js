// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: [
//     'vuetify'
//   ]
// })



module.exports = {
  devServer: {
    proxy: {

      '^/active_directory': {
        target: 'http://172.19.107.54:8080', // Replace with your API base URL

      },
      "^/api_gcp" :{
        target: 'http://localhost:3000'
      },
      "^/CRAServices" :{
        target: 'http://172.20.22.45:8080'
      },
      "^/api" :{
        target: 'http://172.19.103.55:9093'
        // target: 'http://172.19.103.55:9203'
      },
      // "^/api_phonebook" :{
      //   target: 'http://172.19.107.54:8080'
      // },
      

    },
    // onBeforeSetupMiddleware: function(devServer) {
    //   const EventEmitter = require('events');
    //   EventEmitter.defaultMaxListeners = 20; // Set maximum listeners to 20
    // }
    // "^/api_gcp" :{
    //   // target: 'http://10.100.90.24'
    //   target: 'http://localhost:3000'
    // },
  },
};