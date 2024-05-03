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
    },
  },
};