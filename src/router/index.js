import Vue from 'vue'
import VueRouter from 'vue-router'

import HomeView from '../views/HomeView.vue'
import MainView from '../views/MainView.vue'
import RegisView from '../views/RegisView.vue'
import RegisListView from '../views/RegisListView.vue'
import RegisDetail from '../views/RegisDetail.vue'
import DocumentView from '../views/DocumentView.vue'
import ReceiptList from '../views/ReceiptList.vue'
import ReceiptImport from '../views/ReceiptImport.vue'
import LoginView from '../views/LoginView.vue'
// import LayoutView from '../views/LayoutView.vue'

Vue.use(VueRouter)

const routes = [

   
  {
    path: '/home',
    component: HomeView,

    children: [  

      {
        path: '/home',
        name: 'main',
        component: MainView
      },
      {
        path: '/registration',
        name: 'registration',
        component: RegisView
      },
      {
        path: '/registrationlist',
        name: 'registration-list',
        component: RegisListView
      },
      {
        path: '/registration_detail',
        name: 'registration-detail',
        component: RegisDetail
      },
      {
        path: '/document',
        name: 'document',
        component: DocumentView
      },
      {
        path: '/import',
        name: 'receipt-import',
        component: ReceiptImport
      },
      {
        path: '/receipt_list',
        name: 'receipt-list',
        component: ReceiptList
      },
      {
        path: '/login',
        name: 'login',
        component: LoginView
      },
   
    ]
  },
 



  // { 
  //   path: '/test',
  //   component: LayoutView,
 
  //   beforeEnter (to, from, next) {

  //     store.dispatch('checkLogin')
  //     if(store.state.user){
  //       next()  
  //     }else{
  //       next({ name: 'login' })
  //     }

  //   },
 
  //   children: [
   
  //     {
  //       path: '/home',
  //       name: 'home',
  //       component: HomeView
  //     },
   
  //   ]
  // },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
