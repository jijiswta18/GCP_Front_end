<template>
  <v-app>
    <div class="banner">
        <img src="@/assets/images/logo.webp"/>
      </div>
    <v-app-bar app color="#002f87" class="custom-header d-flex">
      <!-- <v-list class="d-flex navbar"> -->
       
          <v-btn icon @click.stop="toggleMenu" class="display-none responsive-block">
            <v-icon v-text="menuOpen ? 'mdi-chevron-up' : 'mdi-menu'"></v-icon>
          </v-btn> 
        <div class="box-left">
          <router-link 
            class="d-flex align-center menu-link"
            active-class="activemenu"
            to="/"
          >
            <v-list-item link>
                <v-list-item-title class="menu-text">หน้าหลัก</v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link 
            class="d-flex align-center menu-link"
            active-class="activemenu"
            :to="{ name: 'registration'}"              >
          
            <v-list-item link>
            <!-- <v-list-item link v-if="user?.menu_register || checkDate"> -->
                <v-list-item-title class="menu-text">ลงทะเบียน</v-list-item-title>
            </v-list-item>
          </router-link>
          
          <router-link 
            class="d-flex align-center menu-link"
            active-class="activemenu"
            to="/registration-list"
          >
            <v-list-item link>
                <v-list-item-title class="menu-text">ตรวจสอบการลงทะเบียน</v-list-item-title>
            </v-list-item>
          </router-link>
        </div>

        <div class="box-right">

          <v-menu v-if="user != null"
            v-model="menu"
            offset-y
            :close-on-content-click="false"
            :active-class="menuActiveClass"
            class="header-menu"
          >
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" class="btn-profile h-48">
                {{user.employee_id}}
                <v-icon>{{ menuOpen ? 'mdi-menu-up' : 'mdi-menu-down' }}</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item to="/receipt-import">
                <v-list-item-title>อัพโหลดข้อมูลการชำระเงิน</v-list-item-title>
              </v-list-item>
              <v-list-item to="/receipt-list">
                <v-list-item-title>สำหรับเจ้าหน้าที่การเงิน</v-list-item-title>
              </v-list-item>
            <v-list-item class="cursor-pointer">
              <v-list-item-title @click="logout">ออกจากระบบ</v-list-item-title>
            </v-list-item>
            </v-list>
          </v-menu>

          <router-link v-else
            class="align-center menu-link"
            active-class="activemenu"
            to="/login"
          >
            <v-list-item link class="text-right">
                <v-list-item-title class="menu-text">สำหรับเจ้าหน้าที่</v-list-item-title>
            </v-list-item>
          </router-link>

        </div>
      <!-- </v-list> -->

    </v-app-bar>

    <!-- Responsive menu -->
    <v-expand-transition>
      <v-card v-if="menuOpen" class="menu-collapse display-none">
        <v-list class="text-left">
          <router-link 
              class="d-flex align-center menu-link"
              active-class="activemenu"
              to="/"
            >
              <v-list-item link>
                  <v-list-item-title class="menu-text">หน้าหลัก</v-list-item-title>
              </v-list-item>
            </router-link>

            <router-link 
              class="d-flex align-center menu-link"
              active-class="activemenu"
              :to="{ name: 'registration'}"              >
            
              <!-- <v-list-item link v-if="user?.menu_register || checkDate"> -->
              <v-list-item link >
                  <v-list-item-title class="menu-text">ลงทะเบียน</v-list-item-title>
              </v-list-item>
            </router-link>
            
            <router-link 
              class="d-flex align-center menu-link"
              active-class="activemenu"
              to="/registration-list"
            >
              <v-list-item link>
                  <v-list-item-title class="menu-text">ตรวจสอบการลงทะเบียน</v-list-item-title>
              </v-list-item>
            </router-link>
            
        </v-list>
      </v-card>
    </v-expand-transition>

    <!-- Main content -->
    <v-main class="text-left box-main">
      <v-container fluid>
          <v-row  justify="center">
            <v-col cols="11">
              <br>
              <router-view></router-view>
              <br>
            </v-col>
          </v-row>
        </v-container>
    </v-main>
  </v-app>
</template>

