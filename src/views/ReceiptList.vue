<template>
     <div class="receiptlist">
  
        <h2 class="mb-3">ตรวจสอบการลงทะเบียน</h2>
        <div>
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

        <div class="box-excel d-flex mt-3">
          <h3>ทั้งหมด {{ datas.length }} รายการ | </h3>
          <div class="ml-2"  @click="exportToExcel"><img src="@/assets/images/excel.webp"/></div>
        </div>
        <br>
  
        <v-data-table
          :headers="headers"
          :items="datas"
          item-key="id"
          v-model="selectedItems"
          show-select
          :search="search"
          :footer-props="{itemsPerPageOptions: [5, 10, 20]}"
          class="table-regislist"
        >
     
        <template v-slot:[`item.select`]="{ item }">
            <v-checkbox
                v-model="selectedItems"
                :value="item"
                :input-value="item.id"
            ></v-checkbox>
            </template>
            <template v-slot:[`item.statusReceipt`]="{ item }" ><span :class="getColorClass(item.status_receipt)">{{ item.statusReceipt }}</span></template>
            <template v-slot:[`item.name`]="{ item }">{{ item.name_th }}  {{  item.lastname_th  }}</template>
            <template v-slot:[`item.create_date`]="{ item }">{{ formatDate(item.create_date) }}</template>
            <template v-slot:[`item.statusRegister`]="{ item }" ><span :class="getColorClass(item.status_register)">{{ item.statusRegister }}</span></template>
            <template v-slot:[`item.detail`]="{ item }">
                <div @click="detailRegister(item)" class="btn-detail">ข้อมูลการลงทะเบียน</div>
            </template>
        </v-data-table>
        </div>
        <v-row justify="center">
            <v-btn class="bg-green" @click="checkDailog">ออกใบเสร็จรับเงิน</v-btn>
        </v-row>

        <v-dialog
            v-model="dialog"
            width="500"
            class="dialog-search"
            >
            <v-card>
                <v-toolbar class="head-toolbar">
                    <v-toolbar-title >ออกใบเสร็จรับเงิน</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>


                  <v-container>
                    <v-row>
                      <v-col>
                        <h4 class="text-left pt-1 pb-1">ยืนยันออกใบเสร็จรับเงิน</h4>
                      </v-col>
                    </v-row>
                  </v-container>
                

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <div @click="dialog = false" class="btn-gray border-gray btn-receipt f-22 text-white mr-2">ปิด</div>
                  <div @click="createReceipt" class="btn-success btn-receipt f-22 text-gray mr-2">ออกใบเสร็จรับเงิน</div>
                </v-card-actions>
            </v-card>
        </v-dialog>

     </div>
    
</template>
<script>

import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';
import store from '@/store';
import CryptoJS from 'crypto-js';
import * as XLSX from 'xlsx';

