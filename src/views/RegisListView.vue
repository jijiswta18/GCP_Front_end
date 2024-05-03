<template>
    <div class="registrationlist">
        <h2 class="mb-3">ตรวจสอบการลงทะเบียน</h2>
        <!-- สิทธิ์ Admin -->
        <v-row no-gutters>
            <v-col cols="6" class="px-2">
                <p>สถานะการลงทะเบียน</p>
                <v-autocomplete
                    label="เลือก"
                    :items="['รอการชำระเงิน / รอการตรวจสอบข้อมูล', 'ชำระเงินเรียบร้อยแล้ว / ลงทะเบียนเรียบร้อยแล้ว']"
                    solo
                    clearable
                    class="style-select"
                ></v-autocomplete>
            </v-col>
            <v-col cols="6" class="px-2">
                <p>การยกเลิก</p>
                <v-autocomplete
                    label="เลือก"
                    :items="['ยกเลิกการลงทะเบียน', 'คงสถานะการลงทะเบียน']"
                    solo
                    class="style-select"
                ></v-autocomplete>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col cols="4" class="px-2">
                <p>ประเภทผู้สมัคร</p>
                <v-autocomplete
                    label="เลือก"
                    :items="['รอการชำระเงิน / รอการตรวจสอบข้อมูล', 'ชำระเงินเรียบร้อยแล้ว / ลงทะเบียนเรียบร้อยแล้ว']"
                    class="style-select"
                    solo
                    clearable 
                ></v-autocomplete>
            </v-col>
            <v-col cols="4" class="px-2">
                <p>รายการที่ต้องการสมัคร</p>
                <v-autocomplete
                    label="เลือก"
                    :items="['ยกเลิกการลงทะเบียน', 'คงสถานะการลงทะเบียน']"
                    class="style-select"
                    solo
                ></v-autocomplete>
            </v-col>
            <v-col cols="4" class="px-2">
                <p>ประเภทอาหาร</p>
                <v-autocomplete
                    label="เลือก"
                    :items="['ยกเลิกการลงทะเบียน', 'คงสถานะการลงทะเบียน']"
                    class="style-select"
                    solo
                ></v-autocomplete>
            </v-col>
        </v-row>

        <RegisterList :headers="headers" :datas="datas"/>
         

        <!-- <v-row>
            <v-col>
                <v-text-field
                    v-model="search"
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
            <v-col cols="2">
                <v-btn class="btn-blue">
                    <i class="fas fa-search mr-2"></i>
                    ค้นหา / Search
                </v-btn>
            </v-col>
        </v-row>

        <br>
        
        <v-data-table
            :headers="headers"
            :items="plants"
            :search="search"
            density="compact"
            item-key="name"
            :footer-props="{ 'items-per-page-options': [10, 25, 50, 100] }"
            class="table-regislist"
        >
       
        </v-data-table> -->


    </div>

</template>
<script>
import RegisterList from '@/components/RegisterList.vue';
export default {
    components: { RegisterList},
    data: () => ({
        search: '',
        headers: [
      { text: '', align: 'center', value: 'detail' },
      { text: 'ID', align: 'left', value: 'name' },
      { text: 'วันเวลาที่ลงทะเบียน', align: 'left', value: 'light' },
      { text: 'ชื่อ', align: 'left', value: 'height' },
      { text: 'สถานะ', align: 'left', value: 'petFriendly' },
      { text: 'Reference No 1', align: 'left', value: 'price' },
      { text: 'Reference No 2', align: 'left', value: 'price' },
    ],
    datas: [
      {
        name: 'Fern',
        light: 'Low',
        height: '20cm',
        petFriendly: 'Yes',
        price: 20,
      },
      {
        name: 'Snake Plant',
        light: 'Low',
        height: '50cm',
        petFriendly: 'No',
        price: 35,
      },
      {
        name: 'Monstera',
        light: 'Medium',
        height: '60cm',
        petFriendly: 'No',
        price: 50,
      },
      {
        name: 'Pothos',
        light: 'Low to medium',
        height: '40cm',
        petFriendly: 'Yes',
        price: 25,
      },
      {
        name: 'ZZ Plant',
        light: 'Low to medium',
        height: '90cm',
        petFriendly: 'Yes',
        price: 30,
      },
      {
        name: 'Spider Plant',
        light: 'Bright, indirect',
        height: '30cm',
        petFriendly: 'Yes',
        price: 15,
      },
      {
        name: 'Air Plant',
        light: 'Bright, indirect',
        height: '15cm',
        petFriendly: 'Yes',
        price: 10,
      },
      {
        name: 'Peperomia',
        light: 'Bright, indirect',
        height: '25cm',
        petFriendly: 'Yes',
        price: 20,
      },
      {
        name: 'Aloe Vera',
        light: 'Bright, direct',
        height: '30cm',
        petFriendly: 'Yes',
        price: 15,
      },
      {
        name: 'Jade Plant',
        light: 'Bright, direct',
        height: '40cm',
        petFriendly: 'Yes',
        price: 25,
      },
    ],
    }),
    create(){
       console.log('=>>>>>>>>>>',this.$route.path);
    },
    methods: {
    },
    
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
        /* border: 1px solid #ced4da; */
        margin-right: .375rem;
        padding: .375rem .75rem;
    }
    .table-regislist td,  th {
        border: 1px solid #ddd;
        padding: 8px;
        font-size: 16px!important;
    }
    .table-regislist tr:hover {background-color: #ddd;}

    .table-regislist th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: #f8f9fa;
        color: white;
    }
</style>