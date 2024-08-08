<template>
    <div class="login-form pt-64">
        <v-container>
          
            <v-form
                ref="form"
                class="form-login mt-2"
                v-model="valid"
                lazy-validation
                @submit.prevent="login"    
            >
            <v-row justify="center" class="mb-6">
                <h1>เข้าสู่ระบบ / Sign in</h1>
            </v-row>

            <v-row  no-gutters justify="center">
                <v-col cols="6">
                    <v-text-field
                        v-model="username"
                        label="Username รหัสพนักงาน"
                        required
                        solo
                        single-line
                        clearable 
                        prepend-inner-icon="fa-solid fa-user"
                        class="style-input-login"
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-row no-gutters justify="center">
                <v-col cols="6">
                    <v-text-field
                        v-model="password"
                        label="Password wifi"
                        required
                        solo

                        prepend-inner-icon="fa-solid fa-lock"
                        class="style-input-login"
                        :type="showPassword ? 'text' : 'password'"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="showPassword = !showPassword"
                        autocomplete="on"
                    ></v-text-field>
                </v-col>
            </v-row>
                
            <v-row justify="center">
                <v-col cols="6">
                    <v-btn 
                        class="btn-blue h-48 w-100"
                        type="submit"

                        :disabled="disabled == true"
                    >เข้าสู่ระบบ / Login</v-btn>
                </v-col>
            </v-row>

            </v-form>
        </v-container>
    </div>    
</template>

<script>

    import store  from '../store/index.js';

    export default {

        data: () => ({
            dialog: false,
            valid: true,
            showPassword: false,
            disabled: false,
            check: false,
            check_user : false,
            errorMessage:'',
            username: '',
            usernameRules: [v => !!v || 'กรุณากรอกข้อมูล'],
            password: '',
            passwordRules: [ v => !!v || 'กรุณากรอกข้อมูล'],
            user: store.getters,
        }),
        computed: {},     
        methods: {
            encodeBase64(str) {
            return btoa(str);
            },

            async login(){
                if( this.$refs.form.validate()){
                    try {
                    await store.dispatch('login',{
                            username: this.username,
                            password: this.password,
                        })

                    if(this.user.checkUser === "204")
                        {
                            await this.$swal.fire({
                            title: 'Error!',
                            text: 'รหัสผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        })
                    }
                    else{
                        await this.$router.push({ path: '/registration-list' });
                        location.reload();
                        await this.$swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'เข้าสู่ระบบสำเร็จ',
                            showConfirmButton: false,
                            timer: 1000
                        })
                    }
                
                } catch (error) {
                    await this.$swal.fire({
                        title: 'Error!',
                        text: 'รหัสผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })
                }
                }

            
            }
        },
    }
</script>

<style scoped>
    /* body, html {
      height: 100%;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    } */

    h2{
        color: #243C7F;
    }
 
  
    .style-input-login ::v-deep  .v-input__slot{
        background: transparent;
        box-shadow: none!important;
        border: 1px solid #787474;;
    }
    ::v-deep .v-icon{
        font-size: 14px!important;
    }
    .w-100{
        width: 100%;
    }
    .not-match{
        background: #e7e7e7;
        text-align: center;
    }
    .w-100{
        width: 100%;
    }

    .pt-64{
        padding-top: 64px;
    }


    
</style>