<script>
import store from '../store/index.js';
import axios from 'axios';
import Swal from 'sweetalert2';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      menuOpen: false,
      menuItems: [
        { title: 'หน้าหลัก', link: 'https://precmed.cra.ac.th/home' },
        { title: 'ลงทะเบียน', link: 'https://precmed.cra.ac.th/registration' },
        { title: 'ตรวจสอบการลงทะเบียน', link: 'https://precmed.cra.ac.th/registrationlist' },
        { title: 'เอกสารที่เกี่ยวข้องกับโครงการ', link: 'https://precmed.cra.ac.th/document' }
      ],
      menuActiveClass: 'my-dropdown-active', // Custom class for dropdown when active
      activeItemClass: 'my-list-item-active', // Custom class for active list item
      collapsed: true,
      user: store.getters.user,
      checkDate: false,
      menu: false,
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  mounted(){
    this.getMenuRegisterOpening()
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    selectMenuItem(item) {
      // Handle menu item selection
      console.log('Selected item:', item);
      // Close the menu
      this.menuOpen = false;
      // Navigate to the selected link
      window.location.href = item.link;
    },
    async getMenuRegisterOpening(){
      const path = '/api_gcp/Register/getMenuRegisterOpening'
      const response = await axios.get(path);

      this.checkDate = response.data

    },
    async logout() {

      Swal.fire({
        icon: "warning",
        title: "คุณต้องการออกจากระบบ",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "ยืนยัน",
        cancelButtonText: `ยกเลิก`
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          await store.dispatch("logout");
        
          await this.$router.push("/login");
          await location.reload();

        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
  }
};
</script>

<style >
  @font-face {
    font-family: "chulabhornlikittext";
    src: url("@/assets/fonts/Chulabhorn_Likit/chulabhornlikittext-light.woff") format("woff");
    font-weight: 200;
  }

  @font-face {
    font-family: "chulabhornlikittext";
    src: url("@/assets/fonts/Chulabhorn_Likit/chulabhornlikittext-regular.woff") format("woff");
    font-weight: 500;
  }

  @font-face {
    font-family: "chulabhornlikittext";
    src: url("@/assets/fonts/Chulabhorn_Likit/chulabhornlikittext-medium.woff") format("woff");
    font-weight: 400;
  }

  @font-face {
    font-family: "chulabhornlikittext";
    src: url("@/assets/fonts/Chulabhorn_Likit/chulabhornlikittext-bold.woff") format("woff");
    font-weight: 700;
  }

  @media only screen and (max-width: 767px) {
    .box-left{
      display: none!important;
    }
  
    .responsive-block{
      display: block!important;
    }
    .menu-collapse{
      display: block!important;
    }
}

  #app {
    font-size: 18px;
    font-family: 'chulabhornlikittext', sans-serif;
  }
  .banner{
    text-align: left;
  }
  .banner img{
    width: 350px
  }
  .menu-collapse .v-list{
    background-color: #002f87!important;
  }
  .custom-header{
    flex: initial;
    position: relative!important;
  }
  .custom-header .v-toolbar__content{
   width: 100%;
  }
  .display-none{
    display: none;
  }
  .responsive-block i{
    color: white!important;
  }
  .box-left{
    place-content: flex-start;
    display: flex;
  }
  .box-right{
    flex: auto;
    text-align: right;
  }
  .box-right a{
    display: inline-block;
  }
  .box-left a,
  .box-right a{
    text-decoration: none;
  }
  .router-link-exact-active.activemenu{
    background-color: #f4742b;
    border-radius: 5px;
  }
  .v-list-item--active{
    background-color: #f4742b;
  
  }
  .v-list-item--active .v-list-item__title{
    color: white!important;
  }

  .activemenu:hover,
  .router-link-exact-active:hover{
    background-color: #f4742b;
  }

  .btn-profile{
    background-color: transparent!important;
    box-shadow: none;
  }

  .btn-profile span{
    color: white;
  }
  .box-main{
    padding: 0!important;
  }
  .btn-blue{
    background-color: #243C7F!important;
    /* color: white;
    width: 100%; */
  }
  .btn-blue span{
    color: white;
    font-size: 18px;
  }
  .style-label{
    margin-bottom: 0.5rem!important;
  }
  .style-label span{
    color: #dc3545;
  }

  /* select */
  .style-select .v-input__slot{
    color: #1f2d3d;
    background-color: #f8f9fa!important;
    border-color: #f8f9fa;
    box-shadow: none!important;
    cursor: pointer!important;
    min-height: 42px;
  }

  .style-select.v-select--is-menu-active .v-input__slot{
      background-color: #dae0e5!important;
      border-color: #d3d9df!important;
  }

  
  .text-white{
    color: white;
  }

  .text-warning{
    color:#F36C22;
  }
  .text-white{
    color:white;
  }
  .text-danger{
    color: #dc3545;
  }
  .text-dark{
    color: #000;
  }

  .bg-blue{
    background: #243C7F;
  }

  
  .v-messages__message{
    line-height: 18px!important;
  }

  .btn-gray{
    background-color: #545b62;
    border-color: #4e555b;
  }
  .btn-success{
    background-color: #69F0AE !important;
    border: 1px solid #4cae4c !important;
  }

  .btn-gray span{
    color: white;
  }
  .bg-green{
    background-color: #69F0AE !important;
    border: 1px solid #4cae4c !important;
  } 
  .bg-green span{
    color: #000000;
  }

  .bg-gray{
    background: #545b62;
  }

  .menu-text{
    font-size: 18px;
    line-height: 1.5!important;
    font-weight: 400;
    color: white;
  }

  .font-weight-bold{
    font-weight: 700px;
  }

  .h-48{
    height: 48px!important;  
  }

  .v-radio label{
    color: #333!important;
    font-size: 18px;
  }

  .checkbox-option label{
    color: #333!important;
    font-size: 18px;
  }
  .checkbox-option .v-messages{
    display: none;
  }
  .f-18{
    font-size: 18px;
    
  }
  .f-22{
    font-size: 22px;
  }

  .text-success{
    color: #28a745 !important;
  }
  .text-gray{
    color: #6c757d !important;
  }
  .my-list-item-active{
    background-color: #f4742b;
    font-weight: 700;
  }

  .swal2-container{
    font-family: 'chulabhornlikittext', sans-serif;
  }
  /* .swal2-title{

    font-family: 'chulabhornlikittext', sans-serif;
    margin: auto;
  } */


  

</style>
