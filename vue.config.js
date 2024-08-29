

module.exports = {
  devServer: {
    proxy: {

      '^/active_directory': {
        target: 'http://172.19.107.54:8080', // Replace with your API base URL

      },
      "^/api_gcp" :{
        // target: 'http://172.20.5.233:3000'
        target: 'http://localhost:3000'
      },
      "^/CRAServices" :{
        target: 'http://172.20.22.45:8080'
      },
      "^/api" :{
        // target: 'http://172.19.103.55:9093'
        target: 'http://172.19.103.55:9203'
      },
      // "^/api_phonebook" :{
      //   target: 'http://172.19.107.54:8080'
      // },
      

    },
   
  },
};