export default {

    data: () => ({
      user: store.getters.user,
      search: '',
      selectedItems: [],
      selectAll: false,
      headers: [
          { text: 'สถานะออกใบเสร็จรับเงิน', align: 'left', value: 'statusReceipt' },
          { text: '', align: 'center', value: 'detail' },
          { text: 'ID', align: 'center', value: 'id' },
          { text: 'วันเวลาที่ลงทะเบียน', align: 'center', value: 'create_date' },
          { text: 'ชื่อ', align: 'left', value: 'name' },
          { text: 'สถานะ', align: 'lefts', value: 'statusRegister' },
          { text: 'Reference No 1', align: 'center', value: 'reference_no_1' },
          { text: 'Reference No 2', align: 'center', value: 'reference_no_2' },
          { text: 'ชื่อ', value: 'name_th',  align: ' d-none' },
            { text: 'นามสกุล', value: 'lastname_th', align: ' d-none'},
            { text: 'อีเมล', value: 'email', align: ' d-none' },
      ],
      datas: [],
      dialog: false
    }),
    watch: {
    selectAll(value) {
     
      if (value) {
        this.selectedItems = [...this.datas];
      } else {
        this.selectedItems = [];
      }
    },
    selectedItems() {
      if (this.selectedItems.length === this.datas.length) {
        this.selectAll = true;
      } else {
        this.selectAll = false;
      }
    },
  },
    mounted(){
      this.fechstatusRegisterReceipt()
     
    },
    methods: {
      exportToExcel() {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(this.datas);
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        /* generate XLSX file and send to client */
        XLSX.writeFile(wb, 'รายงานข้อมูลผู้ลงทะเบียน.xlsx');
      },
      checkDailog(){

        if(this.selectedItems.length){
          this.dialog = true
        }else{
          console.log('=========');
            Swal.fire({
              icon: 'warning',
              title: "กรุณาเลือกข้อมูล",
              // text: message
          }).then(() => {
            
          });
        }
     

      },
    

      async createReceipt(){

        for(let i = 0; i < this.selectedItems.length; i++){
          
          const fdCreateReceipt = {

            master_id             : this.selectedItems[i].id,
            project_code          : "0041",
            payment_type_code     : "01",
            price                 : this.selectedItems[i].course_price,
            reference_1           : this.selectedItems[i].reference_no_1,
            reference_2           : this.selectedItems[i].reference_no_2,
            name                  : this.selectedItems[i].receipt_name,    
            id_card_number        : this.selectedItems[i].id_card_number,
            address               : this.selectedItems[i].company_address,  
            province              : this.selectedItems[i].province_id,
            district              : this.selectedItems[i].district_id,
            sub_district          : this.selectedItems[i].subdistrict_id,
            zip_code              : this.selectedItems[i].postcode,
            admin_id              : this.user.employee_id

            }

            try {

              const response = await axios.post('/api/create_receipt', fdCreateReceipt, {
              headers: {
                  'accept': '*/*',
                  'accept-language': 'en-US,en;q=0.8',
                  'content-type': 'application/json'
              },
              timeout: 10000
              });


              console.log('========',response);


            if(!response.data.data.response){
              this.updateStatusReceipt(this.selectedItems[i],'13002')
            }

            await Swal.fire({
                        icon: 'success',
                        title: 'บันทึกสำเร็จ',
                        text: 'ระบบได้ทำการบันทึกข้อมูลของคุณแล้ว'
                    }).then( function(){
              });
          
              this.dialog = false

              this.selectedItems = []


            } catch (error) {

            console.log('========',error.message);

            }

        }




      },
      
      async updateStatusReceipt(data,status){
            try {
             
                let currentDate = moment();
            
                let fd = {
                    "register_id"       : data.id,
                    "status_receipt"    : status,
                    "modified_by"       : this.user.employee_id,
                    "modified_date"     : currentDate.format('YYYY-MM-DD HH:mm:ss')
                }

                let updateStatusRegisterPath = `/api_gcp/Register/updateStatusReceipt`

                await axios.post(`${updateStatusRegisterPath}`, fd)

                } catch (error) {
                    console.log('updateStatusRegister', error);
                }
        },

      async fechstatusRegisterReceipt(){

        try {
          const statusRegisterReceiptPath = `/api_gcp/Register/statusRegisterReceipt`

          const response = await axios.get(`${statusRegisterReceiptPath}`)



          this.datas = response.data.data
        


        } catch (error) {
            console.log('register', error);
        }

      },
      detailRegister(value){

        const registerId = { id: value.id};

        const key = 'yourSecretKey'; // คีย์สำหรับการเข้ารหัส

        // Encrypt the receipt data
        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(registerId), key).toString();

        this.$router.push({ name: 'registration-detail', params: { id: encryptedData }})

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
                case '13001':
                return 'text-gray';
                case '13002':
                return 'text-success';
                default:
                return '';
            }
        },
        dialogReceipt(){
          this.dialog = true
        }
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
.table-regislist th span{
  color: #000;
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
.receiptlist  button span{
font-size: 18px;
}
.head-toolbar{
  box-shadow: none!important;
  border-bottom: 1px solid #cccccc!important;
}
.btn-receipt{
    border-radius: 3px;
    padding: 0.25rem 1rem;
    cursor: pointer;
}
.box-excel img{
    display: inline-block;
    width: 40px;
}

</style>