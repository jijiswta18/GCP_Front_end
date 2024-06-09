import Vue from 'vue'
import VueRouter from 'vue-router'


import Layout from '../views/HomeView.vue'
import Main from '../views/MainView.vue'

import Register from '../views/RegisterForm.vue'
import Receipt from '../views/ReceiptForm.vue'

import RegisterListView from '../views/RegisterListView.vue'
import RegisDetail from '../views/RegisterDetail.vue'
// import DocumentView from '../views/DocumentView.vue'
import ReceiptList from '../views/ReceiptList.vue'
import ReceiptImport from '../views/ReceiptImport.vue'
import ReceiptPrint from '../views/ReceiptPrint.vue'
import ReceiptDetail from '../views/ReceiptDetail.vue'
import ImportListView from '../views/ImportListView.vue'
import ManageEmployee from '../views/ManageEmployee.vue'
import Login from '../views/LoginView.vue'
// import LayoutView from '../views/LayoutView.vue'

Vue.use(VueRouter)


const routes = [

  {
    path: '/',
    component: Layout,
    children: [
      { path: '', component: Main },
      { path: 'login', component: Login },
      {
        path: '/registration',
        name: 'registration',
        component: Register,
    
      },
      {
        path: '/registration/:id',
        name: 'registration-edit',
        component: Register,
        props: true, // ใช้ข้อมูลพารามิเตอร์เป็น props
      },
      // { path: 'registration', component: Register },
      // { path: 'registration/:id', name: 'registration-edit', component: RegisterEdit },
      { path: 'registration-list',  name: 'RegisterListView', component: RegisterListView },
      { path: 'registration-detail/:id', name: 'registration-detail', component: RegisDetail },
      // { path: 'document', component: DocumentView },
      { path: 'receipt/:receiptData',   name: 'receipt', component: Receipt },
      { path: 'receipt-list', component: ReceiptList },
      { path: 'receipt-import', name: 'ReceiptImport', component: ReceiptImport },
      { path: 'import_list_view', name: 'ImportListView', component: ImportListView },
      { path: 'manage-employee', component: ManageEmployee },

    ],
    
  },

  { path: '/receipt_detail/:receiptData', name: 'ReceiptDetail', component: ReceiptDetail },
  { path: '/receipt_print/:receiptData', name: 'ReceiptPrint', component: ReceiptPrint },

  // {
  //   path: '/login',
  //   name: 'login',
  //   component: LoginView
  // },


  //     {
  //       path: '/home',
  //       name: 'main',
  //       component: MainView,
  //     },
  //     {
  //       path: '/registration',
  //       name: 'registration',
  //       component: RegisView
  //     },
  //     {
  //       path: '/registrationlist',
  //       name: 'registration-list',
  //       component: RegisListView
  //     },
  //     {
  //       path: '/registration_detail',
  //       name: 'registration-detail',
  //       component: RegisDetail
  //     },
  //     {
  //       path: '/document',
  //       name: 'document',
  //       component: DocumentView
  //     },
  //     {
  //       path: '/import',
  //       name: 'receipt-import',
  //       component: ReceiptImport
  //     },
  //     {
  //       path: '/receipt_list',
  //       name: 'receipt-list',
  //       component: ReceiptList
  //     },
  //     {
  //       path: '/manage_employee',
  //       name: 'manage-employee',
  //       component: ManageEmployee
  //     },
 
  // {
  //   path: '/',
  //   component: HomeView,
  //   beforeEnter (to, from, next) {

  //     store.dispatch('checkLogin')
  //     if(store.state.user){
  //       next()  
  //     }else{
  //       next({ name: 'login' })
  //     }

  //   },

  //   children: [  


  

   
  //   ]
  // },





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
