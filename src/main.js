import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

// import './assets/fonts/th-styles.css';
import '@fortawesome/fontawesome-free/css/all.css'
import '@mdi/font/css/materialdesignicons.min.css'



Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
  // created() {
  //   // Check authentication status on app initialization
  //   this.store.dispatch('checkAuth');
  // }
}).$mount('#app')
