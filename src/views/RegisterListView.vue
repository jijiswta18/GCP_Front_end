<template>
    <div class="registrationlist">
        <h2 class="mb-3">ตรวจสอบการลงทะเบียน</h2>

        <!-- สิทธิ์ Admin -->
        <v-row no-gutters v-if="user">
            <v-col cols="6" class="px-2">
                <p>สถานะการลงทะเบียน</p>
                <SelectOption :options="filteredRegiterStatus" @selected="updateRegisterStatus" item-value="select_code"/>
            </v-col>
            <v-col cols="6" class="px-2">
                <p>การยกเลิก</p>
                <SelectOption :options="filteredCancelOrder" @selected="updateCencelOrder"  item-value="select_code"/>
            </v-col>
        </v-row>

 
        <v-row no-gutters v-if="user">
            <v-col cols="6" class="px-2">
                <p>ประเภทผู้สมัคร</p>
                <SelectOption :options="filteredRegiterType" @selected="updateRegiterType" item-value="select_code"/>
            </v-col>
            <v-col cols="6" class="px-2">
             
                <p>รายการที่ต้องการสมัคร</p>
                <SelectOption :options="filteredOptionCourses" @selected="updateCourseType" item-value="select_code"/>
            </v-col>
        </v-row>

       
        <div v-if="user">
            <v-text-field
                v-model="search"
                label="อีเมล (ไม่ต้องเว้นวรรค), ชื่อ, นามสกุล, Reference N0 1, Reference N0 2"
                solo
                class="style-input-search"
                single-line
                hide-details="auto"
                clearable 
                dense
            >
                <template v-slot:prepend-inner>คำค้นหา / Keyword</template>
            </v-text-field>
            <div class="loader" v-if="loader"></div>
            <div v-else>
                <RegisterList :headers="headers" :datas="customFilter" type="employee" :search="search"/>
            </div>
            
        </div>

        <div v-else>
            <v-row no-gutters>
                <v-col cols="10" class="px-2">
                    <v-text-field
                        v-model="searchEmail"
                        label="อีเมล (ไม่ต้องเว้นวรรค)"
                        solo
                        class="style-input-search"
                        single-line
                        hide-details="auto"
                        clearable 
                        dense
                    >
                        <template v-slot:prepend-inner>คำค้นหา / Keyword</template>
                    </v-text-field>
                </v-col>
                <v-col cols="2" class="px-2">
                    <div @click="checkEmail" class="btn-blue btn-search text-white">ค้นหา / search
                    </div>
                </v-col>
            </v-row>
            <!-- <div class="loader" v-if="loader"></div>
            <div v-else> -->
                <div v-if="dataProfile.length  > 0">
                    <RegisterList :headers="headersProfile" :datas="dataProfile" type="user"/>
                </div>
            <!-- </div> -->
            
        </div>

    </div>



</template>
<script>
import axios from 'axios';
import moment from 'moment';
import store from '../store/index.js';
import Swal from 'sweetalert2';
import CryptoJS from 'crypto-js';
import RegisterList from '@/components/RegisterList.vue';
import SelectOption from '@/components/SelectOption.vue';

