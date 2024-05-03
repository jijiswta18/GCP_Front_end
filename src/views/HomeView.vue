<template>
  <v-app id="app">
      <div class="banner">
        <img src="@/assets/logo.webp"/>
      </div>
     
          <v-list class="navbar">

              <div class="box-left">
              
              <router-link 
                class="d-flex align-center menu-link"
                active-class="activemenu"
                :to="{ name: 'main'}"
              >
                <v-list-item link>
                    <v-list-item-title class="menu-text">หน้าหลัก</v-list-item-title>
                </v-list-item>
              </router-link>

              <router-link 
                class="d-flex align-center menu-link"
                active-class="activemenu"
                :to="{ name: 'registration'}"
              >
                <v-list-item link>
                    <v-list-item-title class="menu-text">ลงทะเบียน</v-list-item-title>
                </v-list-item>
              </router-link>

              <router-link 
                class="d-flex align-center menu-link"
                active-class="activemenu"
                :to="{ name: 'registration-list'}"
              >
                <v-list-item link>
                    <v-list-item-title class="menu-text">ตรวจสอบการลงทเบียน</v-list-item-title>
                </v-list-item>
              </router-link>
            
              <router-link 
                class="d-flex align-center menu-link"
                active-class="activemenu"
                :to="{ name: 'document'}"
              >
                <v-list-item link>
                    <v-list-item-title class="menu-text">เอกสารที่เกี่ยวข้องกับโครงการ</v-list-item-title>
                </v-list-item>
              </router-link>

              </div>

              <div class="box-right">
              
                <v-menu v-if="user" offset-y v-model="menuOpen">
                  <template v-slot:activator="{ on }">
                    <v-btn class="btn-profile" v-on="on" @click="toggleMenu">
                      {{user.username}}
                      <v-icon>{{ menuOpen ? 'mdi-menu-up' : 'mdi-menu-down' }}</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item v-for="(item, index) in items" :key="index">
                      <v-list-item-title @click="selectItem(item)">{{ item }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>

                <router-link 
                  class="align-center menu-link"
                  active-class="activemenu"
                  :to="{ name: 'login'}"
                >
                  <v-list-item link class="text-right">
                      <v-list-item-title class="menu-text">สำหรับเจ้าหน้าที่</v-list-item-title>
                  </v-list-item>
                </router-link>


               
              </div>
              

           
          </v-list>
       
    <v-main class="main">
      <v-container fluid>
        <v-row  justify="center">
          <v-col cols="11">
            <br>

            <router-view></router-view>
          </v-col>
        </v-row>
       
      
      </v-container>
    

    </v-main>
  </v-app>
</template>

<script>

import store from '../store/index.js';

export default {
  data() {
    return {
      collapsed: true,
      user: store.getters.user,
      menuOpen: false,
      items: ['อัพโหลดข้อมูลการชำระเงิน', 'สำหรับเจ้าหน้าที่การเงิน', 'ออกจากระบบ']
    };
  },
  methods: {
    toggleCollapse() {
      this.collapsed = !this.collapsed;
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    selectItem(item) {
      switch (item) {
        case "อัพโหลดข้อมูลการชำระเงิน":
        this.$router.push({name:"receipt-import"});
        console.log('Selected item:', item);
            break;
        case "สำหรับเจ้าหน้าที่การเงิน":
        this.$router.push({name:"receipt-list"});
            console.log('Selected item:', item);
            break;
        case "ออกจากระบบ":
            this.logout()
            break;
        default:
            // Default action
            break;
      }
     

      // Do something with the selected item
    },
    async logout() {

      console.log('==========');
      await store.dispatch("logout");

      await this.$router.push({name:"main"});
    
      // await this.$router.push("/home");

    }
  }
};
</script>


<style>

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

    #app {
      font-size: 18px;
      font-family: 'chulabhornlikittext', sans-serif;
    }

    .main{
      text-align: left;
    }

    .banner{
      text-align: left;
    }

    .banner img{
      width: 350px
    }
    .navbar{
      height: 64px;
      background: #002f87!important;
      display: flex;
      padding: 8px;
    }
  .box-left{
    place-content: flex-start;
    display: flex;
  }
  .box-right{
    flex: auto;
    text-align: right;
  }
  .box-left a,
  .box-right a{
    text-decoration: none;
  }
  .menu-text{
    color: white;
  }
  .box-right a{
    display: inline-block;
  }

  .router-link-exact-active.activemenu{
    background-color: #f4742b;
    border-radius: 5px;
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

  .btn-blue{
    background-color: #243C7F!important;
    color: white;
    width: 100%;
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
    /* font-size: 1.75em; */
    /* vertical-align: top; */
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

  .text-warning{
    color:#F36C22;
  }
  .text-white{
    color:white;
  }

</style>
