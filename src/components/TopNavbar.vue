<template>
    <div class="top-navbar">
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
            
              <!-- <router-link 
                class="d-flex align-center menu-link"
                active-class="activemenu"
                :to="{ name: 'document'}"
              >
                <v-list-item link>
                    <v-list-item-title class="menu-text">เอกสารที่เกี่ยวข้องกับโครงการ</v-list-item-title>
                </v-list-item>
              </router-link> -->

              </div>

            <div class="box-right">
              
              <!-- <v-menu offset-y v-model="menuOpen">
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
              </v-menu> -->
              <div class="box-right">
              
                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                >
                <template v-slot:activator="{ on }">
                  <v-btn v-on="on" color="primary" dark>
                    {{user.username}}
                    <v-icon>{{ menuOpen ? 'mdi-menu-up' : 'mdi-menu-down' }}</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item v-for="(item, index) in items" :key="index" :to="item.route"  active-class="activemenu">
                  <!-- <v-list-item v-for="(item, index) in items" :key="index" @click="selectItem(item)"> -->
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

              <!-- <v-menu 
                v-if="user != null" 
                offset-y 
                v-model="menuOpen"
                :close-on-content-click="false"
                :active-class="menuActiveClass"
              >
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
              </v-menu> -->

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
            

            </div>

        </v-list>
   
    </div>
</template>
<script>
import store from '../store/index.js';
  export default{
      data :() => ({
          menuOpen: false,
          items: [
            { text: 'อัพโหลดข้อมูลการชำระเงิน', route: '/receipt-import' },
            { text: 'สำหรับเจ้าหน้าที่การเงิน', route: '/receipt-list' },
            { text: 'ออกจากระบบ', route: '/login' }
          ],
          activeItemClass: 'my-list-item-active', // Your custom class for active state
          user: store.getters.user,
      }),
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
        this.$router.push({ path: '/receipt-import' });
        console.log('Selected item:', item);
            break;
        case "สำหรับเจ้าหน้าที่การเงิน":
        this.$router.push({ path: '/receipt-list' });
            console.log('Selected item:', item);
            break;
        case "ออกจากระบบ":
            store.dispatch("logout")
            this.$router.push({ path: '/login' });
            // this.logout()
            break;
        default:
            // Default action
            break;
      }
     

      // Do something with the selected item
    },
    async logout() {

      console.log(this.user);
            await store.dispatch("logout");
         
            // await this.$router.push("/login");

        }

  }
  }
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
    .my-dropdown-active {
      background-color: #f4742b;
    }

</style>