export default {
    components: { RegisterList, SelectOption},
    data: () => ({
        loader : true,
        user: store.getters.user,
        searchEmail: '',
        search: '',
        selectRegisterStatus: [], 
        register_status: null,
        options: [],
        courseOptions: [],
        headersProfile: [
            { text: '', align: 'center', value: 'detail' },
            { text: 'ID', align: 'center', value: 'id' },
            { text: 'วันเวลาที่ลงทะเบียน', align: 'center', value: 'create_date' },
            { text: 'ชื่อ', align: 'left', value: 'name' },
            // { text: 'สถานะ', align: 'center', value: 'statusRegisterName' },
        ],
        dataProfile: [],
        headers: [
            { text: '', align: 'center', value: 'detail' },
            { text: 'ID', align: 'center', value: 'id' },
            { text: 'วันเวลาที่ลงทะเบียน', align: 'center', value: 'create_date' },
            { text: 'ชื่อ', align: 'left', value: 'name' },
            { text: 'สถานะ', align: 'left', value: 'statusRegisterName' },
            { text: 'Reference No 1', align: 'center', value: 'reference_no_1' },
            { text: 'Reference No 2', align: 'center', value: 'reference_no_2' },
            { text: 'ชื่อ', value: 'name_th',  align: ' d-none' },
            { text: 'นามสกุล', value: 'lastname_th', align: ' d-none'},
            { text: 'อีเมล', value: 'email', align: ' d-none' },
        ],
        datas: [],
        valueRegisterStatus: null,
        valueCencelOrder: null,
        valueRegiterType: null,
        valueCourseType: null,
        valueFood: null,
    }),
    mounted(){
        if(this.user){
            this.fetchSelectList();
            // this.fetchCoursetList();
            this.fechRegister();
        }
       
    },
    computed: {
        filteredCancelOrder() {
            return this.options.filter(option => option.select_catagory === 11);
        },
        filteredRegiterStatus() {
            return this.options.filter(option => option.select_catagory === 12);
        },
        filteredRegiterType() {
            return this.options.filter(option => option.select_catagory === 4);
        },
        filteredOptionFood() {
            return this.options.filter(option => option.select_catagory === 7);
        },
        filteredOptionCourses() {
            
            return this.options.filter(option => option.select_catagory === 17);
        },
        
        
        customFilter() {

            

            return this.datas.filter(item => {
                return (
                    (this.valueRegisterStatus === null || item.status_register.toLowerCase() === this.valueRegisterStatus.toLowerCase()) &&
                    (this.valueRegiterType === null || item.register_type.toLowerCase() === this.valueRegiterType.toLowerCase()) &&
                    (this.valueCencelOrder === null || item.cancel_order.toLowerCase() === this.valueCencelOrder.toLowerCase()) &&
                    (this.valueCourseType === null || item.course_id.toLowerCase()  === this.valueCourseType.toLowerCase() )

                    
                    // (this.valueCourseType === null || item.course_id.toString()  === this.valueCourseType.toString() )

                    

                );
            });
        }
    },
    methods: {
        async fetchSelectList(){
            try {
                const response = await axios.get('/api_gcp/getSelectList');

                const selectList = await response.data.data

                this.options = selectList;

                this.selectedOption = this.options.length > 0 ? this.options[0].id : null;

            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        },
        // async fetchCoursetList(){
        //     try {
        //         const response = await axios.get('/api_gcp/getSelectCourses');

        //         const selectCourseList = await response.data.data

        //         this.courseOptions = selectCourseList;

            

        //         // this.selectedOption = this.courseOptions.length > 0 ? this.courseOptions[0].id : null;

        //     } catch (error) {
        //         console.error('Error fetching provinces:', error);
        //     }
        // },
        async fechRegister(){

            try {

               const registerPath = `/api_gcp/Register/getRegister`

               const response = await axios.get(`${registerPath}`)

               this.datas = await response.data.data

               this.loader = await false


            } catch (error) {
                console.log('register', error);
            }

        },

        async checkEmail(){

            if(!this.searchEmail){
                Swal.fire({
                    title: "กรุณากรอกข้อมูล",
                    icon: "warning"
                });
            }

            try {
                const registerIdPath = `/api_gcp/Register/checkEmail`

                const response = await axios.get(`${registerIdPath}`,{ params: {email: this.searchEmail}})


                if(response.data.exists){
                    this.dataProfile = response.data.data

                }else{
                    
                      Swal.fire({
                        title: "ไม่พบข้อมูล",
                        icon: "warning"
                    });
                }


            } catch (error) {

                Swal.fire({
                    title: "กรุณากรอกข้อมูล",
                    icon: "warning"
                });
                console.log('checkEmail',error);
            }

        },

    
        updateRegisterStatus(value) {
            this.valueRegisterStatus = value;
        },
        updateCencelOrder(value) {
            this.valueCencelOrder = value;
        },
        updateRegiterType(value) {
            this.valueRegiterType = value;
        },
        updateCourseType(value) {
            console.log(value);
            this.valueCourseType = value;
        },
        updateFood(value) {
            this.valueFood = value;
        },
        detailRegister(value){
            const registerId = { id: value.id };

            const key = 'yourSecretKey'; // คีย์สำหรับการเข้ารหัส

            // Encrypt the receipt data
            const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(registerId), key).toString();

            this.$router.push({ name: 'registration-detail', params: { encryptedData }})
        },
        formatDate(value) {
            return moment(value).format("YYYY-MM-DD HH:mm:ss")
        },
        getColorClass (value) {

            switch (value) {
                case '12001':
                return 'text-gray';
                case '12002':
                return 'text-gray';
                case '12003':
                return 'text-success';
                case '12004':
                return 'text-success';
                default:
                return '';
            }
        },
      
    } 
}
</script>
<style>
   .style-input-search .v-input__slot {
        padding-left: 0!important;
        height: 42px;
        background: transparent;
        box-shadow: none!important;
        border: 1px solid #ced4da;
    }
    .style-input-search .v-input__slot .v-input__prepend-inner{
        margin-top: 0!important;
        height: 40px;
        align-items: center;
        color: #495057;
        text-align: center;
        white-space: nowrap;
        background-color: #e9ecef;
        margin-right: .375rem;
        padding: .375rem .75rem;
    }
    .table-regislist th {
        border: 1px solid #ddd!important;
        padding: 8px;
        font-size: 16px!important;
    }
    .table-regislist td{
        border: 1px solid #ddd!important;
        padding: 8px;
        font-size: 16px!important;
        vertical-align: middle;
    }
  
  
    .table-regislist tr:hover {background-color: #ddd;}

    .table-regislist th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: #f8f9fa;
        color: white;
    }
    .btn-detail{
        background-color: #243C7F;
        border-radius: 5px;
        padding: 0.5rem;
        color: white;
        display: inline-block;
        cursor: pointer;
    }

    .btn-search{
        display: inline-block;
        padding: 6.5px;
        width: 100%;
        text-align: center;
    }



    .loader {
        border: 4px solid #1976d2;
        /* border: 4px solid rgba(0, 0, 0, .1); */
        border-left-color: transparent;
        width: 100px;
        height: 100px;
        animation: spin89345 1s linear infinite;
        border-radius: 50%;
        margin: 2rem auto;
    }

    @keyframes spin89345 {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
    }
    

</style>