import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from "axios";
import Swal from 'sweetalert2';
import CryptoJS from 'crypto-js';
import moment from 'moment';

import './globalMixin'; // เรียกใช้ Global Mixin


// import './assets/fonts/th-styles.css';
import '@fortawesome/fontawesome-free/css/all.css'
import '@mdi/font/css/materialdesignicons.min.css'

Vue.prototype.$axios = axios;
Vue.prototype.$swal = Swal;
Vue.prototype.$cryptoJS = CryptoJS;
Vue.prototype.$moment = moment;

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
