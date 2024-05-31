<!-- components/Layout.vue -->
<template>
    <div>
      <header>
            <div class="banner">
                <img src="@/assets/images/logo.webp"/>
            </div>

          <v-list class="navbar">

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
                
                to="/registration"
              >
                <v-list-item link>
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

              <router-link 
                class="d-flex align-center menu-link"
                active-class="activemenu"
                to="/manage-employee"
              >
                <v-list-item link>
                    <v-list-item-title class="menu-text">จัดการผู้ใช้งาน</v-list-item-title>
                </v-list-item>
              </router-link>

              </div>

              <div class="box-right">
              
                <v-menu v-if="user != null" offset-y v-model="menuOpen">
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
                  to="/login"
                >
                  <v-list-item link class="text-right">
                      <v-list-item-title class="menu-text">สำหรับเจ้าหน้าที่</v-list-item-title>
                  </v-list-item>
                </router-link>

              </div>
              

           
          </v-list>
        <!-- Header content -->
      </header>
      <main>
        <slot></slot>
      </main>
      <footer>
        <!-- Footer content -->
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LayoutTest'
  };
  </script>
  
  <style>
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
  .router-link-exact-active.activemenu{
      background-color: #f4742b;
      border-radius: 5px;
  }
  .activemenu:hover,
  .router-link-exact-active:hover{
      background-color: #f4742b;
  }
  .menu-text{
      color: white;
  }
  .box-right a{
      display: inline-block;
  }

</style>