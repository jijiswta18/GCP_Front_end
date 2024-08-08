import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store'; // Import Vuex store
import Layout from '../views/HomeView.vue';
import Main from '../views/MainView.vue';
import Register from '../views/RegisterForm.vue';
import Receipt from '../views/ReceiptForm.vue';
import RegisterListView from '../views/RegisterListView.vue';
import RegisDetail from '../views/RegisterDetail.vue';
import ReceiptList from '../views/ReceiptList.vue';
import ReceiptImport from '../views/ReceiptImport.vue';
import ReceiptPrint from '../views/ReceiptPrint.vue';
import ReceiptDetail from '../views/ReceiptDetail.vue';
import Login from '../views/LoginView.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        { 
          path: '', 
          name: 'mainView', 
          component: Main 
        },
        {
          path: '/registration',
          name: 'registration',
          component: Register,
        },
        {
          path: '/registration/:id',
          name: 'registration-edit',
          component: Register,
          props: true,
        },
        { 
          path: 'registration-list', 
          name: 'RegisterListView', 
          component: RegisterListView, 
        },
        { 
          path: 'registration-detail/:id', 
          name: 'registration-detail', 
          component: RegisDetail,
        },
        { 
          path: 'login', 
          component: Login
        },
      
        { 
          path: 'receipt/:receiptData', 
          name: 'receipt', 
          component: Receipt,
          meta: { requiresAuth: true } 
        },
        { 
          path: 'receipt-list', 
          name: 'receiptList', 
          component: ReceiptList,
          meta: { requiresAuth: true } 
        },
        { 
          path: 'receipt-import', 
          name: 'ReceiptImport', 
          component: ReceiptImport,
          meta: { requiresAuth: true }  
        },
      ],
    },
    { 
      path: '/receipt_detail/:receiptData', 
      name: 'ReceiptDetail', 
      component: ReceiptDetail,
      meta: { requiresAuth: true } 
    },
    { 
      path: '/receipt_print/:receiptData', 
      name: 'ReceiptPrint', 
      component: ReceiptPrint,
      meta: { requiresAuth: true }  
    },

    
  ]
  
})


router.beforeEach((to, from, next) => {
  
  if (to.matched.some(record => record.meta.requiresAuth)) {

    store.dispatch('checkLogin');

    
    // Check if the user is authenticated
    if (!store.getters.isLoggedIn) {
      next('/login'); // Redirect to login page if not authenticated
    } else {
      next(); // Proceed to the route
    }
  } else {
    next(); // Continue to other routes
  }
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth) && !store.getters.isLoggedIn) {
//     next('/login'); // Redirect to login page if not authenticated
//   } else {
//     next(); // Proceed to the route
//   }
// });
export default router;
